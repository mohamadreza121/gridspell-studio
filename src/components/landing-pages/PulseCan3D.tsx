"use client";

import { useEffect, useRef } from "react";

export type PulseFlavorKey = "citrus" | "berry" | "arctic" | "mango";

export type PulseFlavor = {
  key: PulseFlavorKey;
  number: string;
  name: string;
  shortName: string;
  tastingNote: string;
  base: string;
  secondary: string;
  accent: string;
  glow: string;
  ink: string;
};

export const pulseFlavors: PulseFlavor[] = [
  {
    key: "citrus",
    number: "01",
    name: "Citrus Surge",
    shortName: "Citrus",
    tastingNote: "Yuzu · lime · bright finish",
    base: "#c8ff22",
    secondary: "#f4ff7a",
    accent: "#10150b",
    glow: "#d8ff45",
    ink: "#10150b"
  },
  {
    key: "berry",
    number: "02",
    name: "Berry Voltage",
    shortName: "Berry",
    tastingNote: "Blackberry · cherry · tart finish",
    base: "#7b2cff",
    secondary: "#ff3da9",
    accent: "#18062d",
    glow: "#c743ff",
    ink: "#ffffff"
  },
  {
    key: "arctic",
    number: "03",
    name: "Arctic Rush",
    shortName: "Arctic",
    tastingNote: "White grape · mint · ice finish",
    base: "#37dfff",
    secondary: "#d9fbff",
    accent: "#062532",
    glow: "#62eaff",
    ink: "#062532"
  },
  {
    key: "mango",
    number: "04",
    name: "Mango Blaze",
    shortName: "Mango",
    tastingNote: "Mango · orange · warm finish",
    base: "#ff7a1a",
    secondary: "#ffd12f",
    accent: "#3a1004",
    glow: "#ff8a2c",
    ink: "#2b0c03"
  }
];

type Vec3 = [number, number, number];
type Mat4 = Float32Array;

type MeshData = {
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  indices: Uint16Array;
};

type GpuMesh = {
  position: WebGLBuffer;
  normal: WebGLBuffer;
  uv: WebGLBuffer;
  index: WebGLBuffer;
  count: number;
};

const VERTEX_SHADER = `
  attribute vec3 aPosition;
  attribute vec3 aNormal;
  attribute vec2 aUv;

  uniform mat4 uModel;
  uniform mat4 uViewProjection;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vec4 world = uModel * vec4(aPosition, 1.0);
    vWorldPosition = world.xyz;
    vNormal = normalize(mat3(uModel) * aNormal);
    vUv = aUv;
    gl_Position = uViewProjection * world;
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform sampler2D uTexture;
  uniform float uUseTexture;
  uniform vec3 uBaseColor;
  uniform vec3 uAccentColor;
  uniform vec3 uCamera;
  uniform float uMetalness;
  uniform float uRoughness;
  uniform float uTime;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  float saturate(float value) {
    return clamp(value, 0.0, 1.0);
  }

  float specularTerm(vec3 normal, vec3 lightDirection, vec3 viewDirection, float roughness) {
    vec3 halfVector = normalize(lightDirection + viewDirection);
    float power = mix(180.0, 18.0, roughness);
    return pow(saturate(dot(normal, halfVector)), power);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(uCamera - vWorldPosition);

    vec3 keyDirection = normalize(vec3(-0.55, 0.72, 0.62));
    vec3 fillDirection = normalize(vec3(0.78, 0.16, 0.52));
    vec3 rimDirection = normalize(vec3(-0.22, -0.32, 0.94));

    float keyDiffuse = saturate(dot(normal, keyDirection));
    float fillDiffuse = saturate(dot(normal, fillDirection));
    float rimDiffuse = saturate(dot(normal, rimDirection));

    float keySpecular = specularTerm(normal, keyDirection, viewDirection, uRoughness);
    float fillSpecular = specularTerm(normal, fillDirection, viewDirection, min(1.0, uRoughness + 0.16));
    float fresnel = pow(1.0 - saturate(dot(normal, viewDirection)), 3.7);

    vec4 label = texture2D(uTexture, vUv);
    vec3 surface = mix(uBaseColor, label.rgb, uUseTexture);

    vec3 diffuse = surface * (0.16 + keyDiffuse * 0.56 + fillDiffuse * 0.18 + rimDiffuse * 0.08);
    vec3 reflection = mix(vec3(0.86, 0.90, 0.94), surface, uMetalness * 0.32);
    reflection *= keySpecular * 1.42 + fillSpecular * 0.54;

    float verticalSheen = exp(-pow((normal.x + sin(uTime * 0.22) * 0.08) * 5.4, 2.0));
    vec3 sheenColor = mix(vec3(1.0), uAccentColor, 0.12);

    vec3 color = diffuse + reflection;
    color += sheenColor * verticalSheen * (0.11 + uMetalness * 0.14);
    color += mix(vec3(0.92, 0.98, 1.0), uAccentColor, 0.18) * fresnel * 0.32;

    float brushed = sin(vWorldPosition.y * 210.0 + vWorldPosition.x * 28.0) * 0.006 * uMetalness;
    color += brushed;

    color = color / (color + vec3(1.0));
    color = pow(color, vec3(1.0 / 2.2));

    gl_FragColor = vec4(color, 1.0);
  }
`;

function hexToVec3(hex: string): Vec3 {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean, 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function identity(): Mat4 {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function multiply(a: Mat4, b: Mat4): Mat4 {
  const output = new Float32Array(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      output[column * 4 + row] =
        a[0 * 4 + row] * b[column * 4 + 0] +
        a[1 * 4 + row] * b[column * 4 + 1] +
        a[2 * 4 + row] * b[column * 4 + 2] +
        a[3 * 4 + row] * b[column * 4 + 3];
    }
  }
  return output;
}

function translation(x: number, y: number, z: number): Mat4 {
  const output = identity();
  output[12] = x;
  output[13] = y;
  output[14] = z;
  return output;
}

function scaling(x: number, y: number, z: number): Mat4 {
  const output = identity();
  output[0] = x;
  output[5] = y;
  output[10] = z;
  return output;
}

function rotationX(angle: number): Mat4 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return new Float32Array([1, 0, 0, 0, 0, cosine, sine, 0, 0, -sine, cosine, 0, 0, 0, 0, 1]);
}

function rotationY(angle: number): Mat4 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return new Float32Array([cosine, 0, -sine, 0, 0, 1, 0, 0, sine, 0, cosine, 0, 0, 0, 0, 1]);
}

function rotationZ(angle: number): Mat4 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return new Float32Array([cosine, sine, 0, 0, -sine, cosine, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function perspective(fieldOfView: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fieldOfView / 2);
  const range = 1 / (near - far);
  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) * range,
    -1,
    0,
    0,
    far * near * 2 * range,
    0
  ]);
}

function normalize(vector: Vec3): Vec3 {
  const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;
  return [vector[0] / length, vector[1] / length, vector[2] / length];
}

function subtract(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function lookAt(eye: Vec3, target: Vec3, up: Vec3): Mat4 {
  const z = normalize(subtract(eye, target));
  const x = normalize(cross(up, z));
  const y = cross(z, x);

  return new Float32Array([
    x[0],
    y[0],
    z[0],
    0,
    x[1],
    y[1],
    z[1],
    0,
    x[2],
    y[2],
    z[2],
    0,
    -dot(x, eye),
    -dot(y, eye),
    -dot(z, eye),
    1
  ]);
}

function composeModel({
  x = 0,
  y = 0,
  z = 0,
  rotateXValue = 0,
  rotateYValue = 0,
  rotateZValue = 0,
  scaleX = 1,
  scaleY = 1,
  scaleZ = 1
}: {
  x?: number;
  y?: number;
  z?: number;
  rotateXValue?: number;
  rotateYValue?: number;
  rotateZValue?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
}): Mat4 {
  return multiply(
    translation(x, y, z),
    multiply(
      rotationZ(rotateZValue),
      multiply(rotationY(rotateYValue), multiply(rotationX(rotateXValue), scaling(scaleX, scaleY, scaleZ)))
    )
  );
}

function createCylinderSide(radius: number, height: number, segments: number): MeshData {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let index = 0; index <= segments; index += 1) {
    const progress = index / segments;
    const angle = progress * Math.PI * 2;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);

    positions.push(radius * cosine, -height / 2, radius * sine);
    positions.push(radius * cosine, height / 2, radius * sine);
    normals.push(cosine, 0, sine, cosine, 0, sine);
    uvs.push(progress, 1, progress, 0);
  }

  for (let index = 0; index < segments; index += 1) {
    const start = index * 2;
    indices.push(start, start + 1, start + 2, start + 1, start + 3, start + 2);
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

function createDisc(radius: number, segments: number, upward: boolean): MeshData {
  const positions: number[] = [0, 0, 0];
  const normals: number[] = [0, upward ? 1 : -1, 0];
  const uvs: number[] = [0.5, 0.5];
  const indices: number[] = [];

  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    positions.push(x, 0, z);
    normals.push(0, upward ? 1 : -1, 0);
    uvs.push(0.5 + x / (radius * 2), 0.5 + z / (radius * 2));
  }

  for (let index = 1; index <= segments; index += 1) {
    if (upward) indices.push(0, index, index + 1);
    else indices.push(0, index + 1, index);
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

function createTorus(majorRadius: number, minorRadius: number, majorSegments: number, minorSegments: number): MeshData {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let major = 0; major <= majorSegments; major += 1) {
    const u = (major / majorSegments) * Math.PI * 2;
    for (let minor = 0; minor <= minorSegments; minor += 1) {
      const v = (minor / minorSegments) * Math.PI * 2;
      const radial = majorRadius + minorRadius * Math.cos(v);
      const x = radial * Math.cos(u);
      const y = minorRadius * Math.sin(v);
      const z = radial * Math.sin(u);
      positions.push(x, y, z);
      normals.push(Math.cos(u) * Math.cos(v), Math.sin(v), Math.sin(u) * Math.cos(v));
      uvs.push(major / majorSegments, minor / minorSegments);
    }
  }

  const row = minorSegments + 1;
  for (let major = 0; major < majorSegments; major += 1) {
    for (let minor = 0; minor < minorSegments; minor += 1) {
      const a = major * row + minor;
      const b = (major + 1) * row + minor;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create WebGL shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader compilation error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create WebGL program.");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown WebGL program error.";
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

function uploadMesh(gl: WebGLRenderingContext, mesh: MeshData): GpuMesh {
  const position = gl.createBuffer();
  const normal = gl.createBuffer();
  const uv = gl.createBuffer();
  const index = gl.createBuffer();
  if (!position || !normal || !uv || !index) throw new Error("Unable to allocate WebGL buffers.");

  gl.bindBuffer(gl.ARRAY_BUFFER, position);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normal);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.normals, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, uv);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.uvs, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);

  return { position, normal, uv, index, count: mesh.indices.length };
}

function createLabelCanvas(flavor: PulseFlavor) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;
  const context = canvas.getContext("2d");
  if (!context) return canvas;

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, flavor.secondary);
  gradient.addColorStop(0.43, flavor.base);
  gradient.addColorStop(1, flavor.accent);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const glow = context.createRadialGradient(250, 350, 20, 250, 350, 660);
  glow.addColorStop(0, "rgba(255,255,255,.48)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(770, 920);
  context.rotate(-0.34);
  context.fillStyle = flavor.accent;
  context.globalAlpha = 0.9;
  context.fillRect(-125, -1200, 250, 2400);
  context.restore();

  context.save();
  context.translate(290, 1160);
  context.rotate(-0.34);
  context.fillStyle = flavor.secondary;
  context.globalAlpha = 0.42;
  context.fillRect(-52, -1200, 104, 2400);
  context.restore();

  context.globalAlpha = 1;
  context.fillStyle = flavor.ink;
  context.textAlign = "center";
  context.font = "900 182px Arial Black, Arial, sans-serif";
  context.fillText("PULSE", 512, 690);
  context.font = "900 214px Arial Black, Arial, sans-serif";
  context.fillText("DRIP", 512, 875);

  context.font = "700 46px Arial, sans-serif";
  context.letterSpacing = "9px";
  context.fillText(flavor.name.toUpperCase(), 512, 1010);

  context.fillStyle = flavor.ink;
  context.globalAlpha = 0.84;
  context.font = "700 26px Arial, sans-serif";
  context.fillText("CLEAN ENERGY • ZERO SUGAR", 512, 1110);
  context.fillText("180MG CAFFEINE • ELECTROLYTES", 512, 1152);

  context.globalAlpha = 1;
  context.strokeStyle = flavor.ink;
  context.lineWidth = 4;
  context.beginPath();
  context.arc(512, 1395, 118, 0, Math.PI * 2);
  context.stroke();
  context.font = "900 82px Arial Black, Arial, sans-serif";
  context.fillText("180", 512, 1420);
  context.font = "700 22px Arial, sans-serif";
  context.fillText("MG CAFFEINE", 512, 1460);

  context.font = "700 24px Arial, sans-serif";
  context.fillText("12 FL OZ / 355 ML", 512, 1840);

  for (let index = 0; index < 38; index += 1) {
    const x = (index * 173) % canvas.width;
    const y = 120 + ((index * 241) % 1640);
    const size = 3 + (index % 4) * 2;
    context.beginPath();
    context.fillStyle = index % 2 === 0 ? flavor.ink : "rgba(255,255,255,.6)";
    context.globalAlpha = 0.24 + (index % 3) * 0.11;
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 1;
  return canvas;
}

export function PulseCan3D({ flavor, className = "" }: { flavor: PulseFlavor; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const flavorRef = useRef(flavor);
  const flavorVersionRef = useRef(0);

  useEffect(() => {
    flavorRef.current = flavor;
    flavorVersionRef.current += 1;
  }, [flavor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "high-performance"
    });
    if (!gl) return;

    let animationFrame = 0;
    let disposed = false;
    let appliedFlavorVersion = -1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    try {
      const program = createProgram(gl);
      gl.useProgram(program);

      const sideMesh = uploadMesh(gl, createCylinderSide(1.12, 3.78, 128));
      const discMesh = uploadMesh(gl, createDisc(1.03, 96, true));
      const bottomDiscMesh = uploadMesh(gl, createDisc(1.03, 96, false));
      const rimMesh = uploadMesh(gl, createTorus(1.04, 0.085, 96, 18));
      const tabMesh = uploadMesh(gl, createTorus(0.36, 0.085, 64, 14));

      const positionLocation = gl.getAttribLocation(program, "aPosition");
      const normalLocation = gl.getAttribLocation(program, "aNormal");
      const uvLocation = gl.getAttribLocation(program, "aUv");
      const modelLocation = gl.getUniformLocation(program, "uModel");
      const viewProjectionLocation = gl.getUniformLocation(program, "uViewProjection");
      const textureLocation = gl.getUniformLocation(program, "uTexture");
      const useTextureLocation = gl.getUniformLocation(program, "uUseTexture");
      const baseColorLocation = gl.getUniformLocation(program, "uBaseColor");
      const accentColorLocation = gl.getUniformLocation(program, "uAccentColor");
      const cameraLocation = gl.getUniformLocation(program, "uCamera");
      const metalnessLocation = gl.getUniformLocation(program, "uMetalness");
      const roughnessLocation = gl.getUniformLocation(program, "uRoughness");
      const timeLocation = gl.getUniformLocation(program, "uTime");

      const texture = gl.createTexture();
      if (!texture) throw new Error("Unable to create can label texture.");
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(textureLocation, 0);

      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const bindMesh = (mesh: GpuMesh) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.position);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normal);
        gl.enableVertexAttribArray(normalLocation);
        gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.uv);
        gl.enableVertexAttribArray(uvLocation);
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.index);
      };

      const drawMesh = ({
        mesh,
        model,
        useTexture,
        baseColor,
        accentColor,
        metalness,
        roughness
      }: {
        mesh: GpuMesh;
        model: Mat4;
        useTexture: number;
        baseColor: Vec3;
        accentColor: Vec3;
        metalness: number;
        roughness: number;
      }) => {
        bindMesh(mesh);
        gl.uniformMatrix4fv(modelLocation, false, model);
        gl.uniform1f(useTextureLocation, useTexture);
        gl.uniform3fv(baseColorLocation, baseColor);
        gl.uniform3fv(accentColorLocation, accentColor);
        gl.uniform1f(metalnessLocation, metalness);
        gl.uniform1f(roughnessLocation, roughness);
        gl.drawElements(gl.TRIANGLES, mesh.count, gl.UNSIGNED_SHORT, 0);
      };

      const updateTexture = () => {
        const currentFlavor = flavorRef.current;
        const labelCanvas = createLabelCanvas(currentFlavor);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, labelCanvas);
        gl.generateMipmap(gl.TEXTURE_2D);
        host.style.setProperty("--pulse-can-glow", currentFlavor.glow);
      };

      const resize = () => {
        const bounds = host.getBoundingClientRect();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.8);
        const width = Math.max(1, Math.round(bounds.width * pixelRatio));
        const height = Math.max(1, Math.round(bounds.height * pixelRatio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          canvas.style.width = `${bounds.width}px`;
          canvas.style.height = `${bounds.height}px`;
        }
        gl.viewport(0, 0, width, height);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = host.getBoundingClientRect();
        pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      };
      const handlePointerLeave = () => {
        pointerTarget.x = 0;
        pointerTarget.y = 0;
      };
      host.addEventListener("pointermove", handlePointerMove);
      host.addEventListener("pointerleave", handlePointerLeave);

      const camera: Vec3 = [0, 0.2, 7.2];
      const start = performance.now();

      const render = (now: number) => {
        if (disposed) return;
        resize();

        if (appliedFlavorVersion !== flavorVersionRef.current) {
          appliedFlavorVersion = flavorVersionRef.current;
          updateTexture();
        }

        const elapsed = (now - start) / 1000;
        pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.055;
        pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.055;

        const aspect = canvas.width / Math.max(canvas.height, 1);
        const projection = perspective(Math.PI / 4.2, aspect, 0.1, 100);
        const view = lookAt(camera, [0, 0, 0], [0, 1, 0]);
        const viewProjection = multiply(projection, view);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program);
        gl.uniformMatrix4fv(viewProjectionLocation, false, viewProjection);
        gl.uniform3fv(cameraLocation, camera);
        gl.uniform1f(timeLocation, elapsed);

        const currentFlavor = flavorRef.current;
        const flavorBase = hexToVec3(currentFlavor.base);
        const flavorAccent = hexToVec3(currentFlavor.accent);
        const silver: Vec3 = [0.64, 0.68, 0.72];
        const darkMetal: Vec3 = [0.12, 0.14, 0.16];
        const autoRotation = reducedMotion ? -0.34 : -0.34 + Math.sin(elapsed * 0.34) * 0.18 + elapsed * 0.08;
        const floatY = reducedMotion ? 0 : Math.sin(elapsed * 1.05) * 0.10;
        const baseRotationX = -0.16 + pointerCurrent.y * 0.09;
        const baseRotationY = autoRotation + pointerCurrent.x * 0.18;
        const baseRotationZ = -0.075 + pointerCurrent.x * 0.035;
        const globalScale = aspect < 0.85 ? 0.86 : 1;

        const baseTransform = composeModel({
          y: floatY,
          rotateXValue: baseRotationX,
          rotateYValue: baseRotationY,
          rotateZValue: baseRotationZ,
          scaleX: globalScale,
          scaleY: globalScale,
          scaleZ: globalScale
        });

        drawMesh({
          mesh: sideMesh,
          model: baseTransform,
          useTexture: 1,
          baseColor: flavorBase,
          accentColor: flavorAccent,
          metalness: 0.2,
          roughness: 0.32
        });

        const topModel = multiply(baseTransform, translation(0, 1.89, 0));
        const bottomModel = multiply(baseTransform, translation(0, -1.89, 0));
        drawMesh({ mesh: discMesh, model: topModel, useTexture: 0, baseColor: silver, accentColor: flavorBase, metalness: 0.92, roughness: 0.22 });
        drawMesh({ mesh: bottomDiscMesh, model: bottomModel, useTexture: 0, baseColor: silver, accentColor: flavorBase, metalness: 0.92, roughness: 0.28 });

        const topRimModel = multiply(baseTransform, translation(0, 1.89, 0));
        const bottomRimModel = multiply(baseTransform, translation(0, -1.89, 0));
        drawMesh({ mesh: rimMesh, model: topRimModel, useTexture: 0, baseColor: silver, accentColor: flavorBase, metalness: 1, roughness: 0.18 });
        drawMesh({ mesh: rimMesh, model: bottomRimModel, useTexture: 0, baseColor: silver, accentColor: flavorBase, metalness: 1, roughness: 0.2 });

        const tabModel = multiply(
          baseTransform,
          composeModel({ x: 0.08, y: 1.97, z: 0.05, rotateYValue: 0.18, scaleX: 0.72, scaleY: 0.34, scaleZ: 0.42 })
        );
        drawMesh({ mesh: tabMesh, model: tabModel, useTexture: 0, baseColor: darkMetal, accentColor: flavorBase, metalness: 0.94, roughness: 0.2 });

        animationFrame = requestAnimationFrame(render);
      };

      animationFrame = requestAnimationFrame(render);

      return () => {
        disposed = true;
        cancelAnimationFrame(animationFrame);
        observer.disconnect();
        host.removeEventListener("pointermove", handlePointerMove);
        host.removeEventListener("pointerleave", handlePointerLeave);
        gl.deleteProgram(program);
        gl.deleteTexture(texture);
        [sideMesh, discMesh, bottomDiscMesh, rimMesh, tabMesh].forEach((mesh) => {
          gl.deleteBuffer(mesh.position);
          gl.deleteBuffer(mesh.normal);
          gl.deleteBuffer(mesh.uv);
          gl.deleteBuffer(mesh.index);
        });
      };
    } catch (error) {
      console.error("Pulse can WebGL renderer failed:", error);
      return undefined;
    }
  }, []);

  return (
    <div ref={hostRef} className={`pulse-can-stage relative h-full w-full ${className}`}>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[70px] transition-colors duration-700"
        style={{ background: `radial-gradient(circle, ${flavor.glow}88 0%, ${flavor.glow}28 42%, transparent 72%)` }}
      />
      <canvas ref={canvasRef} className="relative z-10 block h-full w-full" aria-label={`Interactive 3D can of Pulse Drip ${flavor.name}`} />
      <div aria-hidden="true" className="absolute bottom-[8%] left-1/2 h-[6%] w-[44%] -translate-x-1/2 rounded-full bg-black/55 blur-xl" />
    </div>
  );
}
