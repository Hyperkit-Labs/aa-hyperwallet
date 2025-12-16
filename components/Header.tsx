'use client'

import { ArrowLeft } from 'lucide-react'

interface HeaderProps {
  onToast: (message: string) => void
}

export function Header({ onToast }: HeaderProps) {
  return (
    <header className="h-14 border-b border-white/10 flex items-center justify-between px-5 bg-[#030305] shrink-0 z-40">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onToast('Navigated to Home')}
      >
        <div className="relative flex items-center justify-center w-6 h-6">
          <div className="bg-purple-600 w-3 h-3 rounded-sm rotate-45 blur-[2px] absolute"></div>
          <div className="bg-white w-2 h-2 rounded-[1px] rotate-45 relative z-10"></div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight leading-none text-white">DEMO</span>
          <span className="text-[10px] text-gray-500 font-medium tracking-wide">ACCOUNT ABSTRACTION</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
        <span className="text-xs font-medium text-gray-300">Smart Wallet Builder</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToast('Navigating to Dashboard...')}
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
        <div
          onClick={() => onToast('Opening Profile Settings...')}
          className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold border border-white/10 cursor-pointer hover:ring-2 hover:ring-purple-500/50 transition-all"
        >
          JD
        </div>
      </div>
    </header>
  )
}

