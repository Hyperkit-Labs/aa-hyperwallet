'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface ToggleProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  size?: 'sm' | 'md'
}

export function Toggle({ id, checked, onChange, size = 'md' }: ToggleProps) {
  const sizeClasses = size === 'sm' ? 'w-8 h-4' : 'w-9 h-5'
  const thumbSize = size === 'sm' ? 'w-4 h-4' : 'w-4 h-4'
  const thumbRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const prevCheckedRef = useRef(checked)

  useEffect(() => {
    if (prevCheckedRef.current !== checked && thumbRef.current && labelRef.current) {
      // Animate thumb with spring effect
      anime({
        targets: thumbRef.current,
        scale: [1, 1.2, 1],
        duration: 400,
        easing: 'easeOutElastic(1, .6)',
      })

      // Animate background color change
      anime({
        targets: labelRef.current,
        backgroundColor: checked ? '#9333ea' : '#2a2a2e',
        duration: 300,
        easing: 'easeOutQuad',
      })
    }
    prevCheckedRef.current = checked
  }, [checked])

  return (
    <div className={`relative inline-block ${sizeClasses} align-middle select-none`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <label
        ref={labelRef}
        htmlFor={id}
        className={`block overflow-hidden ${sizeClasses} rounded-full cursor-pointer border border-white/5 ${
          checked ? 'bg-purple-600' : 'bg-[#2a2a2e]'
        }`}
      >
        <span
          ref={thumbRef}
          className={`absolute ${thumbSize} rounded-full bg-white ${
            checked ? 'right-0.5' : 'left-0.5'
          } top-0.5`}
        />
      </label>
    </div>
  )
}

