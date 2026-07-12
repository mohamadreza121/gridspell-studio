"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Vec3 = [number, number, number];
type Mat4 = Float32Array;

type MeshData = {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint16Array;
};

type GpuMesh = {
  position: WebGLBuffer;
  normal: WebGLBuffer;
  index: WebGLBuffer;
  count: number;
};

type RingMaterial = {
  color: Vec3;
  metalness: number;
  roughness: number;
  emission: Vec3;
  emissionStrength: number;
  opacity: number;
  brush: number;
};

type RingPose = {
  x: number;
  y: number;
  z: number;
  scale: number;
  sensors: number;
};

const VERTEX_SHADER = `
  attribute vec3 aPosition;
  attribute vec3 aNormal;

  uniform mat4 uModel;
  uniform mat4 uViewProjection;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    vec4 world = uModel * vec4(aPosition, 1.0);
    vWorldPosition = world.xyz;
    vNormal = normalize(mat3(uModel) * aNormal);
    gl_Position = uViewProjection * world;
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec3 uCamera;
  uniform vec3 uColor;
  uniform vec3 uEmission;
  uniform float uMetalness;
  uniform float uRoughness;
  uniform float uEmissionStrength;
  uniform float uOpacity;
  uniform float uBrush;
  uniform float uTime;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  float saturate(float value) {
    return clamp(value, 0.0, 1.0);
  }

  float specularTerm(vec3 normal, vec3 lightDirection, vec3 viewDirection, float roughness) {
    vec3 halfVector = normalize(lightDirection + viewDirection);
    float power = mix(190.0, 16.0, roughness);
    return pow(saturate(dot(normal, halfVector)), power);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(uCamera - vWorldPosition);

    vec3 keyDirection = normalize(vec3(-0.48, 0.72, 0.58));
    vec3 fillDirection = normalize(vec3(0.72, 0.20, 0.66));
    vec3 rimDirection = normalize(vec3(-0.18, -0.46, 0.88));

    float keyDiffuse = saturate(dot(normal, keyDirection));
    float fillDiffuse = saturate(dot(normal, fillDirection));
    float rimDiffuse = saturate(dot(normal, rimDirection));

    float keySpecular = specularTerm(normal, keyDirection, viewDirection, uRoughness);
    float fillSpecular = specularTerm(normal, fillDirection, viewDirection, min(1.0, uRoughness + 0.12));
    float rimSpecular = specularTerm(normal, rimDirection, viewDirection, min(1.0, uRoughness + 0.04));

    float fresnel = pow(1.0 - saturate(dot(normal, viewDirection)), 4.2);
    vec3 reflectionDirection = reflect(-viewDirection, normal);

    float upperSoftbox = exp(-pow((reflectionDirection.y - 0.48) * 3.5, 2.0));
    float sideSoftbox = exp(-pow((reflectionDirection.x + 0.52) * 5.0, 2.0)) * 0.72;
    float cyanStrip = exp(-pow((reflectionDirection.x - 0.68) * 8.0, 2.0)) * 0.48;
    float lowerDark = 1.0 - smoothstep(-0.82, 0.12, reflectionDirection.y);

    float brushed = sin((vWorldPosition.x * 67.0) + (vWorldPosition.y * 31.0) + uTime * 0.08);
    brushed += sin((vWorldPosition.x * 123.0) - (vWorldPosition.y * 19.0));
    brushed *= 0.012 * uBrush;

    vec3 diffuseColor = uColor * (0.10 + keyDiffuse * 0.32 + fillDiffuse * 0.13 + rimDiffuse * 0.08);
    diffuseColor *= 1.0 - uMetalness * 0.72;

    vec3 metalReflection = mix(vec3(0.045), uColor, uMetalness);
    vec3 studioReflection = metalReflection * (upperSoftbox * 1.18 + sideSoftbox * 0.62);
    studioReflection += vec3(0.30, 0.88, 1.0) * cyanStrip;
    studioReflection *= 0.46 + uMetalness * 0.88;

    vec3 directSpecular = mix(vec3(1.0), uColor, uMetalness * 0.28);
    directSpecular *= keySpecular * 1.55 + fillSpecular * 0.46 + rimSpecular * 0.72;

    vec3 edgeColor = mix(vec3(0.78, 0.92, 1.0), uColor, 0.34);
    vec3 color = diffuseColor + studioReflection + directSpecular + edgeColor * fresnel * (0.18 + uMetalness * 0.54);
    color *= 1.0 - lowerDark * 0.22;
    color += brushed;
    color += uEmission * uEmissionStrength;

    color = color / (color + vec3(1.0));
    color = pow(color, vec3(1.0 / 2.2));

    gl_FragColor = vec4(color, uOpacity);
  }
`;

const POSES: Record<string, RingPose> = {
  hero: { x: -0.52, y: -0.16, z: -0.10, scale: 1.02, sensors: 0.42 },
  design: { x: -0.38, y: 0.12, z: -0.06, scale: 0.98, sensors: 0.38 },
  sensors: { x: -0.74, y: -0.42, z: 0.12, scale: 1.00, sensors: 1.0 },
  motion: { x: -0.44, y: 0.58, z: -0.18, scale: 0.98, sensors: 0.68 },
  intelligence: { x: -0.28, y: -0.08, z: 0.08, scale: 1.00, sensors: 0.88 }
};

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function mixPose(from: RingPose, to: RingPose, progress: number): RingPose {
  return {
    x: mix(from.x, to.x, progress),
    y: mix(from.y, to.y, progress),
    z: mix(from.z, to.z, progress),
    scale: mix(from.scale, to.scale, progress),
    sensors: mix(from.sensors, to.sensors, progress)
  };
}

function signPower(value: number, exponent: number) {
  return Math.sign(value) * Math.pow(Math.abs(value), exponent);
}

function normalize(vector: Vec3): Vec3 {
  const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;
  return [vector[0] / length, vector[1] / length, vector[2] / length];
}

function subtract(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function ringPoint(
  u: number,
  v: number,
  majorRadius: number,
  radialHalf: number,
  depthHalf: number,
  profilePower: number
): Vec3 {
  const exponent = 2 / profilePower;
  const radial = radialHalf * signPower(Math.cos(v), exponent);
  const depth = depthHalf * signPower(Math.sin(v), exponent);
  const radius = majorRadius + radial;
  return [radius * Math.cos(u), radius * Math.sin(u), depth];
}

function createRingGeometry({
  majorRadius,
  radialHalf,
  depthHalf,
  uSegments,
  vSegments,
  profilePower,
  vStart = 0,
  vEnd = Math.PI * 2
}: {
  majorRadius: number;
  radialHalf: number;
  depthHalf: number;
  uSegments: number;
  vSegments: number;
  profilePower: number;
  vStart?: number;
  vEnd?: number;
}): MeshData {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const epsilon = 0.0008;

  for (let uIndex = 0; uIndex <= uSegments; uIndex += 1) {
    const u = (uIndex / uSegments) * Math.PI * 2;

    for (let vIndex = 0; vIndex <= vSegments; vIndex += 1) {
      const v = mix(vStart, vEnd, vIndex / vSegments);
      const point = ringPoint(u, v, majorRadius, radialHalf, depthHalf, profilePower);
      const pointU = ringPoint(u + epsilon, v, majorRadius, radialHalf, depthHalf, profilePower);
      const pointV = ringPoint(u, v + epsilon, majorRadius, radialHalf, depthHalf, profilePower);
      let normal = normalize(cross(subtract(pointU, point), subtract(pointV, point)));
      const expected: Vec3 = [Math.cos(u) * Math.cos(v), Math.sin(u) * Math.cos(v), Math.sin(v)];

      if (dot(normal, expected) < 0) normal = [-normal[0], -normal[1], -normal[2]];

      positions.push(...point);
      normals.push(...normal);
    }
  }

  const row = vSegments + 1;

  for (let uIndex = 0; uIndex < uSegments; uIndex += 1) {
    for (let vIndex = 0; vIndex < vSegments; vIndex += 1) {
      const a = uIndex * row + vIndex;
      const b = (uIndex + 1) * row + vIndex;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices)
  };
}

function createSphereGeometry(radius = 1, widthSegments = 24, heightSegments = 16): MeshData {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  for (let yIndex = 0; yIndex <= heightSegments; yIndex += 1) {
    const phi = (yIndex / heightSegments) * Math.PI;

    for (let xIndex = 0; xIndex <= widthSegments; xIndex += 1) {
      const theta = (xIndex / widthSegments) * Math.PI * 2;
      const normal: Vec3 = [
        -Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi)
      ];
      positions.push(normal[0] * radius, normal[1] * radius, normal[2] * radius);
      normals.push(...normal);
    }
  }

  const row = widthSegments + 1;

  for (let yIndex = 0; yIndex < heightSegments; yIndex += 1) {
    for (let xIndex = 0; xIndex < widthSegments; xIndex += 1) {
      const a = yIndex * row + xIndex;
      const b = a + row;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices)
  };
}

function identityMatrix(): Mat4 {
  return new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
}

function multiplyMatrices(a: Mat4, b: Mat4): Mat4 {
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

function translationMatrix(x: number, y: number, z: number): Mat4 {
  const matrix = identityMatrix();
  matrix[12] = x;
  matrix[13] = y;
  matrix[14] = z;
  return matrix;
}

function scaleMatrix(x: number, y: number, z: number): Mat4 {
  const matrix = identityMatrix();
  matrix[0] = x;
  matrix[5] = y;
  matrix[10] = z;
  return matrix;
}

function rotationXMatrix(angle: number): Mat4 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return new Float32Array([
    1, 0, 0, 0,
    0, cosine, sine, 0,
    0, -sine, cosine, 0,
    0, 0, 0, 1
  ]);
}

function rotationYMatrix(angle: number): Mat4 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return new Float32Array([
    cosine, 0, -sine, 0,
    0, 1, 0, 0,
    sine, 0, cosine, 0,
    0, 0, 0, 1
  ]);
}

function rotationZMatrix(angle: number): Mat4 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return new Float32Array([
    cosine, sine, 0, 0,
    -sine, cosine, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
}

function perspectiveMatrix(fieldOfView: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fieldOfView / 2);
  const rangeInverse = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInverse, -1,
    0, 0, near * far * 2 * rangeInverse, 0
  ]);
}

function composeModel(rotation: Vec3, scale: number): Mat4 {
  const rotations = multiplyMatrices(
    rotationZMatrix(rotation[2]),
    multiplyMatrices(rotationYMatrix(rotation[1]), rotationXMatrix(rotation[0]))
  );
  return multiplyMatrices(rotations, scaleMatrix(scale, scale, scale));
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
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();

  if (!program) throw new Error("Unable to create WebGL program.");

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown WebGL link error.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

function uploadMesh(gl: WebGLRenderingContext, data: MeshData): GpuMesh {
  const position = gl.createBuffer();
  const normal = gl.createBuffer();
  const index = gl.createBuffer();

  if (!position || !normal || !index) throw new Error("Unable to allocate WebGL buffers.");

  gl.bindBuffer(gl.ARRAY_BUFFER, position);
  gl.bufferData(gl.ARRAY_BUFFER, data.positions, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normal);
  gl.bufferData(gl.ARRAY_BUFFER, data.normals, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.indices, gl.STATIC_DRAW);

  return { position, normal, index, count: data.indices.length };
}

function getUniform(gl: WebGLRenderingContext, program: WebGLProgram, name: string) {
  const location = gl.getUniformLocation(program, name);
  if (location === null) throw new Error(`Missing WebGL uniform: ${name}`);
  return location;
}

function readScrollPose(): RingPose {
  const keys = ["design", "sensors", "motion", "intelligence"] as const;
  const pageY = window.scrollY || window.pageYOffset || 0;
  const cursor = pageY + window.innerHeight * 0.52;
  const anchors = keys
    .map((key) => {
      const element = document.getElementById(key);
      if (!element) return null;
      const bounds = element.getBoundingClientRect();
      return pageY + bounds.top + bounds.height * 0.5;
    })
    .filter((value): value is number => value !== null);

  if (anchors.length !== keys.length || cursor <= anchors[0]) {
    const designStart = anchors[0] ?? window.innerHeight * 1.25;
    return mixPose(POSES.hero, POSES.design, clamp(cursor / Math.max(designStart, 1), 0, 1));
  }

  for (let index = 0; index < anchors.length - 1; index += 1) {
    if (cursor <= anchors[index + 1]) {
      const progress = clamp((cursor - anchors[index]) / Math.max(anchors[index + 1] - anchors[index], 1), 0, 1);
      return mixPose(POSES[keys[index]], POSES[keys[index + 1]], progress);
    }
  }

  return POSES.intelligence;
}

function AuraRing3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const layer = layerRef.current;
    const product = layer?.closest<HTMLElement>("#aura-scroll-product");

    if (!canvas || !layer || !product || !window.matchMedia("(min-width: 1024px)").matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false
    });

    if (!gl) return;

    let frame = 0;
    let disposed = false;
    let visible = document.visibilityState === "visible";
    let currentPose = readScrollPose();
    let targetPose = currentPose;
    let pointerTarget: [number, number] = [0, 0];
    let pointerCurrent: [number, number] = [0, 0];
    let hasRendered = false;
    let renderFrame: (timestamp: number) => void = () => undefined;

    try {
      const program = createProgram(gl);
      gl.useProgram(program);

      const positionLocation = gl.getAttribLocation(program, "aPosition");
      const normalLocation = gl.getAttribLocation(program, "aNormal");
      if (positionLocation < 0 || normalLocation < 0) throw new Error("Missing AURA WebGL attributes.");

      const uniforms = {
        model: getUniform(gl, program, "uModel"),
        viewProjection: getUniform(gl, program, "uViewProjection"),
        camera: getUniform(gl, program, "uCamera"),
        color: getUniform(gl, program, "uColor"),
        emission: getUniform(gl, program, "uEmission"),
        metalness: getUniform(gl, program, "uMetalness"),
        roughness: getUniform(gl, program, "uRoughness"),
        emissionStrength: getUniform(gl, program, "uEmissionStrength"),
        opacity: getUniform(gl, program, "uOpacity"),
        brush: getUniform(gl, program, "uBrush"),
        time: getUniform(gl, program, "uTime")
      };

      const shell = uploadMesh(gl, createRingGeometry({
        majorRadius: 2,
        radialHalf: 0.50,
        depthHalf: 0.29,
        uSegments: 176,
        vSegments: 44,
        profilePower: 4.6
      }));
      const innerChannel = uploadMesh(gl, createRingGeometry({
        majorRadius: 2,
        radialHalf: 0.515,
        depthHalf: 0.215,
        uSegments: 176,
        vSegments: 18,
        profilePower: 3.8,
        vStart: Math.PI - 0.76,
        vEnd: Math.PI + 0.76
      }));
      const sensorRail = uploadMesh(gl, createRingGeometry({
        majorRadius: 2,
        radialHalf: 0.535,
        depthHalf: 0.12,
        uSegments: 176,
        vSegments: 12,
        profilePower: 3.4,
        vStart: Math.PI - 0.48,
        vEnd: Math.PI + 0.48
      }));
      const sphere = uploadMesh(gl, createSphereGeometry());
      const meshes = [shell, innerChannel, sensorRail, sphere];

      const titanium: RingMaterial = {
        color: [0.78, 0.84, 0.89],
        metalness: 0.94,
        roughness: 0.24,
        emission: [0.02, 0.05, 0.07],
        emissionStrength: 0.12,
        opacity: 1,
        brush: 1
      };
      const graphite: RingMaterial = {
        color: [0.022, 0.030, 0.044],
        metalness: 0.48,
        roughness: 0.42,
        emission: [0.008, 0.018, 0.024],
        emissionStrength: 0.18,
        opacity: 1,
        brush: 0.12
      };
      const railMaterial: RingMaterial = {
        color: [0.08, 0.105, 0.13],
        metalness: 0.68,
        roughness: 0.28,
        emission: [0.01, 0.04, 0.055],
        emissionStrength: 0.25,
        opacity: 1,
        brush: 0.22
      };
      const sensorGlass: RingMaterial = {
        color: [0.34, 0.82, 0.92],
        metalness: 0.14,
        roughness: 0.12,
        emission: [0.20, 0.92, 1.0],
        emissionStrength: 1,
        opacity: 0.98,
        brush: 0
      };
      const contactMaterial: RingMaterial = {
        color: [0.72, 0.78, 0.82],
        metalness: 0.88,
        roughness: 0.18,
        emission: [0.08, 0.12, 0.14],
        emissionStrength: 0.16,
        opacity: 1,
        brush: 0.3
      };

      const cameraPosition: Vec3 = [0, 0, 7.6];

      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.BACK);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);

      const bindMesh = (mesh: GpuMesh) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.position);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normal);
        gl.enableVertexAttribArray(normalLocation);
        gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.index);
      };

      const applyMaterial = (material: RingMaterial, sensorStrength = 1) => {
        gl.uniform3fv(uniforms.color, material.color);
        gl.uniform3fv(uniforms.emission, material.emission);
        gl.uniform1f(uniforms.metalness, material.metalness);
        gl.uniform1f(uniforms.roughness, material.roughness);
        gl.uniform1f(uniforms.emissionStrength, material.emissionStrength * sensorStrength);
        gl.uniform1f(uniforms.opacity, material.opacity);
        gl.uniform1f(uniforms.brush, material.brush);
      };

      const drawMesh = (mesh: GpuMesh, model: Mat4, material: RingMaterial, sensorStrength = 1) => {
        bindMesh(mesh);
        gl.uniformMatrix4fv(uniforms.model, false, model);
        applyMaterial(material, sensorStrength);
        gl.drawElements(gl.TRIANGLES, mesh.count, gl.UNSIGNED_SHORT, 0);
      };

      const resize = () => {
        const bounds = layer.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.55);
        const width = Math.max(1, Math.round(bounds.width * dpr));
        const height = Math.max(1, Math.round(bounds.height * dpr));

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      };

      const render = (timestamp: number) => {
        if (disposed) return;
        resize();

        if (visible && !product.classList.contains("is-hidden")) {
          const time = timestamp * 0.001;
          currentPose = mixPose(currentPose, targetPose, reducedMotion ? 1 : 0.055);
          pointerCurrent = [
            mix(pointerCurrent[0], pointerTarget[0], reducedMotion ? 1 : 0.052),
            mix(pointerCurrent[1], pointerTarget[1], reducedMotion ? 1 : 0.052)
          ];

          const rotation: Vec3 = [
            currentPose.x - pointerCurrent[1] * 0.075 + (reducedMotion ? 0 : Math.sin(time * 0.34) * 0.022),
            currentPose.y + pointerCurrent[0] * 0.10 + (reducedMotion ? 0 : Math.sin(time * 0.25 + 0.8) * 0.034),
            currentPose.z - pointerCurrent[0] * 0.024 + (reducedMotion ? 0 : Math.sin(time * 0.29 + 1.4) * 0.016)
          ];
          const parentModel = composeModel(rotation, currentPose.scale);
          const projection = perspectiveMatrix(43 * (Math.PI / 180), canvas.width / Math.max(canvas.height, 1), 0.1, 40);
          const viewProjection = multiplyMatrices(projection, translationMatrix(0, 0, -cameraPosition[2]));

          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          gl.useProgram(program);
          gl.uniformMatrix4fv(uniforms.viewProjection, false, viewProjection);
          gl.uniform3fv(uniforms.camera, cameraPosition);
          gl.uniform1f(uniforms.time, time);

          drawMesh(shell, parentModel, titanium);
          drawMesh(innerChannel, parentModel, graphite);
          drawMesh(sensorRail, parentModel, railMaterial);

          const sensorAngles = [-2.18, -1.78, -1.36, -0.98, 2.76];
          sensorAngles.forEach((angle, index) => {
            const size = index === 4 ? 0.085 : 0.105;
            const local = multiplyMatrices(
              translationMatrix(Math.cos(angle) * 1.43, Math.sin(angle) * 1.43, index % 2 === 0 ? -0.015 : 0.035),
              scaleMatrix(size, size, size)
            );
            drawMesh(
              sphere,
              multiplyMatrices(parentModel, local),
              index === 1 || index === 2 ? sensorGlass : contactMaterial,
              currentPose.sensors
            );
          });

          if (!hasRendered) {
            hasRendered = true;
            product.classList.add("aura-ring-webgl-ready");
            setReady(true);
          }
        }

        if (!reducedMotion) frame = requestAnimationFrame(renderFrame);
      };

      renderFrame = render;

      const requestStaticRender = () => {
        targetPose = readScrollPose();
        if (reducedMotion) requestAnimationFrame(renderFrame);
      };
      const handlePointerMove = (event: PointerEvent) => {
        pointerTarget = [
          clamp((event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1, -1, 1),
          clamp((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1, -1, 1)
        ];
      };
      const handleVisibility = () => {
        visible = document.visibilityState === "visible";
        if (visible && !reducedMotion) {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(renderFrame);
        }
      };
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        product.classList.remove("aura-ring-webgl-ready");
        setReady(false);
      };

      const resizeObserver = new ResizeObserver(() => {
        resize();
        if (reducedMotion) requestAnimationFrame(renderFrame);
      });
      resizeObserver.observe(layer);

      window.addEventListener("scroll", requestStaticRender, { passive: true });
      window.addEventListener("resize", requestStaticRender);
      document.addEventListener("visibilitychange", handleVisibility);
      canvas.addEventListener("webglcontextlost", handleContextLost);
      if (!reducedMotion) window.addEventListener("pointermove", handlePointerMove, { passive: true });

      requestStaticRender();
      resize();
      frame = requestAnimationFrame(renderFrame);

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        window.removeEventListener("scroll", requestStaticRender);
        window.removeEventListener("resize", requestStaticRender);
        document.removeEventListener("visibilitychange", handleVisibility);
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        window.removeEventListener("pointermove", handlePointerMove);
        product.classList.remove("aura-ring-webgl-ready");
        meshes.forEach((mesh) => {
          gl.deleteBuffer(mesh.position);
          gl.deleteBuffer(mesh.normal);
          gl.deleteBuffer(mesh.index);
        });
        gl.deleteProgram(program);
      };
    } catch (error) {
      console.warn("AURA WebGL ring fallback activated.", error);
      product.classList.remove("aura-ring-webgl-ready");
      setReady(false);
      return;
    }
  }, []);

  return (
    <div ref={layerRef} className={`aura-ring-webgl-layer ${ready ? "is-ready" : ""}`} aria-hidden="true">
      <div className="aura-ring-webgl-glow" />
      <div className="aura-ring-webgl-shadow" />
      <canvas ref={canvasRef} className="aura-ring-webgl-canvas" />
      <style>{`
        .aura-ring-webgl-layer {
          position:absolute;
          inset:-2%;
          z-index:3;
          pointer-events:none;
          opacity:0;
          transition:opacity 520ms cubic-bezier(.2,.85,.2,1);
        }
        .aura-ring-webgl-layer.is-ready { opacity:1; }
        .aura-ring-webgl-canvas {
          position:absolute;
          inset:0;
          height:100%;
          width:100%;
          filter:drop-shadow(0 38px 70px rgba(2,6,23,.34));
        }
        .aura-ring-webgl-glow {
          position:absolute;
          inset:15%;
          border-radius:999px;
          background:radial-gradient(circle,rgba(103,232,249,.24),rgba(56,189,248,.07) 44%,transparent 72%);
          filter:blur(38px);
          opacity:.78;
        }
        .aura-ring-webgl-shadow {
          position:absolute;
          left:19%;
          right:19%;
          bottom:11%;
          height:9%;
          border-radius:50%;
          background:rgba(2,6,23,.44);
          filter:blur(19px);
          transform:scaleX(.92);
        }
        #aura-scroll-product .aura-scroll-product-inner {
          transition:opacity 460ms cubic-bezier(.2,.85,.2,1),filter 460ms cubic-bezier(.2,.85,.2,1);
        }
        #aura-scroll-product.aura-ring-webgl-ready .aura-scroll-product-inner {
          opacity:0;
          filter:blur(5px);
        }
        @media (max-width:1023px) {
          .aura-ring-webgl-layer { display:none; }
        }
        @media (prefers-reduced-motion:reduce) {
          .aura-ring-webgl-layer,
          #aura-scroll-product .aura-scroll-product-inner { transition:none; }
        }
      `}</style>
    </div>
  );
}

export function AuraRing3DPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    window.requestAnimationFrame(() => setTarget(document.getElementById("aura-scroll-product")));
  }, []);

  return target ? createPortal(<AuraRing3DCanvas />, target) : null;
}
