'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
import type { Group } from 'three'

const DRACO_PATH = '/draco/'
const MODEL_SCALE_MULTIPLIER = 1.5
const SPIN_DURATION = 1.5

function Model({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const ref = useRef<Group>(null)
  const { scene } = useGLTF('/models/hero-object.glb', DRACO_PATH)
  const loadedAt   = useRef(0)
  const baseScale  = useRef(1)
  const initialized = useRef(false)

  useFrame(() => {
    if (!ref.current) return

    if (!initialized.current) {
      const box    = new Box3().setFromObject(ref.current)
      const center = box.getCenter(new Vector3())
      const size   = box.getSize(new Vector3())

      ref.current.position.sub(center)

      const maxDim = Math.max(size.x, size.y, size.z)
      baseScale.current = 2.2 / (maxDim * Math.SQRT2)

      ref.current.scale.setScalar(0.001)
      ref.current.rotation.y = Math.PI * 1.6
      loadedAt.current = performance.now()
      initialized.current = true
      return
    }

    const elapsed     = (performance.now() - loadedAt.current) / 1000
    const targetScale = baseScale.current * MODEL_SCALE_MULTIPLIER

    if (elapsed < SPIN_DURATION) {
      const p     = elapsed / SPIN_DURATION
      const eased = 1 - Math.pow(1 - p, 3)
      ref.current.scale.setScalar(Math.max(0.001, eased * targetScale))
      ref.current.rotation.y = Math.PI * 1.6 * (1 - eased)
    } else {
      ref.current.scale.setScalar(targetScale)
      ref.current.rotation.y += 0.003
    }

    ref.current.position.y = -(scrollY.current || 0) * 0.0016
  })

  return <primitive ref={ref} object={scene} />
}

function Lights() {
  return (
    <>
      <ambientLight intensity={3.5} color="#D0F0E4" />
      <directionalLight position={[4, 8, 6]} intensity={6.0} color="#E8FFF4" />
      <directionalLight position={[-4, 4, 4]} intensity={4.0} color="#1EBB6E" />
      <pointLight position={[-5, 3, 4]} intensity={8.0} color="#1EBB6E" distance={28} />
      <pointLight position={[4, -4, -3]} intensity={4.0} color="#0EA85E" distance={22} />
      <directionalLight position={[-3, -2, -5]} intensity={2.5} color="#B8FFDC" />
    </>
  )
}

export default function HeroModel() {
  const scrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 32, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <Lights />
      <Suspense fallback={null}>
        <Model scrollY={scrollY} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/hero-object.glb', DRACO_PATH)
