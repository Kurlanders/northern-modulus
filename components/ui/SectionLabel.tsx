interface SectionLabelProps {
  children: React.ReactNode
  index?: string
  className?: string
  light?: boolean
}

export default function SectionLabel({
  children,
  index,
  className = '',
  light = false,
}: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index && (
        <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em] select-none">
          {index}
        </span>
      )}
      <span
        className={`font-mono text-label-md uppercase tracking-[0.14em] ${
          light ? 'text-nm-text-s' : 'text-nm-text-t'
        }`}
      >
        {children}
      </span>
    </div>
  )
}
