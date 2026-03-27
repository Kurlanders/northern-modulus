'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'

// ─── Fixture position constants ───────────────────────────────────────────────
// These describe where the engineering part sits in the source images.
// All values are % of the full hero viewport.
// Tune FX/FY to recentre; FRX/FRY to resize the reveal window.
const FX  = 76   // horizontal centre of fixture
const FY  = 60   // vertical centre
const FRX = 26   // horizontal reveal radius
const FRY = 44   // vertical reveal radius

// ─── Mask applied to the STATIC clean layer (L1) ─────────────────────────────
//
// CSS mask convention: black = show element, transparent = hide element.
//
// This mask cuts a transparent hole in the static hero-clean image.
// Through that hole, the animated hero-full image (L2, rendered below L1)
// is visible. Everywhere else L1 is opaque — the clean scene covers L2.
//
// CRITICAL: the mask is on the STATIC layer, NOT on the animated motion.div.
// CSS mask-image atomically composites an element to 2D before any parent
// 3D transforms run. Masking the animated layer would flatten depth.
// Masking the static layer above it has zero effect on the layer below.
const L1_MASK = [
  `radial-gradient(`,
  `  ellipse ${FRX}% ${FRY}% at ${FX}% ${FY}%,`,
  `  transparent     66%,`,  // hole — L2 (fixture, animated) shows through
  `  rgba(0,0,0,.70) 74%,`,  // quicker ramp — less bleed of moving background
  `  black           81%`,   // reaches solid sooner — environment covered
  `)`,
].join('')

export default function HeroSection() {
  const prefersReduced = useReducedMotion()

  // Global window scroll — zero configuration, fires on all setups
  const { scrollY } = useScroll()

  const R = [0, 680] as [number, number]
  const v = <T,>(a: T, b: T): [T, T] => (prefersReduced ? [a, a] : [a, b])

  // Rotation is the primary depth cue; translateX reinforces the swing
  const rotateY = useTransform(scrollY, R, v(0,    7))
  const rotateX = useTransform(scrollY, R, v(0,    2))
  const x       = useTransform(scrollY, R, v(0,  -14))
  const y       = useTransform(scrollY, R, v(0,  -10))
  const scale   = useTransform(scrollY, R, v(1,  1.03))

  return (
    <section
      className="relative min-h-screen bg-nm-bg"
      style={{ overflow: 'hidden' }}
      aria-label="Hero"
    >

      {/* Background grid texture */}
      <div className="absolute inset-0 line-grid opacity-[0.15]" aria-hidden="true" />

      {/* Ambient green glow, upper-right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '900px', height: '900px',
          background: 'radial-gradient(circle at 70% 22%, #245040 0%, transparent 58%)',
          opacity: 0.06,
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════════════════
          L2 · hero-full.png — ANIMATED
          Rendered first → sits below L1 in stacking order.
          Has ZERO masks. transformPerspective + rotateY produce full 3D depth.
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          transformPerspective: 650,   // lower = more dramatic depth at 7 deg
          rotateY,
          rotateX,
          x,
          y,
          scale,
          transformOrigin: `${FX}% ${FY}%`,  // pivot at fixture centre
          willChange: 'transform',
        }}
      >
        <Image
          src="/pictures/hero-full.png"
          alt="Precision-engineered 3D printed fixture"
          fill
          sizes="100vw"
          className="object-cover object-center select-none"
          priority
          draggable={false}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════════
          L1 · hero-clean.png — STATIC, maskedRendered second → sits above L2.
          The radial mask punches a transparent hole over the fixture zone so
          L2 (the rotating fixture) shows through. Everywhere else L1 is
          opaque, covering the animated layer with the clean ambient scene.
          The mask here does NOT affect L2 — CSS masks only clip the element
          they are applied to, not any sibling/element below in the stack.
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ maskImage: L1_MASK, WebkitMaskImage: L1_MASK }}
      >
        <Image
          src="/pictures/hero-clean.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center select-none"
          priority
          draggable={false}
        />
      </div>

      {/* ── Soft ground shadow — anchors the fixture without wide halo ──── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          left: `${FX - 16}%`,
          right: '1%',
          height: '2.5%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
          filter: 'blur(18px)',
          borderRadius: '50%',
        }}
        aria-hidden="true"
      />

      {/* ── Left scrim — main text-column legibility gradient ───────────── */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: '65%',
          background:
            'linear-gradient(to right, #0C0D0F 20%, rgba(12,13,15,0.97) 40%, rgba(12,13,15,0.72) 56%, rgba(12,13,15,0.10) 74%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Secondary text scrim — extra calm behind headline column ────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(12,13,15,0.28) 0%, rgba(12,13,15,0.07) 34%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* ── Edge fades — blend image into site background ───────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: '20%', background: 'linear-gradient(to top, #0C0D0F 0%, transparent 100%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: '10%', background: 'linear-gradient(to bottom, #0C0D0F 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════════════════
          TEXT BLOCK
          ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 site-container flex flex-col justify-center min-h-screen">
        <div className="pt-28 pb-20 md:pt-36 md:pb-28 w-full max-w-lg xl:max-w-xl">

          <div
            className="mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
          >
            <SectionLabel index="NM" light>Custom 3D Printing</SectionLabel>
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            <h1 className="text-disp-2xl text-nm-text-p font-light tracking-tight mb-8">
              Parts built to{' '}
              <span className="text-nm-text-s font-light">engineering</span>
              <br className="hidden sm:block" />
              {' '}standard.
            </h1>
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: '0.32s', animationFillMode: 'backwards' }}
          >
            <p className="text-body-lg text-nm-text-s leading-relaxed mb-10 max-w-[44ch]">
              Premium FDM printing with engineering review as standard —
              prototypes, functional parts, and small-batch production.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-3 mb-14 animate-fade-up"
            style={{ animationDelay: '0.44s', animationFillMode: 'backwards' }}
          >
            <Button href="/contact" variant="primary" size="lg" withArrow>
              Get a Quote
            </Button>
            <Button href="/3d-printing" variant="secondary" size="lg">
              Explore 3D Printing
            </Button>
          </div>

          <div
            className="pt-8 border-t border-nm-border grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-up"
            style={{ animationDelay: '0.56s', animationFillMode: 'backwards' }}
          >
            {[
              { value: 'FDM',   label: 'Premium printing' },
              { value: '24h',   label: 'Quote turnaround' },
              { value: '1→500', label: 'Qty range'        },
              { value: 'Eng.',  label: 'Led review'       },
            ].map((s) => (
              <div key={s.value} className="flex flex-col gap-1.5">
                <span className="font-mono text-[1.4rem] font-light text-nm-text-p tracking-tight leading-none">
                  {s.value}
                </span>
                <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25"
        aria-hidden="true"
      >
        <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em]">
          Scroll
        </span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
          <rect x="1" y="1" width="10" height="18" rx="5" stroke="#8C8A85" strokeWidth="1.2" />
          <rect x="5" y="5" width="2" height="4" rx="1" fill="#8C8A85" />
        </svg>
      </div>
    </section>
  )
}
