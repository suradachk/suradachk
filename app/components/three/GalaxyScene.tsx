"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faMeteor, faCompass } from "@fortawesome/free-solid-svg-icons";

interface GalaxySceneProps {
  isWarpSpeed?: boolean;
  onToggleWarp?: () => void;
}

export default function GalaxyScene({ isWarpSpeed = false, onToggleWarp }: GalaxySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [warpActive, setWarpActive] = useState(isWarpSpeed);

  useEffect(() => {
    setWarpActive(isWarpSpeed);
  }, [isWarpSpeed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // 2. Procedural Spiral Galaxy Parameters
    const parameters = {
      count: 4500,
      size: 0.03,
      radius: 6.5,
      branches: 3,
      spin: 1.2,
      randomness: 0.45,
      power: 3.5,
      insideColor: "#ffeaa7", // Stellar core gold-white
      midColor: "#00f0ff",    // Cyan branch stars
      outsideColor: "#7928ca", // Cosmic violet outer rim
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const originalPositions = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorMid = new THREE.Color(parameters.midColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      // Position calculation along spiral arms
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), parameters.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      const posX = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const posY = randomY;
      const posZ = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      positions[i3] = posX;
      positions[i3 + 1] = posY;
      positions[i3 + 2] = posZ;

      originalPositions[i3] = posX;
      originalPositions[i3 + 1] = posY;
      originalPositions[i3 + 2] = posZ;

      // Color interpolation from core to outer edge
      const mixedColor = colorInside.clone();
      const normRadius = radius / parameters.radius;
      if (normRadius < 0.5) {
        mixedColor.lerp(colorMid, normRadius * 2);
      } else {
        mixedColor.copy(colorMid).lerp(colorOutside, (normRadius - 0.5) * 2);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const points = new THREE.Points(geometry, material);
    galaxyGroup.add(points);
    galaxyGroup.rotation.x = Math.PI * 0.18; // Cinematic tilt

    // 3. Central Celestial Body (Planet Architectus with Rings)
    const planetGroup = new THREE.Group();
    galaxyGroup.add(planetGroup);

    // Planet Core Sphere
    const planetGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x0f1b33,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.25,
      roughness: 0.4,
      metalness: 0.8,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Atmosphere Glow Wireframe
    const atmoGeo = new THREE.SphereGeometry(0.92, 24, 24);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    planetGroup.add(atmoMesh);

    // Planetary Rings (Saturn-like)
    const ringGeo = new THREE.RingGeometry(1.2, 1.85, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x9d4edd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.55;
    planetGroup.add(ringMesh);

    // Orbiting Satellite Probes
    const probeCount = 3;
    const probes: THREE.Mesh[] = [];
    for (let p = 0; p < probeCount; p++) {
      const probeGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const probeMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
      const probe = new THREE.Mesh(probeGeo, probeMat);
      planetGroup.add(probe);
      probes.push(probe);
    }

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x00f0ff, 3, 15);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 5. Mouse Interaction & Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.8;
      mouseY = y * 0.8;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        galaxyGroup.rotation.y += deltaX * 0.006;
        galaxyGroup.rotation.x += deltaY * 0.006;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousedown", onMouseDown);

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // 6. Animation Loop with Warp Speed Logic
    let animId: number;
    let clock = new THREE.Clock();
    let currentSpeed = 0.05;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Warp speed acceleration / deceleration
      const targetSpeed = warpActive ? 0.35 : 0.04;
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;

      // Galaxy rotation
      if (!isDragging) {
        galaxyGroup.rotation.y += currentSpeed * delta * 2;
      }

      // Parallax damping
      targetRotationX += (mouseY - targetRotationX) * 0.03;
      targetRotationY += (mouseX - targetRotationY) * 0.03;
      camera.position.x = targetRotationY * 2.5;
      camera.position.y = 3 - targetRotationX * 1.5;
      camera.lookAt(0, 0, 0);

      // Planet rotation & satellite orbits
      planetMesh.rotation.y += delta * 0.4;
      atmoMesh.rotation.y -= delta * 0.2;
      ringMesh.rotation.z += delta * 0.15;

      probes.forEach((probe, idx) => {
        const speed = 1.2 + idx * 0.4;
        const angle = elapsed * speed + (idx * Math.PI * 2) / probeCount;
        const dist = 1.9 + idx * 0.3;
        probe.position.set(
          Math.cos(angle) * dist,
          Math.sin(angle * 0.8) * 0.3,
          Math.sin(angle) * dist
        );
      });

      // Warp stretch effect on particles
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      if (warpActive) {
        for (let i = 0; i < parameters.count; i++) {
          const i3 = i * 3;
          posArr[i3 + 2] += (Math.random() - 0.5) * 0.15;
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onMouseDown);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      planetGeo.dispose();
      planetMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [warpActive]);

  return (
    <div className="relative w-full h-[420px] md:h-[560px] flex items-center justify-center select-none overflow-hidden rounded-3xl glass-panel border border-cyan-500/20 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="3D Spiral Galaxy - Drag to rotate view"
      />

      {/* Top Left: Orbit Telemetry HUD */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-bold tracking-wider">SECTOR 07: SPIRAL CORE</span>
      </div>

      {/* Bottom Center: Interactive Warp Drive Action */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={() => {
            const next = !warpActive;
            setWarpActive(next);
            if (onToggleWarp) onToggleWarp();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold transition-all shadow-lg ${
            warpActive
              ? "bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(157,78,221,0.8)] scale-105"
              : "bg-slate-900/90 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          }`}
        >
          <FontAwesomeIcon icon={faRocket} className={warpActive ? "animate-bounce" : ""} />
          <span>{warpActive ? "WARP DRIVE: ENGAGED" : "ENGAGE WARP DRIVE"}</span>
        </button>
      </div>

      {/* Bottom Right: Hint */}
      <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 text-[11px] font-mono text-slate-400 border border-slate-800">
        <FontAwesomeIcon icon={faCompass} className="text-cyan-400 text-xs" />
        <span>Drag to explore orbit</span>
      </div>
    </div>
  );
}
