interface DividerProps {
  className?: string
  variant?: 'default' | 'faint' | 'green'
}

export default function Divider({ className = '', variant = 'default' }: DividerProps) {
  const colors = {
    default: 'border-nm-border',
    faint: 'border-nm-border/50',
    green: 'border-nm-green-mid',
  }
  return <hr className={`border-t ${colors[variant]} ${className}`} aria-hidden="true" />
}
