"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroSceneProps {
  accentColor?: string; // e.g. '#00f0ff' or '#a855f7'
}

export default function HeroScene({ accentColor = "#00f0ff" }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<"cyan" | "purple" | "emerald">("cyan");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Theme color mappings
    const themeColors = {
      cyan: { primary: 0x00f0ff, secondary: 0x3b82f6, particles: 0x67e8f9 },
      purple: { primary: 0xc084fc, secondary: 0x7c3aed, particles: 0xe879f9 },
      emerald: { primary: 0x34d399, secondary: 0x059669, particles: 0x6ee7b7 },
    };

    const currentPalette = themeColors[activeTheme];

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Outer Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: currentPalette.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // 2. Vertex Points on Icosahedron
    const pointsMat = new THREE.PointsMaterial({
      color: currentPalette.primary,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const vertexPoints = new THREE.Points(outerGeo, pointsMat);
    mainGroup.add(vertexPoints);

    // 3. Inner Glowing Core (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: currentPalette.secondary,
      roughness: 0.2,
      metalness: 0.8,
      emissive: currentPalette.secondary,
      emissiveIntensity: 0.4,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Inner wireframe overlay
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const innerWire = new THREE.Mesh(innerGeo, innerWireMat);
    mainGroup.add(innerWire);

    // 4. Orbital Torus Rings
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.018, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: currentPalette.primary,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.6, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: currentPalette.secondary,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 5. Orbiting Tech Satellites / Nodes
    const satelliteCount = 8;
    const satellites: THREE.Mesh[] = [];
    const satelliteGroup = new THREE.Group();
    mainGroup.add(satelliteGroup);

    for (let i = 0; i < satelliteCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const satMat = new THREE.MeshStandardMaterial({
        color: currentPalette.primary,
        emissive: currentPalette.primary,
        emissiveIntensity: 0.8,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 3.2;
      sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      satelliteGroup.add(sat);
      satellites.push(sat);
    }
    satelliteGroup.rotation.x = Math.PI / 3;
    satelliteGroup.rotation.y = Math.PI / 6;

    // 6. Ambient Floating Particle Field
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: currentPalette.particles,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(currentPalette.primary, 2.5, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(currentPalette.secondary, 2, 20);
    pointLight2.position.set(-5, -5, -2);
    scene.add(pointLight2);

    // Mouse Parallax & Dragging
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.5;
      mouseY = y * 1.5;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        mainGroup.rotation.y += deltaX * 0.008;
        mainGroup.rotation.x += deltaY * 0.008;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousedown", handleMouseDown);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (!isDragging) {
        mainGroup.rotation.y += 0.003;
        mainGroup.rotation.x += 0.0015;
      }

      // Tilt according to mouse
      scene.rotation.y = targetX * 0.3;
      scene.rotation.x = -targetY * 0.3;

      // Inner core animation
      innerMesh.rotation.x = -elapsedTime * 0.4;
      innerMesh.rotation.y = elapsedTime * 0.6;
      innerWire.rotation.x = -elapsedTime * 0.4;
      innerWire.rotation.y = elapsedTime * 0.6;

      const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.06;
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale);
      innerWire.scale.set(pulseScale, pulseScale, pulseScale);

      // Rings differential rotation
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;
      satelliteGroup.rotation.z = elapsedTime * 0.3;

      // Particle subtle drift
      particleField.rotation.y = elapsedTime * 0.02;
      particleField.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", handleMouseDown);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      innerWireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      pointsMat.dispose();
      renderer.dispose();
    };
  }, [activeTheme]);

  return (
    <div className="relative w-full h-[400px] md:h-[520px] flex items-center justify-center select-none">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Core - Drag to rotate"
      />

      {/* Futuristic HUD Theme Switcher */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-slate-300 z-10 border border-white/10">
        <span className="text-[10px] tracking-wider uppercase text-slate-400 font-mono mr-1">
          3D Energy:
        </span>
        <button
          onClick={() => setActiveTheme("cyan")}
          className={`px-2.5 py-0.5 rounded-full transition-all font-mono text-[11px] ${
            activeTheme === "cyan"
              ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Cyan
        </button>
        <button
          onClick={() => setActiveTheme("purple")}
          className={`px-2.5 py-0.5 rounded-full transition-all font-mono text-[11px] ${
            activeTheme === "purple"
              ? "bg-purple-500/30 text-purple-300 border border-purple-400/50 shadow-[0_0_10px_rgba(192,132,252,0.4)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Violet
        </button>
        <button
          onClick={() => setActiveTheme("emerald")}
          className={`px-2.5 py-0.5 rounded-full transition-all font-mono text-[11px] ${
            activeTheme === "emerald"
              ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.4)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Matrix
        </button>
      </div>

      {/* Interactive Drag Hint */}
      <div className="absolute top-2 right-3 pointer-events-none hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/40 text-[11px] font-mono text-slate-400 border border-slate-700/40">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
        <span>3D Interactive Core</span>
      </div>
    </div>
  );
}
