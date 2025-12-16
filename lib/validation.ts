import { WalletConfig } from './types'

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateConfig(config: Partial<WalletConfig>): ValidationResult {
  const errors: string[] = []

  if (config.primaryColor !== undefined) {
    if (!/^#[0-9A-F]{6}$/i.test(config.primaryColor)) {
      errors.push('Primary color must be a valid hex color (e.g., #9333EA)')
    }
  }

  if (config.cornerRadius !== undefined) {
    if (config.cornerRadius < 0 || config.cornerRadius > 50) {
      errors.push('Corner radius must be between 0 and 50 pixels')
    }
  }

  if (config.spendingLimit !== undefined) {
    if (config.spendingLimit < 0) {
      errors.push('Spending limit cannot be negative')
    }
    if (config.spendingLimit > 1000000) {
      errors.push('Spending limit cannot exceed 1,000,000')
    }
  }

  if (config.entryPoint !== undefined && config.accountType === 'erc4337') {
    if (!/^0x[a-fA-F0-9]{40}$/.test(config.entryPoint)) {
      errors.push('Entry point must be a valid Ethereum address')
    }
  }

  if (config.networks !== undefined) {
    if (config.networks.length === 0) {
      errors.push('At least one network must be selected')
    }
  }

  if (config.componentOrder !== undefined) {
    const uniqueOrder = new Set(config.componentOrder)
    if (uniqueOrder.size !== config.componentOrder.length) {
      errors.push('Component order contains duplicates')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

