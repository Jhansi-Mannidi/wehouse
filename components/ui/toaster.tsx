'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3 w-full">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {variant === 'success' && (
                  <div className="rounded-full bg-green-500/20 p-1.5">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                )}
                {variant === 'destructive' && (
                  <div className="rounded-full bg-red-500/20 p-1.5">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 grid gap-1.5">
                {title && (
                  <ToastTitle className={
                    variant === 'success' ? 'text-green-900 dark:text-green-100' :
                    variant === 'destructive' ? 'text-red-900 dark:text-red-100' :
                    'text-foreground'
                  }>
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className={
                    variant === 'success' ? 'text-green-700 dark:text-green-200' :
                    variant === 'destructive' ? 'text-red-700 dark:text-red-200' :
                    'text-muted-foreground'
                  }>
                    {description}
                  </ToastDescription>
                )}
              </div>
              
              {/* Action and Close */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {action}
                <ToastClose />
              </div>
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
