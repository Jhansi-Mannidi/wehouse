import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: 'bg-[hsl(var(--hover-bg))] text-foreground shadow-sm hover:bg-[hsl(var(--hover-bg))]/80 hover:shadow-md active:bg-[hsl(var(--hover-bg))]/70',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline:
          'border border-border bg-transparent shadow-sm hover:bg-[hsl(var(--hover-bg))] hover:text-foreground hover:border-border/50',
        secondary:
          'bg-[hsl(var(--hover-bg))] text-foreground shadow-sm hover:bg-[hsl(var(--hover-bg))]/80',
        ghost:
          'hover:bg-[hsl(var(--hover-bg))] hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Premium variants
        gold: 'bg-[hsl(var(--hover-bg))] text-foreground shadow-sm hover:bg-[hsl(var(--hover-bg))]/80 hover:shadow-md active:bg-[hsl(var(--hover-bg))]/70',
        midnight: 'bg-[hsl(var(--hover-bg))] text-foreground shadow-sm hover:bg-[hsl(var(--hover-bg))]/80 hover:shadow-md active:bg-[hsl(var(--hover-bg))]/70',
        success: 'bg-[hsl(var(--hover-bg))] text-foreground shadow-sm hover:bg-[hsl(var(--hover-bg))]/80 active:bg-[hsl(var(--hover-bg))]/70',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-8 rounded-lg gap-1.5 px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-2xl px-10 text-lg',
        icon: 'size-10',
        'icon-sm': 'size-8 rounded-lg',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
