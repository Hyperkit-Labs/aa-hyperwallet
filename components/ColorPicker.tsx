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
        onMouseLeave={() => {
          setShowTooltip(false)
          setIsOpen(false)
        }}
        onClick={() => {
          setIsOpen(!isOpen)
          inputRef.current?.click()
        }}
        className="w-6 h-6 rounded border border-white/20 shadow-inner cursor-pointer hover:scale-110 transition-transform relative"
        style={{ backgroundColor: value }}
      >
        {showTooltip && !isOpen && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 border-2 border-purple-500/50 rounded-lg text-xs font-semibold text-white whitespace-nowrap z-50 pointer-events-none shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded border-2 border-white/30 shadow-inner"
                style={{ backgroundColor: value }}
              />
              <span className="font-mono">{value.toUpperCase()}</span>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-3 h-3 bg-gray-900 border-r-2 border-b-2 border-purple-500/50 rotate-45"></div>
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

