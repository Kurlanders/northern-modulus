import { LEGAL_LAST_UPDATED } from '@/lib/company'

export default function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      <section className="relative pt-[140px] pb-[56px] bg-nm-bg border-b border-nm-border overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="site-container relative">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
            {`// ${eyebrow}`}
          </p>
          <h1 className="text-[clamp(32px,4vw,56px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em] mb-5">
            {title}
          </h1>
          <p className="text-[15px] text-nm-text-t">Last updated: {LEGAL_LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-[72px] bg-nm-bg">
        <div className="site-container">
          <div
            className="max-w-[720px] text-[15px] text-nm-text-s leading-[1.85]
              [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-nm-text-p [&_h2]:tracking-[-0.01em] [&_h2]:mt-12 [&_h2]:mb-4 first:[&_h2]:mt-0
              [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1.5
              [&_a]:text-nm-green-text [&_a:hover]:text-nm-green-bright [&_strong]:text-nm-text-p"
          >
            {children}
          </div>
        </div>
      </section>
    </>
  )
}
