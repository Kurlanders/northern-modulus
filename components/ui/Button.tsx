import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
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
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-nm-green-text hover:bg-nm-green-bright text-nm-on-green',
  secondary:
    'bg-transparent hover:bg-nm-s2 text-nm-text-p border border-nm-border hover:border-nm-border-mid',
  ghost:
    'bg-transparent hover:bg-nm-s1 text-nm-text-s hover:text-nm-text-p',
  outline:
    'bg-transparent hover:bg-nm-s1 text-nm-green-text border border-nm-border hover:border-nm-green-text',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[13px]',
  md: 'px-7 py-3 text-[13px]',
  lg: 'px-9 py-[14px] text-[13px]',
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
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2.5 font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 select-none'

  // Disabled uses solid neutral colors rather than opacity, so its label (e.g. "Uploading files…") stays readable.
  const stateClasses = disabled
    ? 'bg-nm-s3 text-nm-text-s border border-nm-border cursor-not-allowed pointer-events-none'
    : `${variantClasses[variant]} cursor-pointer`
  const classes = `${base} ${stateClasses} ${sizeClasses[size]} ${className}`

  const content = (
    <>
      {children}
      {withArrow && (
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path
            d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11"
            stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`group ${classes}`}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={`group ${classes}`}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`group ${classes}`}>
      {content}
    </button>
  )
}
