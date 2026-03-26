export default function PositioningStrip() {
  const points = [
    'Industrial problem scoping',
    'Engineered concept development',
    'Prototype and validation',
    'Delivery-ready solutions',
  ]

  return (
    <section className="bg-nm-s1 border-y border-nm-border" aria-label="Positioning">
      <div className="site-container">
        <div className="py-7 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0">
          {/* Left statement */}
          <div className="lg:w-72 flex-shrink-0 lg:border-r lg:border-nm-border lg:pr-10">
            <p className="font-mono text-label-md uppercase tracking-[0.14em] text-nm-green-text">
              Northern Modulus
            </p>
            <p className="text-body-sm text-nm-text-s mt-1 leading-relaxed">
              From brief to engineered solution
            </p>
          </div>

          {/* Points */}
          <div className="lg:pl-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {points.map((point, i) => (
              <div key={point} className="flex items-center gap-3">
                <span className="font-mono text-label-sm text-nm-green-text tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-body-sm text-nm-text-s">{point}</span>
                {i < points.length - 1 && (
                  <span className="hidden sm:block text-nm-border-mid ml-5" aria-hidden="true">
                    /
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
