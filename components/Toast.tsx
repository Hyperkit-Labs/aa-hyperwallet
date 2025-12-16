'use client'

import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import anime from 'animejs'

interface ToastProps {
  message: string
  show: boolean
  onHide: () => void
}

export function Toast({ message, show, onHide }: ToastProps) {
  const [visible, setVisible] = useState(false)
  const toastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (show && toastRef.current) {
      setVisible(true)
      
      // Animate in with bounce and scale
      anime({
        targets: toastRef.current,
        translateY: [0, -80],
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .8)',
      })

      const timer = setTimeout(() => {
        // Animate out
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
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [show, onHide])

  if (!visible) return null

  return (
    <div
      ref={toastRef}
      className="fixed top-5 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-2xl z-50 flex items-center gap-2 font-medium text-xs pointer-events-none"
    >
      <CheckCircle2 className="w-4 h-4 text-green-600" />
      <span>{message}</span>
    </div>
  )
}

