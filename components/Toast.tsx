'use client'

import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import anime from 'animejs'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  show: boolean
  type?: ToastType
  onHide: () => void
}

export function Toast({ message, show, type = 'success', onHide }: ToastProps) {
  const [visible, setVisible] = useState(false)
  const toastRef = useRef<HTMLDivElement>(null)

  const toastStyles = {
    success: {
      bg: 'bg-white',
      text: 'text-black',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-900',
      icon: XCircle,
      iconColor: 'text-red-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-900',
      icon: AlertCircle,
      iconColor: 'text-yellow-600',
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      icon: AlertCircle,
      iconColor: 'text-blue-600',
    },
  }

  const style = toastStyles[type]
  const Icon = style.icon

  useEffect(() => {
    if (show && toastRef.current) {
      setVisible(true)
      
      anime({
        targets: toastRef.current,
        translateY: [0, -80],
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .8)',
      })

      const timer = setTimeout(() => {
        anime({
          targets: toastRef.current,
          translateY: -80,
          scale: 0.8,
          opacity: 0,
          duration: 300,
          easing: 'easeInQuad',
          complete: () => {
            setVisible(false)
            onHide()
          },
        })
      }, type === 'error' ? 4000 : 2500)
      return () => clearTimeout(timer)
    }
  }, [show, onHide, type])

  if (!visible) return null

  return (
    <div
      ref={toastRef}
      className={`fixed top-5 left-1/2 -translate-x-1/2 ${style.bg} ${style.text} px-4 py-2 rounded-full shadow-2xl z-50 flex items-center gap-2 font-medium text-xs pointer-events-none border ${type === 'error' ? 'border-red-200' : type === 'warning' ? 'border-yellow-200' : 'border-gray-200'}`}
      role="alert"
      aria-live="assertive"
    >
      <Icon className={`w-4 h-4 ${style.iconColor}`} />
      <span>{message}</span>
    </div>
  )
}

