"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface AppleSceneProps {
  finish?: "natural" | "spaceblack" | "silver";
}

const FINISHES = {
  natural: {
    body: 0x8a8886,
    accent: 0x0071e3, // Apple Pro Blue
    glow: 0x64d2ff,
    name: "Natural Titanium",
  },
  spaceblack: {
    body: 0x242526,
    accent: 0x9b51e0, // Purple
    glow: 0xbf5af2,
    name: "Space Black",
  },
  silver: {
    body: 0xd2d2d7,
    accent: 0x2997ff, // Light blue
    glow: 0x70d7ff,
    name: "White Titanium",
  },
};

export default function AppleScene({ finish = "natural" }: AppleSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFinish, setActiveFinish] = useState<"natural" | "spaceblack" | "silver">(finish);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const currentPalette = FINISHES[activeFinish];

    // Main rotating showcase group
    const deviceGroup = new THREE.Group();
    scene.add(deviceGroup);

    // 2. Titanium Device Chassis (Apple Studio Display / Pro Slab)
    // Outer rounded chassis
    const chassisWidth = 3.6;
    const chassisHeight = 4.8;
    const chassisDepth = 0.22;

    const chassisGeo = new THREE.BoxGeometry(chassisWidth, chassisHeight, chassisDepth);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: currentPalette.body,
      metalness: 0.92,
      roughness: 0.22,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    deviceGroup.add(chassisMesh);

    // Screen Glass Bezel (Obsidian display)
    const screenGeo = new THREE.PlaneGeometry(chassisWidth - 0.24, chassisHeight - 0.24);
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0c10,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const screenFront = new THREE.Mesh(screenGeo, screenMat);
    screenFront.position.z = chassisDepth / 2 + 0.005;
    deviceGroup.add(screenFront);

    // Back Screen
    const screenBack = new THREE.Mesh(screenGeo, screenMat);
    screenBack.position.z = -chassisDepth / 2 - 0.005;
    screenBack.rotation.y = Math.PI;
    deviceGroup.add(screenBack);

    // Luminous Inner Core / Micro-Architecture Graphic on Screen
    const coreGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: currentPalette.accent,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.z = chassisDepth / 2 + 0.15;
    coreMesh.scale.set(0.9, 0.9, 0.2);
    deviceGroup.add(coreMesh);

    // Floating Quantum Ring around Screen
    const ringGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: currentPalette.glow,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.position.z = chassisDepth / 2 + 0.2;
    deviceGroup.add(ringMesh);

    // 3. Apple Studio Lighting Setup (3-Point Pro Studio Rig)
    // Soft Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);

    // Cool Rim Light
    const rimLight = new THREE.DirectionalLight(currentPalette.accent, 3.0);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Warm Ambient Fill Light
    const fillLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(fillLight);

    // Subtle Glow Point Light
    const glowLight = new THREE.PointLight(currentPalette.glow, 1.5, 10);
    glowLight.position.set(0, 0, 2);
    scene.add(glowLight);

    // 4. Mouse Parallax & Smooth Drag
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.9;
      mouseY = y * 0.9;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        deviceGroup.rotation.y += deltaX * 0.007;
        deviceGroup.rotation.x += deltaY * 0.007;
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

    // Resize handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // 5. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Soft inertia tilt
      targetRotX += (mouseY - targetRotX) * 0.04;
      targetRotY += (mouseX - targetRotY) * 0.04;

      if (!isDragging) {
        deviceGroup.rotation.y = targetRotY * 0.5 + Math.sin(elapsed * 0.6) * 0.08;
        deviceGroup.rotation.x = -targetRotX * 0.5 + Math.cos(elapsed * 0.6) * 0.05;
      }

      // Screen Core rotation
      coreMesh.rotation.x = elapsed * 0.3;
      coreMesh.rotation.y = elapsed * 0.5;
      ringMesh.rotation.z = -elapsed * 0.4;

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

      chassisGeo.dispose();
      chassisMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [activeFinish]);

  return (
    <div className="relative w-full h-[400px] md:h-[540px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="3D Titanium Display - Drag to examine finish"
      />

      {/* Cupertino Finish Selector HUD */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/10 shadow-xl">
        <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider mr-1">
          Finish:
        </span>
        <button
          onClick={() => setActiveFinish("natural")}
          className={`px-2.5 py-0.5 rounded-full text-xs font-mono transition-all ${
            activeFinish === "natural"
              ? "bg-[#2c2c2e] text-white font-semibold shadow-sm border border-white/20"
              : "text-[#86868b] hover:text-white"
          }`}
        >
          Natural
        </button>
        <button
          onClick={() => setActiveFinish("spaceblack")}
          className={`px-2.5 py-0.5 rounded-full text-xs font-mono transition-all ${
            activeFinish === "spaceblack"
              ? "bg-[#2c2c2e] text-white font-semibold shadow-sm border border-white/20"
              : "text-[#86868b] hover:text-white"
          }`}
        >
          Space Black
        </button>
        <button
          onClick={() => setActiveFinish("silver")}
          className={`px-2.5 py-0.5 rounded-full text-xs font-mono transition-all ${
            activeFinish === "silver"
              ? "bg-[#2c2c2e] text-white font-semibold shadow-sm border border-white/20"
              : "text-[#86868b] hover:text-white"
          }`}
        >
          White Titanium
        </button>
      </div>
    </div>
  );
}
