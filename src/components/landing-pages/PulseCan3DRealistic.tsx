"use client";

import { useEffect, useRef } from "react";

import type { PulseFlavor } from "@/components/landing-pages/PulseFlavorData";

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

  float saturateValue(float value) {
    return clamp(value, 0.0, 1.0);
  }

  vec3 saturateColor(vec3 color, float amount) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    return clamp(mix(vec3(luminance), color, amount), 0.0, 1.0);
  }

  float specularTerm(vec3 normal, vec3 lightDirection, vec3 viewDirection, float roughness) {
    vec3 halfVector = normalize(lightDirection + viewDirection);
    float power = mix(250.0, 22.0, roughness);
    return pow(saturateValue(dot(normal, halfVector)), power);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(uCamera - vWorldPosition);

    vec3 keyDirection = normalize(vec3(-0.52, 0.74, 0.62));
    vec3 fillDirection = normalize(vec3(0.80, 0.10, 0.55));
    vec3 rimDirection = normalize(vec3(-0.20, -0.16, 0.97));

    float keyDiffuse = saturateValue(dot(normal, keyDirection));
    float fillDiffuse = saturateValue(dot(normal, fillDirection));
    float rimDiffuse = saturateValue(dot(normal, rimDirection));

    float keySpecular = specularTerm(normal, keyDirection, viewDirection, uRoughness);
    float fillSpecular = specularTerm(normal, fillDirection, viewDirection, min(1.0, uRoughness + 0.14));
    float rimSpecular = specularTerm(normal, rimDirection, viewDirection, min(1.0, uRoughness + 0.04));
    float fresnel = pow(1.0 - saturateValue(dot(normal, viewDirection)), 4.0);

    vec3 textureSrgb = saturateColor(texture2D(uTexture, vUv).rgb, 1.28);
    vec3 baseSrgb = saturateColor(uBaseColor, 1.10);
    vec3 surfaceSrgb = mix(baseSrgb, textureSrgb, uUseTexture);
    vec3 surface = pow(surfaceSrgb, vec3(2.2));

    float printedLight = 0.42 + keyDiffuse * 0.42 + fillDiffuse * 0.11 + rimDiffuse * 0.035;
    float metalLight = 0.10 + keyDiffuse * 0.44 + fillDiffuse * 0.13 + rimDiffuse * 0.06;
    float diffuseLight = mix(metalLight, printedLight, uUseTexture);

    float cylinderDepth = 0.77 + 0.23 * pow(saturateValue(normal.z * 0.5 + 0.5), 0.72);
    float labelEdge = smoothstep(0.0, 0.05, vUv.y) * smoothstep(0.0, 0.05, 1.0 - vUv.y);
    vec3 diffuse = surface * diffuseLight * mix(1.0, cylinderDepth * mix(0.88, 1.0, labelEdge), uUseTexture);

    vec3 specularColor = mix(vec3(0.96, 0.98, 1.0), surface, uMetalness * 0.25);
    float specularStrength = mix(0.14, 1.0, uMetalness);
    vec3 specular = specularColor
      * (keySpecular * 1.42 + fillSpecular * 0.38 + rimSpecular * 0.44)
      * specularStrength;

    float movingSheen = sin(uTime * 0.16) * 0.045;
    float mainSoftbox = exp(-pow((normal.x + 0.43 + movingSheen) * 7.6, 2.0));
    float edgeSoftbox = exp(-pow((normal.x - 0.74) * 12.0, 2.0));

    vec3 color = diffuse + specular;
    color += vec3(1.0) * mainSoftbox * mix(0.24, 0.055, uUseTexture);
    color += mix(vec3(0.76, 0.91, 1.0), uAccentColor, 0.10)
      * edgeSoftbox
      * mix(0.13, 0.035, uUseTexture);
    color += mix(vec3(0.88, 0.96, 1.0), uAccentColor, 0.10)
      * fresnel
      * mix(0.28, 0.055, uUseTexture);

    float brushed = sin(vWorldPosition.y * 250.0 + vWorldPosition.x * 37.0) * 0.006 * uMetalness;
    brushed += sin(vWorldPosition.y * 104.0 - vWorldPosition.z * 53.0) * 0.003 * uMetalness;
    color += brushed;

    // Printed ink keeps its density while the exposed lid remains reflective metal.
    vec3 printAnchor = surface * (0.31 + keyDiffuse * 0.08);
    color = mix(color, max(color, printAnchor), uUseTexture * 0.82);

    color = color / (vec3(1.0) + color * mix(0.46, 0.16, uUseTexture));
    color = pow(max(color, vec3(0.0)), vec3(1.0 / 2.2));

    gl_FragColor = vec4(color, 1.0);
  }
`;

function hexToVec3(hex: string): Vec3 {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
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
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * range, -1,
    0, 0, far * near * 2 * range, 0
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
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function lookAt(eye: Vec3, target: Vec3, up: Vec3): Mat4 {
  const z = normalize(subtract(eye, target));
  const x = normalize(cross(up, z));
  const y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1
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

function smoothStep(progress: number) {
  return progress * progress * (3 - 2 * progress);
}

function canRadius(progress: number, radius: number) {
  let result = radius;
  if (progress < 0.065) {
    const local = smoothStep(progress / 0.065);
    result *= 0.968 + local * 0.032;
  }
  if (progress > 0.895) {
    const local = smoothStep((progress - 0.895) / 0.105);
    result *= 1 - local * 0.068;
  }
  return result;
}

function createProfiledCanSide(
  radius: number,
  height: number,
  radialSegments: number,
  heightSegments: number
): MeshData {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const sampleStep = 1 / heightSegments;

  for (let yIndex = 0; yIndex <= heightSegments; yIndex += 1) {
    const yProgress = yIndex / heightSegments;
    const y = -height / 2 + yProgress * height;
    const profileRadius = canRadius(yProgress, radius);
    const previousRadius = canRadius(Math.max(0, yProgress - sampleStep), radius);
    const nextRadius = canRadius(Math.min(1, yProgress + sampleStep), radius);
    const radialSlope = (nextRadius - previousRadius) / (Math.max(sampleStep * 2, 0.0001) * height);

    for (let xIndex = 0; xIndex <= radialSegments; xIndex += 1) {
      const progress = xIndex / radialSegments;
      const angle = progress * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const normal = normalize([cosine, -radialSlope, sine]);

      positions.push(profileRadius * cosine, y, profileRadius * sine);
      normals.push(...normal);
      // Front artwork is centered at U=.75 and back copy at U=.25.
      uvs.push(1 - progress, yProgress);
    }
  }

  const row = radialSegments + 1;
  for (let yIndex = 0; yIndex < heightSegments; yIndex += 1) {
    for (let xIndex = 0; xIndex < radialSegments; xIndex += 1) {
      const a = yIndex * row + xIndex;
      const b = a + row;
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

function createTorus(
  majorRadius: number,
  minorRadius: number,
  majorSegments: number,
  minorSegments: number
): MeshData {
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

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function drawBand(
  context: CanvasRenderingContext2D,
  color: string,
  x: number,
  width: number,
  alpha: number
) {
  context.save();
  context.translate(x, 1024);
  context.rotate(-0.28);
  context.globalAlpha = alpha;
  context.fillStyle = color;
  context.fillRect(-width / 2, -1700, width, 3400);
  context.restore();
}

function drawLines(
  context: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number
) {
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
}

function drawBarcode(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) {
  const pattern = [3, 1, 2, 1, 4, 2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 4, 1, 2, 2, 1, 3, 2, 1, 4, 2, 1, 2, 3, 1, 1, 4, 2, 1];
  const total = pattern.reduce((sum, value) => sum + value, 0);
  let cursor = x;
  context.fillStyle = color;
  pattern.forEach((value, index) => {
    const barWidth = (value / total) * width;
    if (index % 2 === 0) context.fillRect(cursor, y, Math.max(2, barWidth), height);
    cursor += barWidth;
  });
}

const labelCanvasCache = new Map<string, HTMLCanvasElement>();

function createLabelCanvas(flavor: PulseFlavor, textureSize = 2048) {
  const cacheKey = `${flavor.key}-${textureSize}`;
  const cachedCanvas = labelCanvasCache.get(cacheKey);
  if (cachedCanvas) return cachedCanvas;

  const canvas = document.createElement("canvas");
  canvas.width = textureSize;
  canvas.height = textureSize;
  const context = canvas.getContext("2d");
  if (!context) return canvas;

  const designSize = 2048;
  context.scale(textureSize / designSize, textureSize / designSize);

  const frontX = 1536;
  const backX = 512;

  const gradient = context.createLinearGradient(0, 0, designSize, designSize);
  gradient.addColorStop(0, flavor.accent);
  gradient.addColorStop(0.18, flavor.base);
  gradient.addColorStop(0.52, flavor.secondary);
  gradient.addColorStop(0.78, flavor.base);
  gradient.addColorStop(1, flavor.accent);
  context.fillStyle = gradient;
  context.fillRect(0, 0, designSize, designSize);

  const glow = context.createRadialGradient(frontX - 260, 210, 20, frontX - 260, 210, 760);
  glow.addColorStop(0, "rgba(255,255,255,.34)");
  glow.addColorStop(0.48, "rgba(255,255,255,.07)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, designSize, designSize);

  drawBand(context, flavor.accent, frontX + 290, 360, 0.98);
  drawBand(context, "#ffffff", frontX + 90, 74, 0.15);
  drawBand(context, flavor.secondary, frontX - 310, 164, 0.70);
  drawBand(context, flavor.accent, backX - 300, 250, 0.42);

  context.save();
  context.strokeStyle = flavor.ink;
  context.globalAlpha = 0.12;
  context.lineWidth = 4;
  for (let index = -8; index < 26; index += 1) {
    context.beginPath();
    context.moveTo(index * 102, 1510);
    context.lineTo(index * 102 + 740, 2048);
    context.stroke();
  }
  context.restore();

  // Front face.
  context.textAlign = "center";
  context.textBaseline = "alphabetic";
  context.lineJoin = "round";
  context.fillStyle = flavor.ink;
  context.strokeStyle = flavor.ink === "#ffffff" ? "rgba(20,5,38,.34)" : "rgba(255,255,255,.22)";
  context.lineWidth = 11;

  context.font = "900 174px Arial Black, Arial, sans-serif";
  context.strokeText("PULSE", frontX, 610);
  context.fillText("PULSE", frontX, 610);
  context.font = "900 214px Arial Black, Arial, sans-serif";
  context.strokeText("DRIP", frontX, 802);
  context.fillText("DRIP", frontX, 802);

  context.globalAlpha = 0.96;
  context.font = "900 42px Arial, sans-serif";
  context.fillText(flavor.name.toUpperCase(), frontX, 950);

  context.globalAlpha = 0.86;
  context.font = "700 25px Arial, sans-serif";
  context.fillText("CLEAN ENERGY  /  ZERO SUGAR", frontX, 1055);
  context.fillText("180MG CAFFEINE  /  ELECTROLYTES", frontX, 1099);

  context.globalAlpha = 1;
  context.lineWidth = 5;
  context.strokeStyle = flavor.ink;
  context.beginPath();
  context.arc(frontX, 1375, 116, 0, Math.PI * 2);
  context.stroke();
  context.font = "900 82px Arial Black, Arial, sans-serif";
  context.fillText("180", frontX, 1400);
  context.font = "700 22px Arial, sans-serif";
  context.fillText("MG CAFFEINE", frontX, 1443);
  context.font = "900 29px Arial, sans-serif";
  context.fillText("FUEL THE MOMENT.", frontX, 1710);
  context.font = "700 23px Arial, sans-serif";
  context.fillText("12 FL OZ / 355 ML", frontX, 1840);

  // Back face: realistic packaging copy and utility information.
  const lightInk = flavor.ink === "#ffffff";
  const panelFill = lightInk ? "rgba(16,8,28,.72)" : "rgba(255,255,255,.72)";
  const panelBorder = lightInk ? "rgba(255,255,255,.34)" : "rgba(10,16,12,.28)";
  const panelText = lightInk ? "#ffffff" : "#10150b";
  const panelX = backX - 350;
  const panelY = 205;
  const panelWidth = 700;
  const panelHeight = 1640;

  context.save();
  roundedRect(context, panelX, panelY, panelWidth, panelHeight, 34);
  context.fillStyle = panelFill;
  context.fill();
  context.strokeStyle = panelBorder;
  context.lineWidth = 4;
  context.stroke();

  context.fillStyle = panelText;
  context.strokeStyle = panelText;
  context.textAlign = "left";
  context.textBaseline = "top";

  context.font = "900 34px Arial Black, Arial, sans-serif";
  context.fillText("PULSE DRIP", panelX + 46, panelY + 42);
  context.font = "700 18px Arial, sans-serif";
  context.fillText(`${flavor.name.toUpperCase()} / CLEAN ENERGY SYSTEM`, panelX + 46, panelY + 92);

  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(panelX + 46, panelY + 132);
  context.lineTo(panelX + panelWidth - 46, panelY + 132);
  context.stroke();

  context.font = "900 25px Arial Black, Arial, sans-serif";
  context.fillText("SUPPLEMENT FACTS", panelX + 46, panelY + 168);
  context.font = "700 18px Arial, sans-serif";
  drawLines(context, [
    "Serving size                         1 can (355 mL)",
    "Calories                                            15",
    "Total carbohydrate                              3 g",
    "Total sugar                                        0 g",
    "Vitamin B6                              2.0 mg 118%",
    "Vitamin B12                              6 mcg 250%",
    "Caffeine                                        180 mg",
    "Electrolyte blend                              220 mg"
  ], panelX + 46, panelY + 214, 36);

  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(panelX + 46, panelY + 520);
  context.lineTo(panelX + panelWidth - 46, panelY + 520);
  context.stroke();

  context.font = "900 22px Arial Black, Arial, sans-serif";
  context.fillText("INGREDIENTS", panelX + 46, panelY + 555);
  context.font = "700 17px Arial, sans-serif";
  drawLines(context, [
    "Carbonated water, natural flavors, citric acid,",
    "potassium citrate, magnesium lactate, caffeine,",
    "L-theanine, vitamins B6 and B12, sucralose.",
    "",
    "Contains 180 mg caffeine per can."
  ], panelX + 46, panelY + 596, 29);

  context.font = "900 22px Arial Black, Arial, sans-serif";
  context.fillText("CAUTION", panelX + 46, panelY + 790);
  context.font = "700 17px Arial, sans-serif";
  drawLines(context, [
    "Not recommended for children, people who are",
    "pregnant or nursing, or anyone sensitive to caffeine.",
    "Do not mix with alcohol. Consume responsibly."
  ], panelX + 46, panelY + 832, 29);

  context.font = "900 20px Arial Black, Arial, sans-serif";
  context.fillText("BEST SERVED ICE COLD", panelX + 46, panelY + 965);
  context.font = "700 17px Arial, sans-serif";
  drawLines(context, [
    "Crafted for long sessions and louder moments.",
    "pulsedrip.com  /  @pulsedripenergy"
  ], panelX + 46, panelY + 1005, 29);

  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(panelX + 46, panelY + 1090);
  context.lineTo(panelX + panelWidth - 46, panelY + 1090);
  context.stroke();

  // Recycle mark.
  context.font = "900 42px Arial Black, Arial, sans-serif";
  context.fillText("♻", panelX + 46, panelY + 1140);
  context.font = "900 18px Arial, sans-serif";
  context.fillText("PLEASE RECYCLE", panelX + 104, panelY + 1154);

  drawBarcode(context, panelX + 46, panelY + 1235, 350, 145, panelText);
  context.font = "700 15px Arial, sans-serif";
  context.fillText("0 12345 67890 1", panelX + 46, panelY + 1390);

  context.textAlign = "right";
  context.font = "900 18px Arial, sans-serif";
  context.fillText("12 FL OZ / 355 ML", panelX + panelWidth - 46, panelY + 1240);
  context.font = "700 15px Arial, sans-serif";
  drawLines(context, [
    "DISTRIBUTED BY",
    "PULSE DRIP LABS",
    "TORONTO, CANADA",
    "LOT PD-2401"
  ], panelX + panelWidth - 46, panelY + 1282, 25);

  context.textAlign = "center";
  context.font = "700 14px Arial, sans-serif";
  context.fillText("DEMO PRODUCT CONCEPT — NOT FOR RESALE", backX, panelY + panelHeight - 42);
  context.restore();

  labelCanvasCache.set(cacheKey, canvas);
  return canvas;
}

export function PulseCan3DRealistic({
  flavor,
  className = ""
}: {
  flavor: PulseFlavor;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const flavorRef = useRef(flavor);
  const flavorVersionRef = useRef(0);
  const requestRenderRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    flavorRef.current = flavor;
    flavorVersionRef.current += 1;
    requestRenderRef.current?.();
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
    let isInViewport = true;
    let isPageVisible = !document.hidden;
    let elapsedSeconds = 0;
    let lastFrameTime = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const staticMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const animateMotion = !reducedMotion && !staticMobile;
    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    try {
      const program = createProgram(gl);
      gl.useProgram(program);

      const radialSegments = staticMobile ? 80 : 160;
      const heightSegments = staticMobile ? 16 : 32;
      const discSegments = staticMobile ? 64 : 120;
      const torusSegments = staticMobile ? 64 : 120;
      const torusTubeSegments = staticMobile ? 8 : 16;
      const bodyMesh = uploadMesh(gl, createProfiledCanSide(0.96, 5.16, radialSegments, heightSegments));
      const topDiscMesh = uploadMesh(gl, createDisc(0.895, discSegments, true));
      const bottomDiscMesh = uploadMesh(gl, createDisc(0.91, discSegments, false));
      const insetDiscMesh = uploadMesh(gl, createDisc(0.75, staticMobile ? 56 : 104, true));
      const rivetMesh = uploadMesh(gl, createDisc(0.074, staticMobile ? 24 : 40, true));
      const outerRimMesh = uploadMesh(gl, createTorus(0.90, 0.037, torusSegments, torusTubeSegments));
      const lowerRimMesh = uploadMesh(gl, createTorus(0.92, 0.035, torusSegments, torusTubeSegments));
      const seamMesh = uploadMesh(gl, createTorus(0.925, 0.014, staticMobile ? 56 : 112, staticMobile ? 6 : 10));
      const scoreRingMesh = uploadMesh(gl, createTorus(0.34, 0.014, staticMobile ? 48 : 80, staticMobile ? 6 : 10));
      const tabMesh = uploadMesh(gl, createTorus(0.255, 0.047, staticMobile ? 48 : 80, staticMobile ? 8 : 12));
      const openingMesh = uploadMesh(gl, createTorus(0.285, 0.018, staticMobile ? 48 : 80, staticMobile ? 6 : 10));

      const meshes = [
        bodyMesh,
        topDiscMesh,
        bottomDiscMesh,
        insetDiscMesh,
        rivetMesh,
        outerRimMesh,
        lowerRimMesh,
        seamMesh,
        scoreRingMesh,
        tabMesh,
        openingMesh
      ];

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
      if (!texture) throw new Error("Unable to create realistic can texture.");
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(textureLocation, 0);

      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.BACK);
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
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          createLabelCanvas(currentFlavor, staticMobile ? 1024 : 2048)
        );
        gl.generateMipmap(gl.TEXTURE_2D);
      };

      const resize = () => {
        const bounds = host.getBoundingClientRect();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, staticMobile ? 1.25 : 2);
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

      const observer = new ResizeObserver(() => {
        resize();
        requestRenderRef.current?.();
      });
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
      if (animateMotion) {
        host.addEventListener("pointermove", handlePointerMove);
        host.addEventListener("pointerleave", handlePointerLeave);
      }

      const camera: Vec3 = [0, 0.14, 9.15];

      const render = (now: number) => {
        if (disposed) return;

        if (appliedFlavorVersion !== flavorVersionRef.current) {
          appliedFlavorVersion = flavorVersionRef.current;
          updateTexture();
        }

        if (animateMotion && lastFrameTime > 0) {
          elapsedSeconds += Math.min((now - lastFrameTime) / 1000, 0.1);
        }
        lastFrameTime = now;
        const elapsed = animateMotion ? elapsedSeconds : 0;
        pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.052;
        pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.052;

        const aspect = canvas.width / Math.max(canvas.height, 1);
        const projection = perspective(Math.PI / 4.85, aspect, 0.1, 100);
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
        const brightSilver: Vec3 = [0.78, 0.82, 0.86];
        const lidSilver: Vec3 = [0.46, 0.50, 0.54];
        const insetSilver: Vec3 = [0.29, 0.32, 0.35];
        const darkMetal: Vec3 = [0.08, 0.095, 0.11];

        // One complete revolution takes roughly 36 seconds.
        const autoSpin = animateMotion ? elapsed * (Math.PI * 2 / 36) : 0;
        const floatY = animateMotion ? Math.sin(elapsed * 0.88) * 0.055 : 0;
        const idleTiltX = animateMotion ? -0.055 + Math.sin(elapsed * 0.62) * 0.008 : -0.055;
        const idleTiltZ = animateMotion ? -0.028 + Math.sin(elapsed * 0.48) * 0.006 : -0.028;
        const baseRotationX = idleTiltX + pointerCurrent.y * 0.050;
        const baseRotationY = autoSpin + pointerCurrent.x * 0.095;
        const baseRotationZ = idleTiltZ + pointerCurrent.x * 0.014;
        const globalScale = aspect < 0.85 ? 0.78 : 0.90;

        const baseTransform = composeModel({
          y: floatY - 0.02,
          rotateXValue: baseRotationX,
          rotateYValue: baseRotationY,
          rotateZValue: baseRotationZ,
          scaleX: globalScale,
          scaleY: globalScale,
          scaleZ: globalScale
        });

        drawMesh({
          mesh: bodyMesh,
          model: baseTransform,
          useTexture: 1,
          baseColor: flavorBase,
          accentColor: flavorAccent,
          metalness: 0.03,
          roughness: 0.44
        });

        const topY = 2.59;
        const bottomY = -2.59;

        drawMesh({ mesh: topDiscMesh, model: multiply(baseTransform, translation(0, topY, 0)), useTexture: 0, baseColor: lidSilver, accentColor: flavorBase, metalness: 0.98, roughness: 0.20 });
        drawMesh({ mesh: insetDiscMesh, model: multiply(baseTransform, composeModel({ y: topY + 0.016, scaleX: 1, scaleY: 1, scaleZ: 0.94 })), useTexture: 0, baseColor: insetSilver, accentColor: flavorBase, metalness: 0.92, roughness: 0.27 });
        drawMesh({ mesh: bottomDiscMesh, model: multiply(baseTransform, translation(0, bottomY, 0)), useTexture: 0, baseColor: lidSilver, accentColor: flavorBase, metalness: 0.96, roughness: 0.24 });

        drawMesh({ mesh: outerRimMesh, model: multiply(baseTransform, translation(0, topY + 0.018, 0)), useTexture: 0, baseColor: brightSilver, accentColor: flavorBase, metalness: 1, roughness: 0.14 });
        drawMesh({ mesh: lowerRimMesh, model: multiply(baseTransform, translation(0, bottomY - 0.006, 0)), useTexture: 0, baseColor: brightSilver, accentColor: flavorBase, metalness: 1, roughness: 0.16 });
        drawMesh({ mesh: seamMesh, model: multiply(baseTransform, translation(0, 2.33, 0)), useTexture: 0, baseColor: brightSilver, accentColor: flavorBase, metalness: 0.94, roughness: 0.18 });
        drawMesh({ mesh: seamMesh, model: multiply(baseTransform, translation(0, -2.39, 0)), useTexture: 0, baseColor: lidSilver, accentColor: flavorBase, metalness: 0.92, roughness: 0.20 });

        drawMesh({ mesh: openingMesh, model: multiply(baseTransform, composeModel({ x: 0.22, y: topY + 0.045, z: 0.08, scaleX: 1.20, scaleY: 0.66, scaleZ: 0.62 })), useTexture: 0, baseColor: darkMetal, accentColor: flavorBase, metalness: 0.88, roughness: 0.30 });
        drawMesh({ mesh: scoreRingMesh, model: multiply(baseTransform, composeModel({ x: 0.15, y: topY + 0.054, z: 0.03, scaleX: 1.18, scaleY: 0.72, scaleZ: 0.72 })), useTexture: 0, baseColor: lidSilver, accentColor: flavorBase, metalness: 0.94, roughness: 0.20 });
        drawMesh({ mesh: tabMesh, model: multiply(baseTransform, composeModel({ x: -0.06, y: topY + 0.083, z: -0.02, rotateYValue: -0.18, scaleX: 1.30, scaleY: 0.72, scaleZ: 0.54 })), useTexture: 0, baseColor: brightSilver, accentColor: flavorBase, metalness: 0.99, roughness: 0.15 });
        drawMesh({ mesh: rivetMesh, model: multiply(baseTransform, composeModel({ x: -0.27, y: topY + 0.089, z: -0.04 })), useTexture: 0, baseColor: brightSilver, accentColor: flavorBase, metalness: 0.99, roughness: 0.14 });

        if (animateMotion && isInViewport && isPageVisible) {
          animationFrame = requestAnimationFrame(render);
        } else {
          animationFrame = 0;
        }
      };

      const scheduleFrame = () => {
        if (disposed || animationFrame || document.hidden) return;
        animationFrame = requestAnimationFrame(render);
      };

      const updateAnimationActivity = () => {
        isPageVisible = !document.hidden;
        if (animateMotion && isInViewport && isPageVisible) {
          lastFrameTime = 0;
          scheduleFrame();
          return;
        }

        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        lastFrameTime = 0;
      };

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          isInViewport = entry?.isIntersecting ?? true;
          updateAnimationActivity();
        },
        { rootMargin: "160px 0px", threshold: 0 }
      );
      const handleVisibilityChange = () => updateAnimationActivity();
      visibilityObserver.observe(host);
      document.addEventListener("visibilitychange", handleVisibilityChange);

      requestRenderRef.current = () => {
        if (disposed || document.hidden) return;
        if (animateMotion && isInViewport) {
          scheduleFrame();
          return;
        }
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(render);
      };
      requestRenderRef.current();

      return () => {
        disposed = true;
        requestRenderRef.current = null;
        cancelAnimationFrame(animationFrame);
        observer.disconnect();
        visibilityObserver.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        if (animateMotion) {
          host.removeEventListener("pointermove", handlePointerMove);
          host.removeEventListener("pointerleave", handlePointerLeave);
        }
        gl.deleteProgram(program);
        gl.deleteTexture(texture);
        meshes.forEach((mesh) => {
          gl.deleteBuffer(mesh.position);
          gl.deleteBuffer(mesh.normal);
          gl.deleteBuffer(mesh.uv);
          gl.deleteBuffer(mesh.index);
        });
      };
    } catch (error) {
      console.error("Realistic Pulse can renderer failed:", error);
      return undefined;
    }
  }, []);

  return (
    <div ref={hostRef} className={`pulse-can-realistic-root relative h-full w-full ${className}`}>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[48%] h-[70%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[86px] transition-colors duration-700"
        style={{ background: `radial-gradient(circle, ${flavor.glow}78 0%, ${flavor.glow}20 42%, transparent 73%)` }}
      />
      <div aria-hidden="true" className="absolute bottom-[7.5%] left-1/2 h-[8%] w-[42%] -translate-x-1/2 rounded-full bg-black/65 blur-[22px]" />
      <div aria-hidden="true" className="absolute bottom-[8.4%] left-1/2 h-[2.8%] w-[23%] -translate-x-1/2 rounded-full bg-black/80 blur-md" />
      <canvas
        ref={canvasRef}
        className="relative z-10 block h-full w-full drop-shadow-[0_34px_30px_rgba(0,0,0,.32)]"
        aria-label={`Interactive 3D can of Pulse Drip ${flavor.name}`}
      />
    </div>
  );
}
