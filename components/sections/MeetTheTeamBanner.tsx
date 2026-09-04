import Link from 'next/link'

export default function MeetTheTeamBanner() {
  return (
    <section className="py-[80px] bg-nm-bg border-t border-nm-border" aria-label="Meet the team">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">

          {/* Left: avatar + identity */}
          <div className="flex items-center gap-6">
            <div
              className="w-[64px] h-[64px] flex-shrink-0 flex items-center justify-center border border-nm-border"
              style={{ background: 'rgba(30,187,110,0.06)' }}
              aria-hidden="true"
            >
              <span className="text-[15px] font-bold text-nm-green-text tracking-[-0.01em]">RV</span>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-nm-text-p leading-[1.3]">
                Rihards Vašuks
              </p>
              <p className="text-[12px] text-nm-text-t mt-0.5">
                Founder & Engineer
              </p>
            </div>
          </div>

          {/* Right: copy + link */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <p className="text-[14px] text-nm-text-s leading-[1.7] max-w-[340px]">
              Want to know who's behind every print?
            </p>
            <Link
              href="/about"
              className="text-[13px] font-semibold text-nm-green-text border border-nm-green-text px-7 py-3.5 hover:bg-nm-green-text hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              Meet the team →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
