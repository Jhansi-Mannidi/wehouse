import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  // Return empty div with no visual styling to prevent skeleton animations
  return (
    <div
      data-slot="skeleton"
      className={cn('hidden', className)}
      {...props}
    />
  )
}

export { Skeleton }
