"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface TechItem {
  name: string;
  category: string;
  color: string;
}

const TECH_NODES: TechItem[] = [
  { name: "TypeScript", category: "Language", color: "#3178c6" },
  { name: "JavaScript", category: "Language", color: "#f7df1e" },
  { name: "Next.js", category: "Framework", color: "#ffffff" },
  { name: "React", category: "Framework", color: "#61dafb" },
  { name: "NestJS", category: "Backend", color: "#ea2845" },
  { name: "Node.js", category: "Backend", color: "#68a063" },
  { name: "PostgreSQL", category: "Database", color: "#336791" },
  { name: "MongoDB", category: "Database", color: "#47a248" },
  { name: "Prisma", category: "ORM", color: "#5a67d8" },
  { name: "Docker", category: "DevOps", color: "#2496ed" },
  { name: "Kubernetes", category: "DevOps", color: "#326ce5" },
  { name: "Redis", category: "Database", color: "#dc382d" },
  { name: "Tailwind", category: "Frontend", color: "#38b2ac" },
  { name: "TypeORM", category: "ORM", color: "#e83e8c" },
  { name: "AWS EC2", category: "Cloud", color: "#ff9900" },
  { name: "Git & GitHub", category: "Tools", color: "#f05032" },
];

export default function TechSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(2.4, 20, 20);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(wireSphere);

    // Create Text Sprites for each tech node
    const createTextSprite = (text: string, colorHex: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(10, 16, 30, 0.75)";
        ctx.roundRect(4, 4, 248, 56, 12);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = colorHex;
        ctx.roundRect(4, 4, 248, 56, 12);
        ctx.stroke();

        ctx.font = "bold 24px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 128, 32);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1.4, 0.35, 1);
      return sprite;
    };

    // Distribute nodes evenly on sphere (Fibonacci sphere algorithm)
    const nodePositions: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    TECH_NODES.forEach((tech, i) => {
      const y = 1 - (i / (TECH_NODES.length - 1)) * 2; // from 1 to -1
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const sphereRadius = 2.6;
      const x = Math.cos(theta) * radius * sphereRadius;
      const z = Math.sin(theta) * radius * sphereRadius;
      const pos = new THREE.Vector3(x, y * sphereRadius, z);
      nodePositions.push(pos);

      // Node point mesh
      const dotGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: tech.color });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Billboard Text Sprite
      const sprite = createTextSprite(tech.name, tech.color);
      sprite.position.copy(pos.clone().multiplyScalar(1.08));
      globeGroup.add(sprite);
    });

    // Connecting Constellation Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const linePoints: number[] = [];

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 2.5) {
          linePoints.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z,
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z
          );
        }
      }
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePoints, 3)
    );
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    globeGroup.add(linesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        globeGroup.rotation.y += deltaX * 0.006;
        globeGroup.rotation.x += deltaY * 0.006;
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

    window.addEventListener("mousemove", onMouseMove);
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

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const delta = clock.getDelta();

      if (!isDragging) {
        globeGroup.rotation.y += delta * 0.2;
        globeGroup.rotation.x += delta * 0.05;
      }

      renderer.render(scene, camera);
    };
    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onMouseDown);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      sphereGeo.dispose();
      sphereMat.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[460px] flex items-center justify-center select-none overflow-hidden rounded-2xl glass-panel">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="3D Tech Constellation - Drag to explore stack"
      />
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-xs font-mono tracking-wider text-cyan-300 font-semibold uppercase">
          Interactive Tech Galaxy
        </span>
      </div>
      <div className="absolute bottom-3 right-4 text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-700/50">
        Drag to rotate sphere
      </div>
    </div>
  );
}
