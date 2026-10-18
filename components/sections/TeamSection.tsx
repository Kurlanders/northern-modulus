const founder = {
  name: 'Rihards Vašuks',
  role: 'Founder & Engineer',
  bio: "Founder of Northern Modulus and the engineer behind every part. Industrial Engineering master's student with a day-to-day background in composites manufacturing: prepreg, autoclave, CNC tooling and mould design in CAD. Every file gets the same review I'd give a production part.",
  initials: 'RV',
}

export default function TeamSection() {
  return (
    <section className="py-[100px] bg-nm-s1 border-b border-nm-border" aria-labelledby="founder-heading">
      <div className="site-container">

        <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
          {'// About the founder'}
        </p>
        <h2
          id="founder-heading"
          className="text-[clamp(28px,3vw,44px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em] mb-14"
        >
          The engineer behind<br />
          <span className="text-nm-text-s font-medium">every part.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] max-w-[860px] border border-nm-border">

          {/* Photo placeholder */}
          <div className="bg-nm-s2 flex items-center justify-center sm:min-h-[300px] py-12 sm:py-0 border-b border-nm-border sm:border-b-0 sm:border-r">
            <div
              className="w-[96px] h-[96px] flex items-center justify-center border border-nm-border"
              style={{ background: 'rgba(30,187,110,0.06)' }}
              aria-hidden="true"
            >
              <span className="text-[22px] font-bold text-nm-green-text tracking-[-0.02em]">
                {founder.initials}
              </span>
            </div>
          </div>

          <div className="bg-nm-bg p-9 sm:p-10 flex flex-col justify-center">
            <h3 className="text-[clamp(18px,2vw,26px)] font-bold text-nm-text-p tracking-[-0.02em] leading-[1.2] mb-1.5">
              {founder.name}
            </h3>
            <p className="text-[13px] font-medium text-nm-green-text mb-5">
              {founder.role}
            </p>
            <p className="text-[13px] text-nm-text-s leading-[1.85] max-w-[480px]">
              {founder.bio}
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
