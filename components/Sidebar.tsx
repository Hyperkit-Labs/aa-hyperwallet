'use client'

import { useEffect, useRef } from 'react'
import { useState } from 'react'
import {
  Mail,
  Smartphone,
  Fingerprint,
  Wallet,
  Cpu,
  ChevronDown,
  ChevronRight,
  FileJson,
  Code2,
  Upload,
} from 'lucide-react'
import anime from 'animejs'
import { Toggle } from './Toggle'
import { ColorPicker } from './ColorPicker'
import { WalletConfig, PRESETS, AccountType, PersistenceType, DurationType, FontFamily } from '@/lib/types'

interface SidebarProps {
  config: WalletConfig
  onConfigChange: (updates: Partial<WalletConfig>) => void
  onToast: (message: string) => void
  onCopyConfig: () => void
  onCopyReact: () => void
}

export function Sidebar({
  config,
  onConfigChange,
  onToast,
  onCopyConfig,
  onCopyReact,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showPersistenceMenu, setShowPersistenceMenu] = useState(false)
  const [showDurationMenu, setShowDurationMenu] = useState(false)
  const [showSessionsAccordion, setShowSessionsAccordion] = useState(false)

  useEffect(() => {
    if (sidebarRef.current) {
      const items = sidebarRef.current.querySelectorAll('.sidebar-item')
      anime({
        targets: items,
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        delay: anime.stagger(50),
        easing: 'easeOutQuad',
      })
    }
  }, [])

  const previewBlocks = {
    email: config.email,
    sms: config.sms,
    social: config.social,
    passkey: config.passkey,
    external: config.external,
  }

  const handlePresetChange = (preset: keyof typeof PRESETS) => {
    const presetConfig = PRESETS[preset]
    onConfigChange({ ...presetConfig, preset })
    onToast(`Applied ${preset === 'full' ? 'Full Login + Wallets' : preset === 'simple' ? 'Simple Login' : 'Wallet-Only'}`)
  }

  return (
    <aside ref={sidebarRef} className="w-80 bg-[#050507] border-r border-white/10 flex flex-col overflow-y-auto shrink-0 z-20">
      {/* Preset Selector */}
      <div className="sidebar-item p-5 border-b border-white/5 sticky top-0 bg-[#050507] z-10 backdrop-blur-sm">
        <label className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider mb-2 block">
          Preset
        </label>
        <div className="relative">
          <select
            value={config.preset}
            onChange={(e) => handlePresetChange(e.target.value as keyof typeof PRESETS)}
            className="w-full bg-[#1C1C1E] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-purple-500 cursor-pointer hover:bg-white/5 transition-colors"
          >
            <option value="full">Full Login + Wallets</option>
            <option value="simple">Simple Login</option>
            <option value="wallet">Wallet-Only</option>
          </select>
          <div className="absolute right-3 top-3 pointer-events-none text-gray-500">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="sidebar-item p-5 border-b border-white/5 space-y-4">
        <h3 className="text-xs font-medium text-white flex items-center gap-2">Authentication</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#1C1C1E] flex items-center justify-center text-gray-400 border border-white/5">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-gray-300">Email</span>
            </div>
            <Toggle
              id="toggle-email"
              checked={config.email}
              onChange={(checked) => onConfigChange({ email: checked })}
            />
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#1C1C1E] flex items-center justify-center text-gray-400 border border-white/5">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-300">SMS</span>
                <span className="text-[9px] text-purple-400 font-medium">BETA</span>
              </div>
            </div>
            <Toggle
              id="toggle-sms"
              checked={config.sms}
              onChange={(checked) => onConfigChange({ sms: checked })}
            />
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#1C1C1E] flex items-center justify-center text-gray-400 border border-white/5">
                <div className="flex -space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
              </div>
              <span className="text-xs text-gray-300">Social</span>
            </div>
            <Toggle
              id="toggle-social"
              checked={config.social}
              onChange={(checked) => onConfigChange({ social: checked })}
            />
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#1C1C1E] flex items-center justify-center text-gray-400 border border-white/5">
                <Fingerprint className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-300">Passkey</span>
                <span className="text-[9px] text-gray-500">Add after sign-up</span>
              </div>
            </div>
            <Toggle
              id="toggle-passkey"
              checked={config.passkey}
              onChange={(checked) => onConfigChange({ passkey: checked })}
            />
          </div>
        </div>
      </div>

      {/* Connect */}
      <div className="sidebar-item p-5 border-b border-white/5 space-y-4">
        <h3 className="text-xs font-medium text-white">Connect</h3>
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#1C1C1E] flex items-center justify-center text-gray-400 border border-white/5">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs text-gray-300">External Wallets</span>
          </div>
          <Toggle
            id="toggle-external"
            checked={config.external}
            onChange={(checked) => onConfigChange({ external: checked })}
          />
        </div>
      </div>

      {/* Configuration */}
      <div className="sidebar-item p-5 border-b border-white/5 space-y-4">
        <h3 className="text-xs font-medium text-white">Configuration</h3>

        <div className="relative">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="w-full flex items-center gap-3 p-3 bg-[#1C1C1E] border border-white/10 rounded-lg hover:border-white/20 transition-all text-left group active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">
                Smart Account
              </div>
              <div className="text-xs font-medium text-white group-hover:text-purple-300 transition-colors">
                {config.accountType === 'eip7702' && 'Smart EOA (EIP-7702)'}
                {config.accountType === 'erc4337' && 'ERC-4337 Account'}
                {config.accountType === 'safe' && 'Safe Account'}
                {config.accountType === 'argent' && 'Argent Account'}
              </div>
            </div>
            <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`} />
          </button>
          {showAccountMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1C1C1E] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
              {(['eip7702', 'erc4337', 'safe', 'argent'] as AccountType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    onConfigChange({ accountType: type })
                    setShowAccountMenu(false)
                    onToast(`Account type changed to ${type.toUpperCase()}`)
                  }}
                  className={`w-full px-3 py-2 text-left text-xs hover:bg-white/5 transition-colors ${
                    config.accountType === type ? 'bg-purple-500/10 text-purple-300' : 'text-gray-300'
                  }`}
                >
                  {type === 'eip7702' && 'Smart EOA (EIP-7702)'}
                  {type === 'erc4337' && 'ERC-4337 Account'}
                  {type === 'safe' && 'Safe Account'}
                  {type === 'argent' && 'Argent Account'}
                </button>
              ))}
            </div>
          )}
        </div>

        {config.accountType === 'erc4337' && (
          <div className="space-y-2 p-3 bg-[#1C1C1E]/50 border border-white/5 rounded-lg">
            <div className="text-[10px] text-gray-400">EntryPoint Address</div>
            <input
              type="text"
              value={config.entryPoint}
              onChange={(e) => onConfigChange({ entryPoint: e.target.value })}
              className="w-full bg-[#0A0A0B] border border-white/10 rounded px-2 py-1.5 text-xs text-white font-mono"
              placeholder="0x0000..."
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-gray-400">Paymaster</span>
              <Toggle
                id="toggle-paymaster"
                checked={config.paymaster}
                onChange={(checked) => onConfigChange({ paymaster: checked })}
                size="sm"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
              Networks
            </span>
            <div
              className="flex items-center gap-1.5 cursor-pointer hover:text-white"
              onClick={() => onToast('Switched to Mainnet')}
            >
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              <span className="text-[10px] text-gray-500">Testnets</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Hyperion', 'Base', 'Mantle'].map((network) => (
              <button
                key={network}
                onClick={() => {
                  const networks = config.networks.includes(network)
                    ? config.networks.filter((n) => n !== network)
                    : [...config.networks, network]
                  onConfigChange({ networks })
                }}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-all active:scale-95 ${
                  config.networks.includes(network)
                    ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                    : 'bg-[#1C1C1E] border border-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {network}
              </button>
            ))}
            <button
              onClick={() => onToast('Add Network Modal Opened')}
              className="px-2 py-1 rounded bg-[#1C1C1E] border border-white/10 text-[10px] font-medium text-gray-300 hover:text-white hover:border-white/30 transition-all active:scale-95"
            >
              + Add
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <button
            onClick={() => setShowSessionsAccordion(!showSessionsAccordion)}
            className="w-full flex items-center justify-between text-[10px] uppercase font-semibold text-gray-500 tracking-wider hover:text-white transition-colors"
          >
            <span>Sessions & Limits</span>
            <ChevronRight className={`w-3 h-3 transition-transform ${showSessionsAccordion ? 'rotate-90' : ''}`} />
          </button>

          {showSessionsAccordion && (
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowPersistenceMenu(!showPersistenceMenu)}
                    className="w-full bg-[#1C1C1E] border border-white/10 rounded px-2 py-1.5 hover:bg-white/5 text-left transition-colors active:scale-[0.98]"
                  >
                    <div className="text-[9px] text-gray-500">Persistence</div>
                    <div className="text-[10px] text-white flex items-center gap-1">
                      {config.persistence === 'device' && 'Device'}
                      {config.persistence === 'session' && 'Session'}
                      {config.persistence === 'localStorage' && 'LocalStorage'}
                      <ChevronDown className="w-2 h-2 ml-auto" />
                    </div>
                  </button>
                  {showPersistenceMenu && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1C1C1E] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                      {(['device', 'session', 'localStorage'] as PersistenceType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            onConfigChange({ persistence: type })
                            setShowPersistenceMenu(false)
                          }}
                          className={`w-full px-2 py-1.5 text-left text-[10px] hover:bg-white/5 transition-colors ${
                            config.persistence === type ? 'bg-purple-500/10 text-purple-300' : 'text-gray-300'
                          }`}
                        >
                          {type === 'device' && 'Device'}
                          {type === 'session' && 'Session'}
                          {type === 'localStorage' && 'LocalStorage'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowDurationMenu(!showDurationMenu)}
                    className="w-full bg-[#1C1C1E] border border-white/10 rounded px-2 py-1.5 hover:bg-white/5 text-left transition-colors active:scale-[0.98]"
                  >
                    <div className="text-[9px] text-gray-500">Duration</div>
                    <div className="text-[10px] text-white flex items-center gap-1">
                      {config.duration === '1hour' && '1 Hour'}
                      {config.duration === '24hours' && '24 Hours'}
                      {config.duration === '7days' && '7 Days'}
                      {config.duration === '30days' && '30 Days'}
                      {config.duration === 'permanent' && 'Permanent'}
                      <ChevronDown className="w-2 h-2 ml-auto" />
                    </div>
                  </button>
                  {showDurationMenu && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1C1C1E] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                      {(['1hour', '24hours', '7days', '30days', 'permanent'] as DurationType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            onConfigChange({ duration: type })
                            setShowDurationMenu(false)
                          }}
                          className={`w-full px-2 py-1.5 text-left text-[10px] hover:bg-white/5 transition-colors ${
                            config.duration === type ? 'bg-purple-500/10 text-purple-300' : 'text-gray-300'
                          }`}
                        >
                          {type === '1hour' && '1 Hour'}
                          {type === '24hours' && '24 Hours'}
                          {type === '7days' && '7 Days'}
                          {type === '30days' && '30 Days'}
                          {type === 'permanent' && 'Permanent'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-gray-300">Spending Limits</span>
                <Toggle
                  id="toggle-limits"
                  checked={config.limits}
                  onChange={(checked) => onConfigChange({ limits: checked })}
                  size="sm"
                />
              </div>

              {config.limits && (
                <div className="space-y-2 p-2 bg-[#1C1C1E]/50 border border-white/5 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Limit Amount</span>
                    <input
                      type="number"
                      value={config.spendingLimit}
                      onChange={(e) => onConfigChange({ spendingLimit: Number(e.target.value) })}
                      className="w-20 bg-[#0A0A0B] border border-white/10 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Currency</span>
                    <select
                      value={config.spendingLimitCurrency}
                      onChange={(e) => onConfigChange({ spendingLimitCurrency: e.target.value })}
                      className="bg-[#0A0A0B] border border-white/10 rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="USD">USD</option>
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Component Order */}
      <div className="sidebar-item p-5 border-b border-white/5 space-y-4">
        <h3 className="text-xs font-medium text-white">Component Order</h3>
        <p className="text-[10px] text-gray-500">
          Drag components in preview to reorder. Only enabled components are shown.
        </p>
        <div className="space-y-2">
          {config.componentOrder.map((type, index) => (
            <div
              key={type}
              className="flex items-center justify-between p-2 bg-[#1C1C1E] border border-white/10 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-[10px] text-purple-300 font-medium">
                  {index + 1}
                </div>
                <span className="text-xs text-gray-300 capitalize">{type}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${previewBlocks[type] ? 'bg-green-500' : 'bg-gray-600'}`} />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            onConfigChange({ componentOrder: ['email', 'sms', 'social', 'passkey', 'external'] })
            onToast('Component order reset to default')
          }}
          className="w-full py-1.5 border border-dashed border-white/20 text-[10px] text-gray-400 rounded hover:text-white hover:border-white/40 transition-colors active:bg-white/5"
        >
          Reset to Default Order
        </button>
      </div>

      {/* Branding */}
      <div className="sidebar-item p-5 border-b border-white/5 space-y-4">
        <h3 className="text-xs font-medium text-white">Branding</h3>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">Theme</span>
          <div className="flex bg-[#1C1C1E] p-0.5 rounded-md border border-white/10">
            <button
              onClick={() => {
                onConfigChange({ theme: 'dark' })
                onToast('Dark Theme Applied')
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                config.theme === 'dark'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => {
                onConfigChange({ theme: 'light' })
                onToast('Light Theme Applied (Preview Only)')
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                config.theme === 'light'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              Light
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">Primary Color</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-500">{config.primaryColor}</span>
            <ColorPicker
              value={config.primaryColor}
              onChange={(color) => onConfigChange({ primaryColor: color })}
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onConfigChange({ advancedOptions: !config.advancedOptions })}
            className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-white transition-colors w-full text-left"
          >
            <ChevronRight
              className={`w-3 h-3 transition-transform duration-200 ${
                config.advancedOptions ? 'rotate-90' : ''
              }`}
            />{' '}
            Show advanced options
          </button>

          {config.advancedOptions && (
            <div className="space-y-4 pt-4 border-t border-white/5 mt-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400">Corner Radius</span>
                  <span className="text-[10px] text-gray-500 font-mono">{config.cornerRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={config.cornerRadius}
                  onChange={(e) => onConfigChange({ cornerRadius: Number(e.target.value) })}
                  className="w-full h-1 bg-[#1C1C1E] rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Font Family</span>
                <select
                  value={config.fontFamily}
                  onChange={(e) => onConfigChange({ fontFamily: e.target.value as FontFamily })}
                  className="flex items-center gap-1 text-[10px] bg-[#1C1C1E] border border-white/10 px-2 py-1 rounded text-gray-300"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-gray-400 block">Custom Logo</span>
                <label className="w-full border border-dashed border-white/10 bg-[#1C1C1E]/50 h-16 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          onConfigChange({ customLogo: event.target?.result as string })
                          onToast('Logo uploaded successfully')
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="hidden"
                  />
                  {config.customLogo ? (
                    <img src={config.customLogo} alt="Logo" className="h-10 w-auto" />
                  ) : (
                    <>
                      <Upload className="w-3 h-3 text-gray-500 group-hover:text-purple-400" />
                      <span className="text-[9px] text-gray-600 group-hover:text-purple-400">
                        Drag & drop or browse
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export */}
      <div className="p-5 space-y-3">
        <button
          onClick={(e) => {
            anime({
              targets: e.currentTarget,
              scale: [1, 0.95, 1],
              duration: 300,
              easing: 'easeOutElastic(1, .8)',
            })
            onCopyConfig()
          }}
          className="w-full flex items-center justify-center gap-2 bg-[#1C1C1E] hover:bg-[#252528] text-white py-2 rounded-lg border border-white/10 text-xs font-medium transition-colors"
        >
          <FileJson className="w-3.5 h-3.5 text-gray-400" /> Copy Config JSON
        </button>
        <button
          onClick={(e) => {
            anime({
              targets: e.currentTarget,
              scale: [1, 0.95, 1],
              duration: 300,
              easing: 'easeOutElastic(1, .8)',
            })
            onCopyReact()
          }}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg hover:bg-gray-200 text-xs font-medium transition-colors"
        >
          <Code2 className="w-3.5 h-3.5" /> Copy React Snippet
        </button>
      </div>

      <div className="h-10"></div>
    </aside>
  )
}

