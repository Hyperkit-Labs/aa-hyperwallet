'use client'

import { useState, useRef } from 'react'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const presetColors = [
    '#9333EA', // Purple
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#06B6D4', // Cyan
  ]

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => {
          setIsOpen(!isOpen)
          inputRef.current?.click()
        }}
        className="w-6 h-6 rounded border border-white/20 shadow-inner cursor-pointer hover:scale-110 transition-transform relative"
        style={{ backgroundColor: value }}
      >
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1C1C1E] border border-white/10 rounded text-[10px] text-white whitespace-nowrap z-50 pointer-events-none">
            {value}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-[#1C1C1E] border-r border-b border-white/10 rotate-45"></div>
          </div>
        )}
      </button>
      {isOpen && (
        <div className="absolute top-8 left-0 z-50 bg-[#1C1C1E] border border-white/10 rounded-lg p-3 shadow-xl">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onChange(color)
                  setIsOpen(false)
                }}
                className="w-6 h-6 rounded border border-white/10 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <input
            ref={inputRef}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-8 rounded cursor-pointer"
            onBlur={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  )
}

