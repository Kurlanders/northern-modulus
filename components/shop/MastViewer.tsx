'use client'

import { Component, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useTheme } from 'next-themes'

// Parametric model built from the real tube sizes, in metres. No external model file.
const TUBE_60 = { radius: 0.03, bottom: 0, top: 1.68 }
const TUBE_38 = { radius: 0.019, bottom: 1.6, top: 3.14 }
const COLLAR_Y = 1.68
const GUY_ANCHOR: [number, number, number] = [-1.4, 0, 0.4]
const GUY_TOP: [number, number, number] = [0, 3.14, 0]
// Same accent as the green-text token. WebGL materials can't read CSS variables.
const NODE_COLOR = '#1EBB6E'

class ViewerErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.error('Mast viewer failed to render:', error)
    this.props.onError()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function Tube({ radius, bottom, top, color }: { radius: number; bottom: number; top: number; color: string }) {
  return (
    <mesh position={[0, (bottom + top) / 2, 0]}>
      <cylinderGeometry args={[radius, radius, top - bottom, 48]} />
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.05} />
    </mesh>
  )
}

function Node({ radius, y, height }: { radius: number; y: number; height: number }) {
  return (
    <mesh position={[0, y, 0]}>
      <cylinderGeometry args={[radius, radius, height, 48]} />
      <meshStandardMaterial color={NODE_COLOR} roughness={0.7} />
    </mesh>
  )
}

function DRing({ angle }: { angle: number }) {
  return (
    <mesh position={[Math.cos(angle) * 0.06, 3.14, Math.sin(angle) * 0.06]} rotation={[0, -angle, 0]}>
      <torusGeometry args={[0.022, 0.004, 12, 32]} />
      <meshStandardMaterial color={NODE_COLOR} roughness={0.6} />
    </mesh>
  )
}

function GuyLine({ color }: { color: string }) {
  const [ax, ay, az] = GUY_ANCHOR
  const [tx, ty, tz] = GUY_TOP
  const dx = tx - ax
  const dy = ty - ay
  const dz = tz - az
  const length = Math.hypot(dx, dy, dz)
  // Tilt a vertical cylinder onto the line: rotate about z towards x, then about y for the small z offset.
  return (
    <mesh
      position={[(ax + tx) / 2, (ay + ty) / 2, (az + tz) / 2]}
      rotation={[0, Math.atan2(-dz, dx), -Math.atan2(Math.hypot(dx, dz), dy)]}
    >
      <cylinderGeometry args={[0.003, 0.003, length, 8]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  )
}

function Mast({ tube, line, grid }: { tube: string; line: string; grid: string }) {
  return (
    // Centred on the camera target, which is half the mast's height.
    <group position={[0, -1.6, 0]}>
      <Tube {...TUBE_60} color={tube} />
      <Tube {...TUBE_38} color={tube} />
      <Node radius={0.045} y={0.04} height={0.1} />
      <Node radius={0.042} y={COLLAR_Y} height={0.14} />
      <Node radius={0.03} y={3.14} height={0.08} />
      <DRing angle={0} />
      <DRing angle={(Math.PI * 2) / 3} />
      <DRing angle={(Math.PI * 4) / 3} />
      <GuyLine color={line} />
      <gridHelper args={[4, 16, line, grid]} />
    </group>
  )
}

export default function MastViewer({ onError }: { onError: () => void }) {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== 'light'
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <ViewerErrorBoundary onError={onError}>
      <Canvas
        camera={{ position: [2.8, 1.3, 5.4], fov: 38, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={dark ? 1.1 : 1.5} />
        <directionalLight position={[4, 6, 5]} intensity={dark ? 2.6 : 1.8} />
        <directionalLight position={[-5, 2, -3]} intensity={dark ? 1.2 : 0.8} />
        <Mast tube={dark ? '#D8D5CF' : '#B8B4AA'} line={dark ? '#8A9097' : '#5E636A'} grid={dark ? '#2E3236' : '#CFCAC0'} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </ViewerErrorBoundary>
  )
}
