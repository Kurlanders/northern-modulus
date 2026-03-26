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
    'bg-nm-green-accent hover:bg-nm-green-bright text-nm-text-p border border-nm-green-accent hover:border-nm-green-bright',
  secondary:
    'bg-transparent hover:bg-nm-s2 text-nm-text-p border border-nm-border-mid hover:border-nm-border-light',
  ghost:
    'bg-transparent hover:bg-nm-s1 text-nm-text-s hover:text-nm-text-p border border-transparent',
  outline:
    'bg-transparent hover:bg-nm-green-deep text-nm-green-text border border-nm-green-accent hover:border-nm-green-bright',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-label-md',
  md: 'px-6 py-3 text-label-lg',
  lg: 'px-8 py-4 text-label-lg',
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
    'inline-flex items-center gap-2.5 font-sans font-medium uppercase tracking-[0.1em] rounded-sm2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 select-none'

  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${
    disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
  } ${className}`

  const content = (
    <>
      {children}
      {withArrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path
            d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${classes}`}
        >
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
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${classes}`}
    >
      {content}
    </button>
  )
}
