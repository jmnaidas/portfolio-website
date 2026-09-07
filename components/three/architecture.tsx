'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Line } from '@react-three/drei';
import { useRef } from 'react';
import { Vector3, type Group, type Mesh } from 'three';
import type { Theme } from '@/lib/theme';
const palettes = {
  dark: { surface: '#292a26', top: '#514a40', edge: '#a99a82', module: '#686051', signal: '#fff4da', wire: '#b5a38b', light: '#e0d2bc' },
  light: { surface: '#e8e2d8', top: '#f8f6f1', edge: '#766957', module: '#b9aa98', signal: '#514335', wire: '#8c7c65', light: '#fff3e1' },
};
const layers = [
  { y: -1.3, x: -0.18, z: 0.1, width: 2.7, depth: 1.9, angle: -0.05 },
  { y: -0.65, x: 0.22, z: -0.13, width: 1.95, depth: 1.8, angle: 0.12 },
  { y: 0, x: -0.2, z: 0.2, width: 2.65, depth: 1.4, angle: -0.1 },
  { y: 0.7, x: 0.18, z: -0.17, width: 2.1, depth: 1.85, angle: 0.04 },
  { y: 1.35, x: -0.12, z: 0.03, width: 2.65, depth: 1.3, angle: -0.07 },
];
// Shared route vertices keep signal motion allocation-free and visibly tied to layer connections.
const routes = [
  [new Vector3(-1.1, -1.3, 0.75), new Vector3(-0.5, -0.65, 0.6), new Vector3(-1.1, 0, 0.65), new Vector3(-0.6, 0.7, 0.55), new Vector3(-1, 1.35, 0.45)],
  [new Vector3(0.9, -1.3, -0.6), new Vector3(0.85, -0.65, -0.7), new Vector3(0.7, 0, -0.4), new Vector3(0.9, 0.7, -0.85), new Vector3(0.9, 1.35, -0.5)],
];
function Sculpture({ theme }: { theme: Theme }) {
  const group = useRef<Group>(null);
  const signals = useRef<(Mesh | null)[]>([]);
  const elapsed = useRef(0);
  const palette = palettes[theme];
  useFrame((state, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, 0.05);
    elapsed.current += step;
    const blend = 1 - Math.exp(-step * 2);
    group.current.rotation.y += (0.38 + state.pointer.x * 0.13 - group.current.rotation.y) * blend;
    group.current.rotation.x += (state.pointer.y * 0.055 - group.current.rotation.x) * blend;
    group.current.position.y = Math.sin(elapsed.current * 0.35) * 0.04;
    signals.current.forEach((signal, i) => {
      if (!signal) return;
      const progress = (elapsed.current * 0.28 + i * 1.8) % 4;
      const segment = Math.floor(progress);
      signal.position.lerpVectors(routes[i][segment], routes[i][segment + 1], progress - segment);
    });
  });
  return <group ref={group} rotation={[0, 0.38, 0]}>{layers.map((layer, i) => <group key={i} position={[layer.x, layer.y, layer.z]} rotation={[0, layer.angle, 0]}><mesh castShadow receiveShadow><boxGeometry args={[layer.width, 0.055, layer.depth]} /><meshStandardMaterial color={i === 4 ? palette.top : palette.surface} metalness={theme === 'light' ? 0.15 : 0.5} roughness={0.55} /><Edges color={palette.edge} /></mesh>{i === 1 ? [-0.35, 0.35].map(x => <mesh key={x} position={[x, 0.14, 0]} castShadow><cylinderGeometry args={[0.2, 0.2, 0.22, 16]} /><meshStandardMaterial color={palette.module} roughness={0.6} /><Edges color={palette.edge} /></mesh>) : (i === 2 ? [-0.8, 0, 0.65] : [-0.55, 0.45]).map((x, j) => <mesh key={x} position={[x, i === 4 ? 0.045 : 0.12, j % 2 ? -0.2 : 0.18]} castShadow><boxGeometry args={[i === 4 ? 0.65 : 0.35, i === 4 ? 0.02 : 0.18, i === 0 ? 0.7 : 0.32]} /><meshStandardMaterial color={palette.module} metalness={0.3} roughness={0.6} /></mesh>)}</group>)}{routes.map((route, i) => <group key={i}><Line points={route} color={palette.wire} lineWidth={0.75} transparent opacity={0.65} /><mesh ref={node => { signals.current[i] = node; }} position={route[0]}><sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color={palette.signal} /></mesh></group>)}</group>;
}
export default function Architecture({ active, onFailure, theme }: { active: boolean; onFailure: () => void; theme: Theme }) {
  return <Canvas shadows="percentage" dpr={[1, 1.5]} frameloop={active ? 'always' : 'never'} camera={{ position: [5, 3.5, 6], fov: 37 }} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', onFailure, { once: true }); }}><ambientLight intensity={theme === 'light' ? 1.2 : 0.65} /><directionalLight castShadow shadow-mapSize={[512, 512]} shadow-bias={-0.001} position={[3, 5, 2]} intensity={theme === 'light' ? 2 : 3} color={palettes[theme].light} /><directionalLight position={[-3, 0, -3]} intensity={0.9} color={palettes[theme].light} /><Sculpture theme={theme} /></Canvas>;
}
