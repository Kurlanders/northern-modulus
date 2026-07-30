import Link from 'next/link'
import Image from 'next/image'

const capabilities = [
  {
    index: '01',
    title: 'Premium FDM Printing',
    description: 'Industrial-grade hardware. Tighter tolerances, cleaner surfaces, more consistent results.',
  },
  {
    index: '02',
    title: 'Engineering-Led Review',
    description: 'Wall thickness, geometry, orientation, and failure points checked before printing.',
  },
  {
    index: '03',
    title: 'Material Guidance',
    description: 'PLA, PETG, ABS, ASA, TPU, PC. Right material for load, temperature, and environment.',
  },
  {
    index: '04',
    title: 'Structural Settings',
    description: 'Infill, orientation, and print settings chosen for the application — not defaulted.',
  },
  {
    index: '05',
    title: 'Pre-Production Builds',
    description: 'First-off validation to pre-production batches. Full development cycle supported.',
  },
  {
    index: '06',
    title: 'Small Batch 1–500+',
    description: 'No minimum order. Clear quotes so you can decide with confidence.',
  },
]

export default function PrintCapabilities() {
  return (
    <section className="py-[120px] bg-nm-bg border-t border-nm-border" aria-labelledby="capabilities-heading">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-24 items-start">

          {/* Left sidebar */}
          <div>
            <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
              // Capabilities
            </p>
            <h2
              id="capabilities-heading"
              className="text-[clamp(26px,3vw,42px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em] mb-7"
            >
              What you get<br />with every order.
            </h2>
            <p className="text-[13px] text-nm-text-s leading-[1.8] mb-9">
              Consistent engineering input and premium print quality — prototype or repeat production run.
            </p>
            <Link
              href="/3d-printing"
              className="text-[13px] font-semibold text-nm-green-text hover:opacity-80 transition-opacity"
            >
              Full Capabilities →
            </Link>
          </div>

          {/* Right 2-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-nm-border">
            {capabilities.map((cap) => (
              <div
                key={cap.index}
                className="bg-nm-bg p-8 hover:bg-nm-s1 transition-colors duration-300"
              >
                <p className="text-[11px] font-semibold text-nm-green-text tracking-[2px] mb-3.5 opacity-70">
                  {cap.index}
                </p>
                <h3 className="text-[15px] font-semibold text-nm-text-p mb-2.5">{cap.title}</h3>
                <p className="text-[13px] text-nm-text-s leading-[1.8]">{cap.description}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Printer photo */}
        <div className="mt-16 border border-nm-border overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_400px]">

          {/* Caption panel */}
          <div className="bg-nm-s1 px-12 py-14 flex flex-col justify-center border-b border-nm-border lg:border-b-0 lg:border-r lg:border-nm-border">
            <p className="text-[12px] font-medium text-nm-green-text tracking-[2.5px] uppercase mb-5">
              // Our Machine
            </p>
            <h3 className="text-[clamp(22px,2.5vw,34px)] font-bold text-nm-text-p leading-[1.2] tracking-[-0.02em] mb-5">
              Custom-built.<br />Modified in-house.
            </h3>
            <p className="text-[14px] text-nm-text-s leading-[1.85] max-w-[420px]">
              Tuned for precision, consistency, and the kind of results that off-the-shelf hardware doesn't produce. Every print runs on this machine.
            </p>
          </div>

          {/* Image panel */}
          <div className="relative h-[580px] lg:h-auto overflow-hidden" style={{ minHeight: '580px' }}>
            <Image
              src="/pictures/printer_picture.jpg"
              alt="Our custom-built FDM 3D printer"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 32%' }}
            />
          </div>

        </div>

      </div>
    </section>
  )
}
