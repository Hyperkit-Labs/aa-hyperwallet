# Account Abstraction - Smart Wallet Builder

Build network-agnostic, gasless smart wallet infrastructure that works seamlessly across EVM, Solana, and SUI blockchains.

## Overview

Account Abstraction is a visual builder for smart wallet authentication systems. Configure authentication methods, network settings, and branding options through an intuitive interface. Preview your configuration in real-time and export ready-to-use React components or JSON configurations.

## Features

- **Multiple Authentication Methods** - Email, SMS, Social logins, and Passkey support
- **External Wallet Integration** - Connect MetaMask, Coinbase, WalletConnect, and Smart Wallets
- **Multi-Chain Support** - Configure networks including Hyperion, Base, Mantle, and more
- **Live Preview** - See your authentication UI update in real-time as you configure options
- **Code Generation** - Export React components or JSON configuration files
- **Responsive Design** - Preview on mobile, tablet, and desktop viewports
- **Customizable Branding** - Theme, colors, fonts, and logo customization
- **Session Management** - Configure persistence, duration, and spending limits

## Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm 8.0 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hyperkit-labs/aa-hyperwallet.git
   cd aa-hyperwallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Verify installation**
   Open http://localhost:3000 in your browser. You should see the Account Abstraction Smart Wallet Builder interface.

## Usage

### Basic Configuration

1. **Select a Preset**
   - Full Login + Wallets: All authentication methods enabled
   - Simple Login: Email and social only
   - Wallet-Only: External wallet connections only

2. **Configure Authentication**
   - Toggle Email, SMS, Social, and Passkey options
   - Enable or disable external wallet connections

3. **Set Networks**
   - Select target blockchain networks
   - Switch between testnet and mainnet modes

4. **Customize Branding**
   - Choose dark or light theme
   - Set primary color
   - Adjust advanced options (corner radius, fonts, logo)

5. **Preview and Export**
   - Switch between UI and Code preview modes
   - Test on different device sizes
   - Copy React component code or JSON configuration

### Example Configuration

```typescript
<SmartWalletAuth
  email={true}
  sms={false}
  social={true}
  passkey={true}
  wallets={{
    smartAccount: "eip7702",
    external: true,
    providers: ["smartWallet", "metamask", "coinbase"]
  }}
  networks={["hyperion", "base", "mantle"]}
  branding={{
    theme: "dark",
    primaryColor: "#9333EA",
    cornerRadius: "xl"
  }}
/>
```

## Project Structure

```
aa-hyperwallet/
├── app/
│   ├── globals.css          # Global styles and utilities
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page
├── components/
│   ├── Header.tsx           # Top navigation header
│   ├── Sidebar.tsx          # Configuration sidebar
│   ├── Preview.tsx          # Live preview component
│   ├── Toast.tsx            # Toast notification component
│   └── Toggle.tsx           # Toggle switch component
├── lib/
│   └── types.ts             # TypeScript type definitions
└── reference/
    └── demo/                # Original HTML demo reference
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **State Management**: React Hooks

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

This project follows clean code principles:
- Descriptive, intention-revealing names
- Single responsibility principle
- Consistent formatting with ESLint and Prettier
- TypeScript for type safety

## Contributing

We welcome contributions. To contribute:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and commit (`git commit -m 'Add amazing feature'`)
4. **Push to your branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE).

## Acknowledgments

Built for the Hyperkit ecosystem to simplify smart wallet development and deployment across multiple blockchain networks.
