import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  external?: boolean
  withArrow?: boolean
  // 'span' renders the same look without being interactive, for CTAs inside a card that is itself a link.
  as?: 'span'
}

// Pill system shared with components/theme/ThemeToggle.tsx: rounded-full, 1px border, same focus ring.
const base =
  'group/btn inline-flex items-center justify-center gap-2 select-none whitespace-nowrap transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'rounded-full border border-transparent bg-nm-green-text text-nm-on-green font-semibold hover:bg-nm-green-bright',
  secondary: 'rounded-full border border-nm-border-light bg-transparent text-nm-text-p font-semibold hover:bg-nm-s2 hover:border-nm-field',
  text: 'text-nm-green-text font-semibold hover:text-nm-green-bright underline-offset-4 decoration-1 hover:underline',
}

// Fixed heights so buttons line up: sm matches the header's theme toggle and nav pills (h-11).
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-11 text-[15px]',
  md: 'h-12 text-[15px]',
  lg: 'h-[52px] text-[15px]',
}
const textSizeClasses: Record<ButtonSize, string> = {
  sm: 'text-[14px]',
  md: 'text-[15px]',
  lg: 'text-[15px]',
}

const disabledClasses =
  'rounded-full border border-nm-border bg-nm-s3 text-nm-text-s font-semibold px-6 cursor-not-allowed pointer-events-none'

function Arrow({ nudgeWithCard }: { nudgeWithCard: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`flex-shrink-0 transition-transform duration-200 group-hover/btn:translate-x-[3px] ${nudgeWithCard ? 'group-hover:translate-x-[3px]' : ''}`}
    >
      <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  external = false,
  withArrow = false,
  as,
}: ButtonProps) {
  const nudgeWithCard = as === 'span'
  const chip = variant === 'primary' && withArrow && !disabled

  let classes: string
  if (disabled) {
    classes = `${base} ${sizeClasses[size]} ${disabledClasses}`
  } else if (variant === 'text') {
    classes = `${base} ${textSizeClasses[size]} ${variantClasses.text}`
  } else {
    // Primary with a chip: 24px left, 6px right so the 28px chip sits snug against the edge.
    const padding = chip ? 'pl-6 pr-1.5' : size === 'sm' ? 'px-7' : 'px-6'
    classes = `${base} ${sizeClasses[size]} ${padding} ${variantClasses[variant]}`
  }
  classes = `${classes} ${className}`

  const content = (
    <>
      {/* With a chip, the label takes any spare width so the chip stays against the right edge on full-width buttons. */}
      <span className={chip ? 'flex-1 text-center' : undefined}>{children}</span>
      {withArrow &&
        (chip ? (
          <span className="ml-1 inline-flex items-center justify-center w-7 h-7 rounded-full bg-nm-on-green text-nm-green-text flex-shrink-0">
            <Arrow nudgeWithCard={nudgeWithCard} />
          </span>
        ) : (
          <Arrow nudgeWithCard={nudgeWithCard} />
        ))}
    </>
  )

  if (as === 'span') {
    return <span className={classes}>{content}</span>
  }

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}
