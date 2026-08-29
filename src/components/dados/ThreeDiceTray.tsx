"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  sides: number;
  result: number;
  dieCount?: number;
  onSettled?: () => void;
};

/**
 * Overlay curto: monta WebGL, cuspe os sólidos, destrói tudo.
 * O `result` já veio da regra — a animação não escolhe a face (fase de arte).
 */
export default function ThreeDiceTray({
  sides,
  result,
  dieCount = 1,
  onSettled,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const settled = useRef(false);
  const onSettledRef = useRef(onSettled);
  onSettledRef.current = onSettled;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    settled.current = false;

    const w = host.clientWidth || window.innerWidth;
    const h = host.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 40);
    camera.position.set(0, 0.4, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffe6c0, 0.55));
    const key = new THREE.DirectionalLight(0xffd070, 1.15);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x881818, 0.7);
    rim.position.set(-4, -1, 2);
    scene.add(rim);

    const geos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];
    const meshes: THREE.Mesh[] = [];

    const count = Math.max(1, Math.min(dieCount, 5));
    for (let i = 0; i < count; i++) {
      const geo =
        sides === 6
          ? new THREE.BoxGeometry(0.85, 0.85, 0.85)
          : new THREE.IcosahedronGeometry(0.72, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0x6e1216 : 0x8a6a20,
        metalness: 0.55,
        roughness: 0.35,
        emissive: 0x2a0808,
        emissiveIntensity: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((i - (count - 1) / 2) * 1.35, 0.2, 0);
      scene.add(mesh);
      geos.push(geo);
      mats.push(mat);
      meshes.push(mesh);
    }

    const t0 = performance.now();
    const duration = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const t = now - t0;
      const u = Math.min(1, t / duration);
      const ease = 1 - Math.pow(1 - u, 3);

      meshes.forEach((mesh, i) => {
        const spin = (1 - ease) * 18 + ease * 2;
        mesh.rotation.x = spin * 0.9 + i;
        mesh.rotation.y = spin * 1.2 + i * 0.4;
        mesh.position.y = 0.2 + Math.sin(ease * Math.PI) * 1.4;
        mesh.position.z = THREE.MathUtils.lerp(-4.5, 0, ease);
      });

      renderer.render(scene, camera);

      if (u < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!settled.current) {
        settled.current = true;
        onSettledRef.current?.();
      }
    };

    raf = requestAnimationFrame(tick);

    const onResize = () => {
      const nw = host.clientWidth || window.innerWidth;
      const nh = host.clientHeight || window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      meshes.forEach((m) => scene.remove(m));
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
      void result;
    };
  }, [sides, result, dieCount]);

  return <div ref={hostRef} className="absolute inset-0 pointer-events-none" />;
}
