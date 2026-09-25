import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Layers, Move3d, ArrowDownCircle, Sun, Moon } from 'lucide-react';

interface WandCanvas3DProps {
  onInteract?: () => void;
}

type WallFinish = 'travertine' | 'fluted' | 'slate' | 'terrazzo';

export const WandCanvas3D: React.FC<WandCanvas3DProps> = ({ onInteract }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'docked' | 'exploded' | 'action'>('docked');
  const [autoRotate, setAutoRotate] = useState(true);
  const [ambientMode, setAmbientMode] = useState<'day' | 'night'>('day');
  const [wallFinish, setWallFinish] = useState<WallFinish>('travertine');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Mutable refs for Three.js animation loop without re-triggering scene re-creation
  const autoRotateRef = useRef(true);
  const viewModeRef = useRef<'docked' | 'exploded' | 'action'>('docked');
  const ambientModeRef = useRef<'day' | 'night'>('day');
  const wallFinishRef = useRef<WallFinish>('travertine');

  const wandGroupRef = useRef<THREE.Group | null>(null);
  const podRef = useRef<THREE.Group | null>(null);
  const foamMeshRef = useRef<THREE.Mesh | null>(null);
  const scrubMeshRef = useRef<THREE.Mesh | null>(null);
  const sliderBtnRef = useRef<THREE.Mesh | null>(null);
  const wallPlateRef = useRef<THREE.Mesh | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ledGlowRef = useRef<THREE.PointLight | null>(null);

  // Sync state to refs
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    wallFinishRef.current = wallFinish;
    if (wallPlateRef.current) {
      const mat = wallPlateRef.current.material as THREE.MeshStandardMaterial;
      if (wallFinish === 'travertine') {
        mat.color.setHex(0xd6cfc0);
        mat.roughness = 0.85;
      } else if (wallFinish === 'fluted') {
        mat.color.setHex(0xe4e2ec);
        mat.roughness = 0.45;
      } else if (wallFinish === 'slate') {
        mat.color.setHex(0x282a32);
        mat.roughness = 0.7;
      } else if (wallFinish === 'terrazzo') {
        mat.color.setHex(0xeae5dc);
        mat.roughness = 0.6;
      }
    }
  }, [wallFinish]);

  useEffect(() => {
    ambientModeRef.current = ambientMode;
    if (keyLightRef.current && ledGlowRef.current) {
      if (ambientMode === 'night') {
        keyLightRef.current.color.setHex(0xffb366);
        keyLightRef.current.intensity = 1.1;
        ledGlowRef.current.intensity = 2.4;
      } else {
        keyLightRef.current.color.setHex(0xfff5e6);
        keyLightRef.current.intensity = 1.45;
        ledGlowRef.current.intensity = 0.7;
      }
    }
  }, [ambientMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth > 0 ? container.clientWidth : 480;
    const height = container.clientHeight > 0 ? container.clientHeight : 390;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0.1, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // 2. Calibrated Luxury Studio Lighting (No overexposure!)
    const ambientLight = new THREE.AmbientLight(0xfffbf2, 0.72);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.45);
    keyLight.position.set(2.8, 4.5, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0xd4e2fa, 0.55);
    fillLight.position.set(-3.5, 1.5, 2.0);
    scene.add(fillLight);

    const goldRimLight = new THREE.PointLight(0xf5d472, 1.25, 10);
    goldRimLight.position.set(0, 2.5, -2.2);
    scene.add(goldRimLight);

    // Warm Architectural Under-Glow
    const ledGlow = new THREE.PointLight(0xff9922, 0.75, 5);
    ledGlow.position.set(0, -1.3, 0.25);
    scene.add(ledGlow);
    ledGlowRef.current = ledGlow;

    // 3. High-Contrast Physically Based Materials (PBR)
    // Tactile matte alabaster casing
    const mistBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xcfcce0,
      roughness: 0.38,
      metalness: 0.08,
      clearcoat: 0.2,
      clearcoatRoughness: 0.25,
    });

    // Wand handle with subtle brushed sheen
    const wandHandleMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9d6e8,
      roughness: 0.28,
      metalness: 0.16,
      clearcoat: 0.25,
    });

    // Brushed Champagne Gold PVD
    const champagneGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.22,
      metalness: 0.88,
    });

    const sliderGoldMat = new THREE.MeshStandardMaterial({
      color: 0xe5be58,
      roughness: 0.18,
      metalness: 0.92,
    });

    // Obsidian Gunmetal Track
    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x22232a,
      roughness: 0.35,
      metalness: 0.65,
    });

    // Bio-cellulose foaming pod
    const oceanBlueFoamMat = new THREE.MeshStandardMaterial({
      color: 0x0074d9,
      roughness: 0.65,
      metalness: 0.05,
    });

    const charcoalScrubMat = new THREE.MeshStandardMaterial({
      color: 0x1f2127,
      roughness: 0.92,
      metalness: 0.02,
    });

    // 4. Constructing 3D Hardware Model
    const mainAnchor = new THREE.Group();
    mainAnchor.scale.set(0.78, 0.78, 0.78);
    mainAnchor.position.set(0, -0.05, 0);
    scene.add(mainAnchor);

    // Floating Circular Studio Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.65, 1.75, 0.08, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xdcd8ea,
      roughness: 0.7,
      metalness: 0.05,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.55;
    pedestal.receiveShadow = true;
    mainAnchor.add(pedestal);

    const pedRimGeo = new THREE.TorusGeometry(1.7, 0.025, 16, 48);
    pedRimGeo.rotateX(Math.PI / 2);
    const pedRim = new THREE.Mesh(pedRimGeo, champagneGoldMat);
    pedRim.position.y = -1.53;
    mainAnchor.add(pedRim);

    // --- CADDY CONTAINER (WALL-DOCK) ---
    // Matches the exact physical product: rectangular dock with Champagne Gold perimeter bezel
    const caddyGroup = new THREE.Group();
    caddyGroup.position.set(0, -0.65, 0);

    // Main Rectangular Caddy Body
    const caddyBodyGeo = new THREE.BoxGeometry(1.18, 1.62, 0.72, 2, 4, 2);
    const caddyMesh = new THREE.Mesh(caddyBodyGeo, mistBodyMat);
    caddyMesh.castShadow = true;
    caddyMesh.receiveShadow = true;
    caddyGroup.add(caddyMesh);

    // Recessed Front Alabaster Faceplate
    const faceplateGeo = new THREE.BoxGeometry(1.0, 1.44, 0.04);
    const faceplateMesh = new THREE.Mesh(faceplateGeo, mistBodyMat);
    faceplateMesh.position.set(0, 0, 0.36);
    faceplateMesh.receiveShadow = true;
    caddyGroup.add(faceplateMesh);

    // Signature Front Champagne Gold Perimeter Frame (Photo 3 bezel)
    const goldFrameGroup = new THREE.Group();
    const frameThickness = 0.042;
    const frameDepth = 0.045;

    // Top & Bottom Gold Bars
    const hBarGeo = new THREE.BoxGeometry(1.06, frameThickness, frameDepth);
    const topBar = new THREE.Mesh(hBarGeo, champagneGoldMat);
    topBar.position.set(0, 0.72, 0.38);
    topBar.castShadow = true;
    goldFrameGroup.add(topBar);

    const bottomBar = new THREE.Mesh(hBarGeo, champagneGoldMat);
    bottomBar.position.set(0, -0.72, 0.38);
    bottomBar.castShadow = true;
    goldFrameGroup.add(bottomBar);

    // Left & Right Gold Bars
    const vBarGeo = new THREE.BoxGeometry(frameThickness, 1.48, frameDepth);
    const leftBar = new THREE.Mesh(vBarGeo, champagneGoldMat);
    leftBar.position.set(-0.51, 0, 0.38);
    leftBar.castShadow = true;
    goldFrameGroup.add(leftBar);

    const rightBar = new THREE.Mesh(vBarGeo, champagneGoldMat);
    rightBar.position.set(0.51, 0, 0.38);
    rightBar.castShadow = true;
    goldFrameGroup.add(rightBar);

    // 4 Corner Gold Joints
    const cornerGeo = new THREE.SphereGeometry(0.024, 16, 16);
    const corners = [
      [-0.51, 0.72, 0.38],
      [0.51, 0.72, 0.38],
      [-0.51, -0.72, 0.38],
      [0.51, -0.72, 0.38],
    ];
    corners.forEach(([cx, cy, cz]) => {
      const cornerMesh = new THREE.Mesh(cornerGeo, champagneGoldMat);
      cornerMesh.position.set(cx, cy, cz);
      goldFrameGroup.add(cornerMesh);
    });
    caddyGroup.add(goldFrameGroup);

    // Top Docking Slot Opening for the Wand
    const slotGeo = new THREE.BoxGeometry(0.38, 0.08, 0.22);
    const slotMesh = new THREE.Mesh(slotGeo, gunmetalMat);
    slotMesh.position.set(0, 0.81, 0);
    caddyGroup.add(slotMesh);

    // Wall Tile Backing Plate (Swappable finish)
    const wallPlateGeo = new THREE.BoxGeometry(1.4, 1.7, 0.08);
    const wallPlateMat = new THREE.MeshStandardMaterial({
      color: 0xd6cfc0,
      roughness: 0.85,
    });
    const wallPlate = new THREE.Mesh(wallPlateGeo, wallPlateMat);
    wallPlate.position.set(0, 0, -0.46);
    wallPlate.receiveShadow = true;
    wallPlateRef.current = wallPlate;
    caddyGroup.add(wallPlate);

    mainAnchor.add(caddyGroup);

    // --- THE TELESCOPING WAND HANDLE ---
    // Matches Photo 3: Flat-rectangular rod with top eyelet and mid-shaft gold thumb slider
    const wandGroup = new THREE.Group();
    wandGroupRef.current = wandGroup;
    wandGroup.position.set(0, 0.12, 0);

    // Flat-Rectangular Handle Body (Photo 3 shape)
    const handleGeo = new THREE.BoxGeometry(0.24, 2.22, 0.12, 2, 8, 2);
    const handleMesh = new THREE.Mesh(handleGeo, wandHandleMat);
    handleMesh.castShadow = true;
    handleMesh.position.y = 1.05;
    wandGroup.add(handleMesh);

    // Top Hanging / Suspension Ring (Circular Eyelet in the tip - Photo 3)
    const loopGeo = new THREE.TorusGeometry(0.065, 0.032, 16, 24);
    const loopMesh = new THREE.Mesh(loopGeo, wandHandleMat);
    loopMesh.position.set(0, 2.16, 0);
    loopMesh.castShadow = true;
    wandGroup.add(loopMesh);

    // Inner Gold Eyelet Inlay Rim
    const loopInnerGeo = new THREE.TorusGeometry(0.065, 0.015, 16, 24);
    const loopInnerMesh = new THREE.Mesh(loopInnerGeo, champagneGoldMat);
    loopInnerMesh.position.set(0, 2.16, 0);
    wandGroup.add(loopInnerMesh);

    // Recessed Gold Slide-Latch Well
    const trackGeo = new THREE.BoxGeometry(0.15, 0.44, 0.03);
    const trackMesh = new THREE.Mesh(trackGeo, gunmetalMat);
    trackMesh.position.set(0, 1.05, 0.065);
    wandGroup.add(trackMesh);

    // Champagne Gold Mechanical Thumb-Slider (Photo 3)
    const sliderGroup = new THREE.Group();
    sliderGroup.position.set(0, 1.06, 0.08);

    const sliderGeo = new THREE.BoxGeometry(0.12, 0.18, 0.06);
    const sliderMesh = new THREE.Mesh(sliderGeo, sliderGoldMat);
    sliderMesh.castShadow = true;
    sliderGroup.add(sliderMesh);

    // 3 Tactile Horizontal Grip Ridges on the Gold Button
    for (let r = -0.04; r <= 0.04; r += 0.04) {
      const ridgeGeo = new THREE.BoxGeometry(0.08, 0.015, 0.02);
      const ridgeMesh = new THREE.Mesh(ridgeGeo, champagneGoldMat);
      ridgeMesh.position.set(0, r, 0.035);
      sliderGroup.add(ridgeMesh);
    }

    sliderBtnRef.current = sliderGroup as unknown as THREE.Mesh;
    wandGroup.add(sliderGroup);

    // Metallic Collar Ring
    const collarGeo = new THREE.BoxGeometry(0.24, 0.08, 0.14);
    const collarMesh = new THREE.Mesh(collarGeo, champagneGoldMat);
    collarMesh.position.y = -0.05;
    collarMesh.castShadow = true;
    wandGroup.add(collarMesh);

    // Lower Wand Neck
    const neckGeo = new THREE.BoxGeometry(0.18, 0.85, 0.1);
    const neckMesh = new THREE.Mesh(neckGeo, mistBodyMat);
    neckMesh.position.y = -0.5;
    neckMesh.castShadow = true;
    wandGroup.add(neckMesh);

    // Wand Jaw / Pod Dock Clamping Head
    const headGeo = new THREE.BoxGeometry(0.26, 0.22, 0.18);
    const headMesh = new THREE.Mesh(headGeo, mistBodyMat);
    headMesh.position.y = -0.98;
    headMesh.castShadow = true;
    wandGroup.add(headMesh);

    // --- REFILL CLEANING POD ---
    const podGroup = new THREE.Group();
    podRef.current = podGroup;
    podGroup.position.set(0, -1.2, 0);

    const clipGeo = new THREE.BoxGeometry(0.18, 0.08, 0.14);
    const clipMesh = new THREE.Mesh(clipGeo, champagneGoldMat);
    podGroup.add(clipMesh);

    const foamGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.15, 6);
    foamGeo.rotateY(Math.PI / 6);
    const foamMesh = new THREE.Mesh(foamGeo, oceanBlueFoamMat);
    foamMesh.position.y = -0.12;
    foamMesh.castShadow = true;
    foamMeshRef.current = foamMesh;
    podGroup.add(foamMesh);

    const scrubGeo = new THREE.CylinderGeometry(0.29, 0.29, 0.08, 6);
    scrubGeo.rotateY(Math.PI / 6);
    const scrubMesh = new THREE.Mesh(scrubGeo, charcoalScrubMat);
    scrubMesh.position.y = -0.23;
    scrubMesh.castShadow = true;
    scrubMeshRef.current = scrubMesh;
    podGroup.add(scrubMesh);

    wandGroup.add(podGroup);
    mainAnchor.add(wandGroup);

    // 5. Interactive Drag & Touch Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    // Start at a dynamic 25-degree isometric beauty angle
    let targetRotationY = 0.42;
    let targetRotationX = 0.08;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotateRef.current = false;
      setAutoRotate(false);
      previousMousePosition = { x: e.clientX, y: e.clientY };
      onInteract?.();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.006;
      targetRotationX = Math.max(-0.35, Math.min(0.45, targetRotationX));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        autoRotateRef.current = false;
        setAutoRotate(false);
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        onInteract?.();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.012;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.35, Math.min(0.45, targetRotationX));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // ResizeObserver for reliable, collapse-proof sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (autoRotateRef.current && !isDragging) {
        targetRotationY += 0.0035;
      }

      mainAnchor.rotation.y += (targetRotationY - mainAnchor.rotation.y) * 0.08;
      mainAnchor.rotation.x += (targetRotationX - mainAnchor.rotation.x) * 0.08;
      mainAnchor.position.y = Math.sin(elapsedTime * 1.8) * 0.035;

      const currentMode = viewModeRef.current;
      if (wandGroupRef.current && podRef.current && sliderBtnRef.current && foamMeshRef.current && scrubMeshRef.current) {
        if (currentMode === 'docked') {
          wandGroupRef.current.position.y += (0.12 - wandGroupRef.current.position.y) * 0.1;
          wandGroupRef.current.position.z += (0.0 - wandGroupRef.current.position.z) * 0.1;
          sliderBtnRef.current.position.y += (1.06 - sliderBtnRef.current.position.y) * 0.1;
          podRef.current.position.y += (-1.2 - podRef.current.position.y) * 0.1;
          foamMeshRef.current.position.y += (-0.12 - foamMeshRef.current.position.y) * 0.1;
          scrubMeshRef.current.position.y += (-0.23 - scrubMeshRef.current.position.y) * 0.1;
        } else if (currentMode === 'exploded') {
          wandGroupRef.current.position.y += (0.85 - wandGroupRef.current.position.y) * 0.1;
          wandGroupRef.current.position.z += (0.35 - wandGroupRef.current.position.z) * 0.1;
          sliderBtnRef.current.position.y += (1.16 - sliderBtnRef.current.position.y) * 0.1;
          podRef.current.position.y += (-1.45 - podRef.current.position.y) * 0.1;
          foamMeshRef.current.position.y += (-0.3 - foamMeshRef.current.position.y) * 0.1;
          scrubMeshRef.current.position.y += (-0.55 - scrubMeshRef.current.position.y) * 0.1;
        } else if (currentMode === 'action') {
          wandGroupRef.current.position.y += (0.65 - wandGroupRef.current.position.y) * 0.1;
          wandGroupRef.current.position.z += (0.25 - wandGroupRef.current.position.z) * 0.1;
          sliderBtnRef.current.position.y += (0.92 - sliderBtnRef.current.position.y) * 0.15;
          podRef.current.position.y += (-2.6 - podRef.current.position.y) * 0.08;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onInteract]); // Only runs once on mount!

  const handleModeChange = (mode: 'docked' | 'exploded' | 'action') => {
    setViewMode(mode);
    if (mode === 'action') {
      setTimeout(() => {
        setViewMode('docked');
      }, 2200);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '390px',
        minHeight: '390px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background:
          ambientMode === 'day'
            ? 'radial-gradient(circle at 50% 35%, #F0EEF7 0%, #E3E0F0 50%, #D0CDE0 100%)'
            : 'radial-gradient(circle at 50% 35%, #252433 0%, #171622 60%, #0F0E17 100%)',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        boxShadow: ambientMode === 'day' ? 'inset 0 2px 12px rgba(0,0,0,0.03)' : 'inset 0 2px 16px rgba(0,0,0,0.3)',
        transition: 'background 0.5s ease',
      }}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '390px',
          minHeight: '390px',
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
        title="Click and drag to rotate in 3D"
      />

      {/* Top Floating Controls: Day/Night Ambient Toggle */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {
            setAmbientMode(ambientMode === 'day' ? 'night' : 'day');
          }}
          title={ambientMode === 'day' ? 'Switch to Evening Warm Glow' : 'Switch to Daylight Travertine'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 12px',
            borderRadius: '9999px',
            background: ambientMode === 'day' ? 'rgba(255, 255, 255, 0.94)' : 'rgba(40, 40, 52, 0.94)',
            color: ambientMode === 'day' ? '#1C1C26' : '#FFD27D',
            border: '1px solid var(--color-champagne)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {ambientMode === 'day' ? <Sun size={12} color="#D97706" /> : <Moon size={12} color="#FFD27D" />}
          <span>{ambientMode === 'day' ? 'Daylight' : 'Evening Ambience'}</span>
        </button>
      </div>

      {/* Top Left: Wall Tile Surface Finishes Selector */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: ambientMode === 'day' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(28, 28, 38, 0.92)',
          backdropFilter: 'blur(10px)',
          padding: '4px 8px',
          borderRadius: '9999px',
          border: '1px solid var(--border-subtle)',
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-lilac-deep)', marginRight: '2px' }}>
          Wall:
        </span>
        {(['travertine', 'fluted', 'slate', 'terrazzo'] as WallFinish[]).map((finish) => (
          <button
            key={finish}
            onClick={() => {
              setWallFinish(finish);
            }}
            style={{
              padding: '3px 8px',
              borderRadius: '9999px',
              fontSize: '10px',
              fontWeight: wallFinish === finish ? 800 : 600,
              background: wallFinish === finish ? 'var(--color-graphite)' : 'transparent',
              color: wallFinish === finish ? '#FFFFFF' : 'var(--color-lilac-deep)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition)',
              textTransform: 'capitalize',
            }}
          >
            {finish}
          </button>
        ))}
      </div>

      {/* Floating 3D Interactive Hotspot Tooltips */}
      <div
        style={{
          position: 'absolute',
          top: '52px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 9,
          pointerEvents: 'none',
        }}
      >
        <div
          onClick={() => setActiveHotspot(activeHotspot === 'slider' ? null : 'slider')}
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: ambientMode === 'day' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(32, 32, 44, 0.92)',
            padding: '4px 10px',
            borderRadius: '9999px',
            border: '1px solid var(--color-champagne)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8A75A' }} />
          <span>Champagne Gold Latch</span>
        </div>
      </div>

      {/* Floating Bottom 3D Interaction Control Pill */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: ambientMode === 'day' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(28, 28, 38, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '6px 12px',
          borderRadius: '9999px',
          border: '1px solid var(--color-champagne)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          zIndex: 10,
          maxWidth: '94%',
        }}
      >
        <button
          onClick={() => handleModeChange('docked')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            background: viewMode === 'docked' ? 'var(--color-graphite)' : 'transparent',
            color: viewMode === 'docked' ? '#FFFFFF' : 'var(--color-graphite)',
            transition: 'all 0.2s ease',
          }}
        >
          <Move3d size={13} />
          <span>Docked</span>
        </button>

        <button
          onClick={() => handleModeChange('exploded')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            background: viewMode === 'exploded' ? 'var(--color-graphite)' : 'transparent',
            color: viewMode === 'exploded' ? '#FFFFFF' : 'var(--color-graphite)',
            transition: 'all 0.2s ease',
          }}
        >
          <Layers size={13} />
          <span>Exploded</span>
        </button>

        <button
          onClick={() => handleModeChange('action')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            background: viewMode === 'action' ? 'var(--color-champagne)' : 'transparent',
            color: viewMode === 'action' ? '#FFFFFF' : 'var(--color-graphite)',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowDownCircle size={13} />
          <span>Click-Eject</span>
        </button>

        <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle)' }} />

        <button
          onClick={() => {
            setAutoRotate(!autoRotate);
          }}
          title={autoRotate ? 'Pause 360° rotation' : 'Start 360° rotation'}
          style={{
            padding: '6px',
            borderRadius: '50%',
            border: 'none',
            background: autoRotate ? 'var(--color-mist)' : 'transparent',
            color: 'var(--color-graphite)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RotateCw size={13} />
        </button>
      </div>
    </div>
  );
};
