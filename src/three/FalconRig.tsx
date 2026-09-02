import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FalconPoints } from './FalconPoints'

gsap.registerPlugin(ScrollTrigger)

/**
 * Orchestrates the falcon's role as the page's recurring 3D motif:
 * assembles from scattered particles on load, then shrinks into a
 * bottom-right "waypoint" badge as the visitor scrolls through the
 * content, pulsing brighter as a "beacon" once the Contact section is
 * reached. All motion is driven by refs read in useFrame — GSAP only
 * ever writes plain numbers, never touches the Three.js objects directly.
 */
export function FalconRig() {
  const groupRef = useRef<THREE.Group>(null)
  const assemblyProgress = useRef(0)
  const scrollProgress = useRef(0)
  const beaconActive = useRef(false)
  const { viewport } = useThree()

  useEffect(() => {
    const assembleTween = gsap.to(assemblyProgress, {
      current: 1,
      duration: 2.4,
      delay: 0.3,
      ease: 'power2.out',
    })

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '+=1200',
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })

    const contactTrigger = ScrollTrigger.create({
      trigger: '#contact',
      start: 'top 70%',
      end: 'bottom top',
      onToggle: (self) => {
        beaconActive.current = self.isActive
      },
    })

    return () => {
      assembleTween.kill()
      scrollTrigger.kill()
      contactTrigger.kill()
    }
  }, [])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return

    const t = scrollProgress.current
    const halfW = viewport.width / 2
    const halfH = viewport.height / 2

    const startX = halfW * 0.62
    const startY = halfH * 0.12
    const cornerX = halfW - 0.7
    const cornerY = -(halfH - 0.7)

    group.position.x = THREE.MathUtils.lerp(startX, cornerX, t)
    group.position.y = THREE.MathUtils.lerp(startY, cornerY, t)

    const baseScale = THREE.MathUtils.lerp(0.55, 0.13, t)
    const beaconPulse = beaconActive.current
      ? 1 + Math.sin(state.clock.elapsedTime * 3.2) * 0.12
      : 1
    group.scale.setScalar(baseScale * beaconPulse)

    group.rotation.y = state.clock.elapsedTime * 0.15
  })

  return (
    <group ref={groupRef}>
      <FalconPoints progressRef={assemblyProgress} />
    </group>
  )
}
