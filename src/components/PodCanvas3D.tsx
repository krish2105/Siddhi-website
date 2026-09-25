import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCw, Sparkles, ZoomIn } from 'lucide-react';
import { playMechanicalClick, playSlideSound } from '../lib/sound';

export const PodCanvas3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'macro'>('3d');
  const explodedRef = useRef(false);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    explodedRef.current = exploded;
  }, [exploded]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (viewMode !== '3d') return;

    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    const width = container.clientWidth > 0 ? container.clientWidth : 460;
    const height = container.clientHeight > 0 ? container.clientHeight : 380;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.4);
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
    renderer.toneMappingExposure = 1.08;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambient = new THREE.AmbientLight(0xfffbf2, 0.75);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff5e6, 1.6);
    key.position.set(3, 4.5, 3.5);
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    key.shadow.bias = -0.001;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xd4e4fa, 0.6);
    fill.position.set(-3, 1, 2);
    scene.add(fill);

    const blueRim = new THREE.PointLight(0x0099ff, 1.4, 8);
    blueRim.position.set(0, -1, -2);
    scene.add(blueRim);

    const goldPoint = new THREE.PointLight(0xf5d472, 1.3, 8);
    goldPoint.position.set(0, 2.5, -1.5);
    scene.add(goldPoint);

    // Group for the 3D pod
    const podRoot = new THREE.Group();
    podRoot.position.set(0, 0.05, 0);
    scene.add(podRoot);

    // Studio Ground Pedestal (Light Alabaster Travertine)
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.5, 0.06, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.45,
      metalness: 0.05,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.2;
    pedestal.receiveShadow = true;
    podRoot.add(pedestal);

    const pedRimGeo = new THREE.TorusGeometry(1.45, 0.02, 16, 48);
    pedRimGeo.rotateX(Math.PI / 2);
    const pedRimMat = new THREE.MeshStandardMaterial({
      color: 0xc8a75a,
      roughness: 0.22,
      metalness: 0.92,
    });
    const pedRim = new THREE.Mesh(pedRimGeo, pedRimMat);
    pedRim.position.y = -1.18;
    podRoot.add(pedRim);

    // 1. Top Layer: Precision Champagne Gold Quick-Release Clip
    const clipMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.92,
    });
    const clipGroup = new THREE.Group();

    // Collar ring with beveled edge
    const clipBaseGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.14, 32);
    const clipBase = new THREE.Mesh(clipBaseGeo, clipMat);
    clipBase.castShadow = true;
    clipGroup.add(clipBase);

    // Central connector latch boss
    const latchGeo = new THREE.BoxGeometry(0.22, 0.16, 0.32);
    const latch = new THREE.Mesh(latchGeo, clipMat);
    latch.position.set(0, 0.11, 0);
    latch.castShadow = true;
    clipGroup.add(latch);

    // Mechanical side wings
    const wingGeo = new THREE.BoxGeometry(0.52, 0.06, 0.18);
    const wing = new THREE.Mesh(wingGeo, clipMat);
    wing.position.set(0, 0.04, 0);
    clipGroup.add(wing);

    podRoot.add(clipGroup);

    // 2. Middle Layer: Ocean Blue Translucent Enzymatic Foaming Core
    const blueMat = new THREE.MeshPhysicalMaterial({
      color: 0x0078d7,
      roughness: 0.32,
      metalness: 0.08,
      transmission: 0.28,
      thickness: 0.6,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
    });

    const blueGroup = new THREE.Group();
    // Rounded chamfered hexagonal tablet
    const blueCoreGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.34, 24);
    const blueCore = new THREE.Mesh(blueCoreGeo, blueMat);
    blueCore.position.y = -0.32;
    blueCore.castShadow = true;
    blueGroup.add(blueCore);

    // Concentric embossed ring detail
    const ringGeo = new THREE.TorusGeometry(0.48, 0.02, 16, 32);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x33aaff,
      roughness: 0.2,
      metalness: 0.1,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = -0.15;
    blueGroup.add(ring);

    podRoot.add(blueGroup);

    // 3. Bottom Layer: Activated Charcoal Micro-Honeycomb Scrubber
    const scrubMat = new THREE.MeshStandardMaterial({
      color: 0x1e2026,
      roughness: 0.94,
      metalness: 0.04,
    });
    const scrubGroup = new THREE.Group();

    const scrubGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.24, 24);
    const scrubber = new THREE.Mesh(scrubGeo, scrubMat);
    scrubber.position.y = -0.66;
    scrubber.castShadow = true;
    scrubGroup.add(scrubber);

    // Hexagonal scrubbing perimeter contour
    const hexRimGeo = new THREE.TorusGeometry(0.71, 0.025, 16, 24);
    hexRimGeo.rotateX(Math.PI / 2);
    const hexRimMat = new THREE.MeshStandardMaterial({
      color: 0x33363f,
      roughness: 0.85,
    });
    const hexRim = new THREE.Mesh(hexRimGeo, hexRimMat);
    hexRim.position.y = -0.55;
    scrubGroup.add(hexRim);

    podRoot.add(scrubGroup);

    // 4. Effervescent Floating Micro-Bubbles (With realistic fizzy drift)
    const bubbleGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: 0xa8e0ff,
      roughness: 0.1,
      metalness: 0.05,
      transmission: 0.85,
      ior: 1.33,
    });
    const bubbles: { mesh: THREE.Mesh; seed: number; speed: number }[] = [];
    for (let i = 0; i < 22; i++) {
      const b = new THREE.Mesh(bubbleGeo, bubbleMat);
      const angle = (i / 22) * Math.PI * 2;
      const radius = 0.82 + Math.random() * 0.45;
      const startY = -0.8 + Math.random() * 1.2;
      b.position.set(Math.cos(angle) * radius, startY, Math.sin(angle) * radius);
      const scale = 0.6 + Math.random() * 0.7;
      b.scale.set(scale, scale, scale);
      podRoot.add(b);
      bubbles.push({
        mesh: b,
        seed: Math.random() * 10,
        speed: 0.4 + Math.random() * 0.6,
      });
    }

    // Interaction Controls
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };
    let rotY = 0.45;
    let rotX = 0.15;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotateRef.current = false;
      setAutoRotate(false);
      previousMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - previousMouse.x;
      const dy = e.clientY - previousMouse.y;
      rotY += dx * 0.01;
      rotX += dy * 0.007;
      rotX = Math.max(-0.4, Math.min(0.6, rotX));
      previousMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Responsive ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect;
        if (nw > 0 && nh > 0) {
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        }
      }
    });
    resizeObserver.observe(container);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      if (autoRotateRef.current && !isDragging) {
        rotY += 0.004;
      }

      podRoot.rotation.y += (rotY - podRoot.rotation.y) * 0.08;
      podRoot.rotation.x += (rotX - podRoot.rotation.x) * 0.08;
      podRoot.position.y = Math.sin(elapsed * 1.8) * 0.04;

      // Animate Exploded Separation
      if (explodedRef.current) {
        clipGroup.position.y += (0.75 - clipGroup.position.y) * 0.1;
        blueGroup.position.y += (0.05 - blueGroup.position.y) * 0.1;
        scrubGroup.position.y += (-0.65 - scrubGroup.position.y) * 0.1;
      } else {
        clipGroup.position.y += (0.0 - clipGroup.position.y) * 0.1;
        blueGroup.position.y += (0.0 - blueGroup.position.y) * 0.1;
        scrubGroup.position.y += (0.0 - scrubGroup.position.y) * 0.1;
      }

      // Animate Fizzy Bubbles Floating Upward
      bubbles.forEach((b) => {
        b.mesh.position.y += b.speed * 0.005;
        b.mesh.position.x += Math.sin(elapsed * 2 + b.seed) * 0.002;
        if (b.mesh.position.y > 1.2) {
          b.mesh.position.y = -0.9;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [viewMode]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '390px',
        minHeight: '390px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F7F6FA 55%, #EBE8F2 100%)',
        border: '1px solid rgba(200, 167, 90, 0.35)',
        boxShadow: '0 12px 36px -8px rgba(28, 28, 38, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      {viewMode === '3d' ? (
        <div
          ref={mountRef}
          style={{ width: '100%', height: '100%', minHeight: '390px', cursor: 'grab', touchAction: 'pan-y' }}
          title="Click and drag to rotate in 3D"
        />
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '390px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/assets/aurelle_foam_macro.jpg"
            alt="Ultra-realistic water activated foaming macro"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(255, 255, 255, 0.92)',
              color: 'var(--color-graphite)',
              backdropFilter: 'blur(12px)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid var(--color-champagne)',
              boxShadow: '0 4px 16px rgba(28, 28, 38, 0.1)',
            }}
          >
            <Sparkles size={12} color="#C8A75A" />
            <span>8K High-Speed Liquid Macro • Water-Activated Micro-Bubbles</span>
          </div>
        </div>
      )}

      {/* Top Left Badge */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          padding: '5px 14px',
          borderRadius: '9999px',
          border: '1px solid rgba(200, 167, 90, 0.45)',
          fontSize: '11px',
          fontWeight: 800,
          color: 'var(--color-champagne)',
          letterSpacing: '0.06em',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 14px rgba(28, 28, 38, 0.06)',
          zIndex: 10,
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8A75A' }} />
        <span>{viewMode === '3d' ? 'REAL-TIME 3D CAPSULE' : '8K MACRO ACTIVATION'}</span>
      </div>

      {/* Top Right: Toggle 3D vs 8K Macro Mode */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          display: 'flex',
          gap: '4px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          padding: '4px',
          borderRadius: '9999px',
          border: '1px solid rgba(28, 28, 38, 0.08)',
          boxShadow: '0 4px 14px rgba(28, 28, 38, 0.06)',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {
            playSlideSound();
            setViewMode('3d');
          }}
          style={{
            padding: '5px 12px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            background: viewMode === '3d' ? 'var(--color-graphite)' : 'transparent',
            color: viewMode === '3d' ? '#FFFFFF' : 'var(--color-lilac-deep)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease',
          }}
        >
          <Layers size={12} color={viewMode === '3d' ? '#C8A75A' : 'currentColor'} /> 3D Orbit
        </button>
        <button
          onClick={() => {
            playSlideSound();
            setViewMode('macro');
          }}
          style={{
            padding: '5px 12px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            background: viewMode === 'macro' ? 'var(--color-graphite)' : 'transparent',
            color: viewMode === 'macro' ? '#FFFFFF' : 'var(--color-lilac-deep)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease',
          }}
        >
          <ZoomIn size={12} color={viewMode === 'macro' ? '#C8A75A' : 'currentColor'} /> 8K Macro
        </button>
      </div>

      {/* Floating Bottom Controls (Only in 3D Mode) */}
      {viewMode === '3d' && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(16px)',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: '1px solid var(--color-champagne)',
            boxShadow: '0 8px 24px rgba(28, 28, 38, 0.12)',
            zIndex: 10,
          }}
        >
          <button
            onClick={() => {
              playMechanicalClick();
              setExploded(!exploded);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              background: exploded ? 'var(--color-champagne)' : 'var(--color-graphite)',
              color: exploded ? '#1C1C26' : '#FFFFFF',
              transition: 'all 0.2s ease',
            }}
          >
            <Layers size={13} />
            <span>{exploded ? 'Collapse Layers' : 'Explode 3D Layers'}</span>
          </button>

          <button
            onClick={() => {
              playMechanicalClick();
              setAutoRotate(!autoRotate);
            }}
            title={autoRotate ? 'Pause Rotation' : 'Start 360° Orbit'}
            style={{
              padding: '7px',
              borderRadius: '50%',
              border: '1px solid var(--border-subtle)',
              background: autoRotate ? 'var(--color-champagne)' : '#FFFFFF',
              color: autoRotate ? '#1C1C26' : 'var(--color-graphite)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <RotateCw size={13} />
          </button>
        </div>
      )}
    </div>
  );
};
