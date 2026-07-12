"use client";

import { useEffect, useRef } from "react";

import type { PulseFlavor } from "@/components/landing-pages/PulseFlavorData";

type Vec3 = [number, number, number];
type Mat4 = Float32Array;
type Mesh = {
  position: WebGLBuffer;
  normal: WebGLBuffer;
  uv: WebGLBuffer;
  index: WebGLBuffer;
  count: number;
};

type MeshData = {
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  indices: Uint16Array;
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
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  float sat(float value) { return clamp(value, 0.0, 1.0); }

  float specular(vec3 normal, vec3 lightDirection, vec3 viewDirection, float roughness) {
    vec3 halfVector = normalize(lightDirection + viewDirection);
    return pow(sat(dot(normal, halfVector)), mix(230.0, 22.0, roughness));
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(uCamera - vWorldPosition);
    vec3 keyDirection = normalize(vec3(-0.50, 0.74, 0.62));
    vec3 fillDirection = normalize(vec3(0.80, 0.10, 0.55));
    vec3 rimDirection = normalize(vec3(-0.20, -0.16, 0.97));

    float key = sat(dot(normal, keyDirection));
    float fill = sat(dot(normal, fillDirection));
    float rim = sat(dot(normal, rimDirection));
    float fresnel = pow(1.0 - sat(dot(normal, viewDirection)), 4.0);

    vec3 textureColor = texture2D(uTexture, vUv).rgb;
    float textureLuminance = dot(textureColor, vec3(0.2126, 0.7152, 0.0722));
    textureColor = clamp(mix(vec3(textureLuminance), textureColor, 1.30), 0.0, 1.0);
    vec3 surfaceSrgb = mix(uBaseColor, textureColor, uUseTexture);
    vec3 surface = pow(surfaceSrgb, vec3(2.2));

    float printedLight = 0.44 + key * 0.40 + fill * 0.11 + rim * 0.035;
    float metalLight = 0.10 + key * 0.44 + fill * 0.13 + rim * 0.06;
    vec3 diffuse = surface * mix(metalLight, printedLight, uUseTexture);

    float mainHighlight = exp(-pow((normal.x + 0.43) * 7.6, 2.0));
    float edgeHighlight = exp(-pow((normal.x - 0.74) * 12.0, 2.0));
    float keySpecular = specular(normal, keyDirection, viewDirection, uRoughness);
    float fillSpecular = specular(normal, fillDirection, viewDirection, min(1.0, uRoughness + 0.14));
    float rimSpecular = specular(normal, rimDirection, viewDirection, min(1.0, uRoughness + 0.04));

    vec3 specularColor = mix(vec3(0.96, 0.98, 1.0), surface, uMetalness * 0.25);
    vec3 color = diffuse;
    color += specularColor * (keySpecular * 1.42 + fillSpecular * 0.38 + rimSpecular * 0.44) * mix(0.14, 1.0, uMetalness);
    color += vec3(1.0) * mainHighlight * mix(0.24, 0.055, uUseTexture);
    color += mix(vec3(0.76, 0.91, 1.0), uAccentColor, 0.10) * edgeHighlight * mix(0.13, 0.035, uUseTexture);
    color += mix(vec3(0.88, 0.96, 1.0), uAccentColor, 0.10) * fresnel * mix(0.28, 0.055, uUseTexture);

    vec3 printAnchor = surface * (0.31 + key * 0.08);
    color = mix(color, max(color, printAnchor), uUseTexture * 0.82);
    color = color / (vec3(1.0) + color * mix(0.46, 0.16, uUseTexture));
    color = pow(max(color, vec3(0.0)), vec3(1.0 / 2.2));
    gl_FragColor = vec4(color, 1.0);
  }
`;

function hexToVec3(hex: string): Vec3 {
  const value = Number.parseInt(hex.replace("#", ""), 16);
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
        a[row] * b[column * 4] +
        a[4 + row] * b[column * 4 + 1] +
        a[8 + row] * b[column * 4 + 2] +
        a[12 + row] * b[column * 4 + 3];
    }
  }
  return output;
}

function translation(x: number, y: number, z: number): Mat4 {
  const matrix = identity();
  matrix[12] = x;
  matrix[13] = y;
  matrix[14] = z;
  return matrix;
}

function scaling(x: number, y: number, z: number): Mat4 {
  const matrix = identity();
  matrix[0] = x;
  matrix[5] = y;
  matrix[10] = z;
  return matrix;
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

function compose({
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
    multiply(rotationZ(rotateZValue), multiply(rotationY(rotateYValue), multiply(rotationX(rotateXValue), scaling(scaleX, scaleY, scaleZ))))
  );
}

function perspective(fieldOfView: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fieldOfView / 2);
  const range = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * range, -1, 0, 0, far * near * 2 * range, 0]);
}

function normalize(vector: Vec3): Vec3 {
  const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;
  return [vector[0] / length, vector[1] / length, vector[2] / length];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function lookAt(eye: Vec3, target: Vec3, up: Vec3): Mat4 {
  const z = normalize([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const x = normalize(cross(up, z));
  const y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2]),
    -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2]),
    -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2]),
    1
  ]);
}

function profileRadius(progress: number, radius: number) {
  if (progress < 0.065) return radius * (0.968 + (progress / 0.065) * 0.032);
  if (progress > 0.895) return radius * (1 - ((progress - 0.895) / 0.105) * 0.068);
  return radius;
}

function createCanSide(radius: number, height: number, radialSegments: number, heightSegments: number): MeshData {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let row = 0; row <= heightSegments; row += 1) {
    const vertical = row / heightSegments;
    const y = -height / 2 + vertical * height;
    const currentRadius = profileRadius(vertical, radius);
    for (let column = 0; column <= radialSegments; column += 1) {
      const progress = column / radialSegments;
      const angle = progress * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      positions.push(currentRadius * cosine, y, currentRadius * sine);
      normals.push(cosine, 0, sine);
      uvs.push(1 - progress, vertical);
    }
  }

  const width = radialSegments + 1;
  for (let row = 0; row < heightSegments; row += 1) {
    for (let column = 0; column < radialSegments; column += 1) {
      const a = row * width + column;
      const b = a + width;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

function createDisc(radius: number, segments: number, upward: boolean): MeshData {
  const positions = [0, 0, 0];
  const normals = [0, upward ? 1 : -1, 0];
  const uvs = [0.5, 0.5];
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
      positions.push(radial * Math.cos(u), minorRadius * Math.sin(v), radial * Math.sin(u));
      normals.push(Math.cos(u) * Math.cos(v), Math.sin(v), Math.sin(u) * Math.cos(v));
      uvs.push(major / majorSegments, minor / minorSegments);
    }
  }
  const width = minorSegments + 1;
  for (let major = 0; major < majorSegments; major += 1) {
    for (let minor = 0; minor < minorSegments; minor += 1) {
      const a = major * width + minor;
      const b = a + width;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create static can shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compile failed.");
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create static can program.");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "Program link failed.");
  return program;
}

function upload(gl: WebGLRenderingContext, data: MeshData): Mesh {
  const position = gl.createBuffer();
  const normal = gl.createBuffer();
  const uv = gl.createBuffer();
  const index = gl.createBuffer();
  if (!position || !normal || !uv || !index) throw new Error("Unable to allocate static can buffers.");
  gl.bindBuffer(gl.ARRAY_BUFFER, position);
  gl.bufferData(gl.ARRAY_BUFFER, data.positions, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normal);
  gl.bufferData(gl.ARRAY_BUFFER, data.normals, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, uv);
  gl.bufferData(gl.ARRAY_BUFFER, data.uvs, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.indices, gl.STATIC_DRAW);
  return { position, normal, uv, index, count: data.indices.length };
}

function createFrontLabel(flavor: PulseFlavor) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;
  const context = canvas.getContext("2d");
  if (!context) return canvas;

  const gradient = context.createLinearGradient(0, 0, 880, 2048);
  gradient.addColorStop(0, flavor.secondary);
  gradient.addColorStop(0.24, flavor.base);
  gradient.addColorStop(0.69, flavor.base);
  gradient.addColorStop(1, flavor.accent);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const band = (color: string, x: number, width: number, alpha: number) => {
    context.save();
    context.translate(x, 1024);
    context.rotate(-0.28);
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.fillRect(-width / 2, -1600, width, 3200);
    context.restore();
  };
  band(flavor.accent, 805, 285, 0.98);
  band("#ffffff", 630, 62, 0.15);
  band(flavor.secondary, 225, 132, 0.70);

  context.textAlign = "center";
  context.textBaseline = "alphabetic";
  context.lineJoin = "round";
  context.fillStyle = flavor.ink;
  context.strokeStyle = flavor.ink === "#ffffff" ? "rgba(20,5,38,.34)" : "rgba(255,255,255,.22)";
  context.lineWidth = 11;
  context.font = "900 174px Arial Black, Arial, sans-serif";
  context.strokeText("PULSE", 512, 610);
  context.fillText("PULSE", 512, 610);
  context.font = "900 214px Arial Black, Arial, sans-serif";
  context.strokeText("DRIP", 512, 802);
  context.fillText("DRIP", 512, 802);
  context.globalAlpha = 0.96;
  context.font = "900 42px Arial, sans-serif";
  context.fillText(flavor.name.toUpperCase(), 512, 950);
  context.globalAlpha = 0.86;
  context.font = "700 25px Arial, sans-serif";
  context.fillText("CLEAN ENERGY  /  ZERO SUGAR", 512, 1055);
  context.fillText("180MG CAFFEINE  /  ELECTROLYTES", 512, 1099);
  context.globalAlpha = 1;
  context.lineWidth = 5;
  context.strokeStyle = flavor.ink;
  context.beginPath();
  context.arc(512, 1375, 116, 0, Math.PI * 2);
  context.stroke();
  context.font = "900 82px Arial Black, Arial, sans-serif";
  context.fillText("180", 512, 1400);
  context.font = "700 22px Arial, sans-serif";
  context.fillText("MG CAFFEINE", 512, 1443);
  context.font = "900 29px Arial, sans-serif";
  context.fillText("FUEL THE MOMENT.", 512, 1710);
  context.font = "700 23px Arial, sans-serif";
  context.fillText("12 FL OZ / 355 ML", 512, 1840);
  return canvas;
}

export function PulseCan3DStaticFrontPreview({ flavor }: { flavor: PulseFlavor }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return;

    const program = createProgram(gl);
    gl.useProgram(program);

    const body = upload(gl, createCanSide(0.96, 5.16, 112, 24));
    const top = upload(gl, createDisc(0.895, 88, true));
    const bottom = upload(gl, createDisc(0.91, 88, false));
    const inset = upload(gl, createDisc(0.75, 80, true));
    const rivet = upload(gl, createDisc(0.074, 32, true));
    const rim = upload(gl, createTorus(0.90, 0.037, 88, 12));
    const lowerRim = upload(gl, createTorus(0.92, 0.035, 88, 12));
    const tab = upload(gl, createTorus(0.255, 0.047, 60, 10));
    const opening = upload(gl, createTorus(0.285, 0.018, 60, 8));
    const meshes = [body, top, bottom, inset, rivet, rim, lowerRim, tab, opening];

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

    const texture = gl.createTexture();
    if (!texture) return;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, createFrontLabel(flavor));
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.uniform1i(textureLocation, 0);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const bind = (mesh: Mesh) => {
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

    const draw = (mesh: Mesh, model: Mat4, useTexture: number, baseColor: Vec3, accentColor: Vec3, metalness: number, roughness: number) => {
      bind(mesh);
      gl.uniformMatrix4fv(modelLocation, false, model);
      gl.uniform1f(useTextureLocation, useTexture);
      gl.uniform3fv(baseColorLocation, baseColor);
      gl.uniform3fv(accentColorLocation, accentColor);
      gl.uniform1f(metalnessLocation, metalness);
      gl.uniform1f(roughnessLocation, roughness);
      gl.drawElements(gl.TRIANGLES, mesh.count, gl.UNSIGNED_SHORT, 0);
    };

    const render = () => {
      const bounds = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const camera: Vec3 = [0, 0.12, 9.15];
      const viewProjection = multiply(perspective(Math.PI / 4.85, width / Math.max(height, 1), 0.1, 100), lookAt(camera, [0, 0, 0], [0, 1, 0]));
      gl.uniformMatrix4fv(viewProjectionLocation, false, viewProjection);
      gl.uniform3fv(cameraLocation, camera);

      const baseColor = hexToVec3(flavor.base);
      const accentColor = hexToVec3(flavor.accent);
      const brightSilver: Vec3 = [0.78, 0.82, 0.86];
      const lidSilver: Vec3 = [0.46, 0.50, 0.54];
      const insetSilver: Vec3 = [0.29, 0.32, 0.35];
      const darkMetal: Vec3 = [0.08, 0.095, 0.11];
      const scale = width / Math.max(height, 1) < 0.55 ? 0.75 : 0.82;

      // The front artwork is centered at U=.5; a quarter turn presents it directly to the camera.
      const model = compose({
        y: -0.03,
        rotateXValue: -0.055,
        rotateYValue: Math.PI / 2,
        rotateZValue: 0,
        scaleX: scale,
        scaleY: scale,
        scaleZ: scale
      });

      draw(body, model, 1, baseColor, accentColor, 0.035, 0.42);
      const topY = 2.59;
      const bottomY = -2.59;
      draw(top, multiply(model, translation(0, topY, 0)), 0, lidSilver, baseColor, 0.98, 0.20);
      draw(inset, multiply(model, compose({ y: topY + 0.016, scaleZ: 0.94 })), 0, insetSilver, baseColor, 0.92, 0.27);
      draw(bottom, multiply(model, translation(0, bottomY, 0)), 0, lidSilver, baseColor, 0.96, 0.24);
      draw(rim, multiply(model, translation(0, topY + 0.018, 0)), 0, brightSilver, baseColor, 1, 0.14);
      draw(lowerRim, multiply(model, translation(0, bottomY - 0.006, 0)), 0, brightSilver, baseColor, 1, 0.16);
      draw(opening, multiply(model, compose({ x: 0.22, y: topY + 0.045, z: 0.08, scaleX: 1.20, scaleY: 0.66, scaleZ: 0.62 })), 0, darkMetal, baseColor, 0.88, 0.30);
      draw(tab, multiply(model, compose({ x: -0.06, y: topY + 0.083, z: -0.02, rotateYValue: -0.18, scaleX: 1.30, scaleY: 0.72, scaleZ: 0.54 })), 0, brightSilver, baseColor, 0.99, 0.15);
      draw(rivet, multiply(model, compose({ x: -0.27, y: topY + 0.089, z: -0.04 })), 0, brightSilver, baseColor, 0.99, 0.14);
    };

    const observer = new ResizeObserver(render);
    observer.observe(host);
    render();

    return () => {
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteTexture(texture);
      meshes.forEach((mesh) => {
        gl.deleteBuffer(mesh.position);
        gl.deleteBuffer(mesh.normal);
        gl.deleteBuffer(mesh.uv);
        gl.deleteBuffer(mesh.index);
      });
    };
  }, [flavor]);

  return (
    <div ref={hostRef} className="pulse-card-can-model relative h-full w-full pointer-events-none select-none">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[49%] h-[74%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[42px]"
        style={{ background: `radial-gradient(circle, ${flavor.glow}58 0%, transparent 72%)` }}
      />
      <div aria-hidden="true" className="absolute bottom-[5%] left-1/2 h-[7%] w-[44%] -translate-x-1/2 rounded-full bg-black/45 blur-[14px]" />
      <canvas ref={canvasRef} className="relative z-10 block h-full w-full" aria-label={`Front view of Pulse Drip ${flavor.name} can`} />
    </div>
  );
}
