# Filedgr NFT Viewer XApp

A React-based XApp for viewing Filedgr created vaults (NFTs) on the XRPL network through Xaman (formerly XUMM) wallet.

## Features

- View Filedgr created vaults (NFTs) across different XRPL networks (Mainnet, Testnet, Devnet)
- Automatic network detection based on Xaman wallet settings
- Interactive NFT grid with detailed view
- Support for XLS-20d NFT metadata standards
- IPFS integration for NFT media content
- Responsive design optimized for mobile devices

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Xaman Developer Account
- XRPL Account for testing

## Installation

1. Clone the repository:
```bash
git clone git@github.com:Filedgr/filedgr-xapp.git
cd filedgr-xapp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_XUMM_API_KEY=your_xumm_api_key
VITE_NFT_PAGINATION_LIMIT=8
```

4. Start the development server:
```bash
npm run dev
```

## Development with xAppBuilder

This project is designed to work with xAppBuilder for local development:

1. Install xAppBuilder from the app store for your platform
2. Configure your Xaman Developer Console with your Device ID
3. Use localtunnel or ngrok to expose your local server
4. Test your XApp directly in xAppBuilder

## Testing

```bash
npm run test
```

## Building for Production

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions about Filedgr's services, visit [Filedgr](https://filedgr.com).

## Acknowledgments

- XRPL Labs for the Xaman/XUMM SDK
- XRPL Foundation for the XRPL libraries