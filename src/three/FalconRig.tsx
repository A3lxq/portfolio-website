import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FalconPoints } from './FalconPoints'

gsap.registerPlugin(ScrollTrigger)

// Sections the falcon "checks in on" as the visitor scrolls — each one
// re-triggers the beacon pulse, instead of a single one-shot moment.
const PULSE_TARGETS = ['#projects', '#contact']

/**
 * Orchestrates the falcon's role as the page's recurring 3D motif:
 * assembles from scattered particles on load, then eases toward a
 * bottom-right "waypoint" badge as the visitor scrolls through the
 * content — staying a legible companion rather than shrinking to a
 * speck — pulsing brighter as a "beacon" whenever a waypoint section
 * (Projects, Contact) is in view, and gently tilting toward the cursor.
 * All motion is driven by refs read in useFrame — GSAP/DOM listeners only
 * ever write plain numbers, never touch the Three.js objects directly.
 */
export function FalconRig() {
  const groupRef = useRef<THREE.Group>(null)
  const assemblyProgress = useRef(0)
  const scrollProgress = useRef(0)
  const pulseActive = useRef(false)
  const pointer = useRef({ x: 0, y: 0 })
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

    const pulseTriggers = PULSE_TARGETS.map((selector) =>
      ScrollTrigger.create({
        trigger: selector,
        start: 'top 70%',
        end: 'bottom top',
        onToggle: (self) => {
          pulseActive.current = self.isActive
        },
      }),
    )

    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      assembleTween.kill()
      scrollTrigger.kill()
      pulseTriggers.forEach((trigger) => trigger.kill())
      window.removeEventListener('pointermove', handlePointerMove)
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
    const cornerX = halfW - 0.9
    const cornerY = -(halfH - 0.9)

    group.position.x = THREE.MathUtils.lerp(startX, cornerX, t)
    group.position.y = THREE.MathUtils.lerp(startY, cornerY, t)

    // Settles as a legible companion badge, not a near-invisible speck.
    const baseScale = THREE.MathUtils.lerp(0.55, 0.32, t)
    const pulse = pulseActive.current
      ? 1 + Math.sin(state.clock.elapsedTime * 3.2) * 0.12
      : 1
    group.scale.setScalar(baseScale * pulse)

    // Constant slow spin, biased by cursor position — a snappy-but-eased
    // "watches the cursor" tilt (damping ~0.1/frame).
    const spin = state.clock.elapsedTime * 0.15
    const targetRotY = spin + pointer.current.x * 0.35
    const targetRotX = pointer.current.y * -0.2
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.1)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.1)
  })

  return (
    <group ref={groupRef}>
      <FalconPoints progressRef={assemblyProgress} />
    </group>
  )
}
