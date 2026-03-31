'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import type { Group } from 'three'

const DRACO_PATH = '/draco/'

// How many pixels of scroll = full rotation range
const SCROLL_RANGE = 700

function Model({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const ref = useRef<Group>(null)
  const { scene } = useGLTF('/models/hero-object.glb', DRACO_PATH)

  useFrame(() => {
    if (!ref.current) return
    const progress = Math.min(scrollY.current / SCROLL_RANGE, 1)

    // Y rotation: starts at 0.3 rad, swings ~120° as user scrolls
    ref.current.rotation.y = 0.3 + progress * Math.PI * 0.65
    // Slight tilt on X for depth feel
    ref.current.rotation.x = progress * 0.18
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.0}          // ← tweak scale here
      position={[0, 0, 0]} // ← tweak position here [x, y, z]
    />
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]}  intensity={1.4} color="#f0ece8" castShadow />
      <directionalLight position={[-4, 2, 2]} intensity={0.4} color="#c8d8ff" />
      <directionalLight position={[0, -2, -5]} intensity={0.25} color="#b0c8e0" />
      <pointLight       position={[0, -3, 2]}  intensity={0.15} color="#245040" />
    </>
  )
}

export default function HeroModel() {
  // Mutable ref — updated on scroll, read inside useFrame without triggering re-renders
  const scrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Canvas
      camera={{
        position: [0, 0.6, 4.0], // ← tweak camera here [x, y, z]
        fov: 42,                  // ← tweak FOV here
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <Lights />
      <Suspense fallback={null}>
        <Model scrollY={scrollY} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/hero-object.glb', DRACO_PATH)
