# 🛡️ ShieldID-Solver

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

> **Advanced Browser Fingerprint Generator and Anti-Bot Detection System Analyzer**

A sophisticated Node.js application designed for security research and testing purposes, capable of generating realistic browser fingerprints to analyze and test anti-bot detection systems.

## ⚠️ Important Legal Notice

**FOR SECURITY RESEARCH AND EDUCATIONAL PURPOSES ONLY**

This tool is designed for legitimate security research, penetration testing, and educational purposes. Users must:

- ✅ Ensure compliance with all applicable laws and regulations
- ✅ Respect website terms of service and robots.txt files
- ✅ Use only with explicit permission on systems you own or are authorized to test
- ✅ Consider the ethical implications of bypassing security measures
- ❌ Never use for malicious purposes, fraud, or unauthorized access

## 🚀 Features

### 🔬 Advanced Fingerprinting
- **Canvas Fingerprinting** - Generate unique canvas signatures
- **WebGL Fingerprinting** - Hardware-based graphics fingerprinting
- **Audio Context Fingerprinting** - Audio processing signatures
- **Hardware Simulation** - CPU, GPU, and memory characteristics
- **Network Fingerprinting** - Connection type and timing simulation

### 🛡️ Anti-Detection Analysis
- **Bot Detection Testing** - Analyze bot detection mechanisms
- **Proxy Detection Analysis** - Test proxy and VPN detection
- **Browser Spoofing Detection** - Evaluate consistency checks
- **Fingerprint Entropy Analysis** - Measure uniqueness and detectability

### 📊 Comprehensive Logging & Analysis
- **Real-time Analysis** - Live detection results and scoring
- **Detailed Reporting** - JSON-formatted analysis reports
- **Performance Metrics** - Request timing and success rates
- **Critical Factor Identification** - Pinpoint detection triggers

### ⚙️ Advanced Configuration
- **Proxy Support** - HTTP/HTTPS proxy integration
- **Request Throttling** - Configurable delays and timeouts
- **Template System** - Customizable fingerprint templates
- **Batch Processing** - Automated testing sequences

## 📁 Project Structure

```
ShieldID-Solver/
├── 📂 src/                          # Core application code
│   ├── 🏗️ shieldid_solver.js        # Main application entry point
│   └── 🔧 utils.js                  # Utility functions and helpers
├── 📂 lib/                          # Core libraries and modules
│   ├── 🔐 encryption.js             # Encryption and encoding utilities
│   ├── 🎭 fingerprint_generator.js   # Browser fingerprint generation
│   ├── 🛡️ shield_fpc.js             # Shield-specific functions
│   └── 🔑 uuidv1cs.js               # UUID generation utilities
├── 📂 config/                       # Configuration files
│   └── 📋 fp_template.json          # Fingerprint templates (sanitized)
├── 📂 logs/                         # Analysis results and logs
├── 📂 scripts/                      # Utility scripts
├── 📄 package.json                  # Project dependencies and scripts
└── 📖 README.md                     # This file
```

## 🛠️ Installation

### Prerequisites
- **Node.js** >= 14.0.0
- **npm** or **yarn**
- **Git** (for cloning)

### Quick Setup
```bash
# Clone the repository
git clone https://github.com/your-username/shieldid-solver.git
cd shieldid-solver

# Install dependencies
npm install

# Setup environment
npm run setup

# Run the application
npm start
```

### Optional Dependencies
```bash
# For enhanced canvas fingerprinting (optional)
npm install canvas
```

## 📖 Usage

### Basic Usage
```bash
# Start the main application
npm start

# Development mode with auto-reload
npm run dev

# Generate a sample fingerprint
npm run generate

# Test fingerprint generation
npm run test-fingerprint
```

### Advanced Configuration

#### Request Configuration
```json
{
  "request": {
    "delayMs": 10,
    "timeout": 30000,
    "retries": 3,
    "saveThreshold": 115
  }
}
```

#### Proxy Configuration
```json
{
  "proxy": {
    "enabled": true,
    "url": "http://proxy-server:port"
  }
}
```

### Command Line Options

| Command | Description |
|---------|-------------|
| `npm start` | Run the main application |
| `npm run dev` | Development mode with nodemon |
| `npm test` | Run system tests |
| `npm run generate` | Generate sample fingerprint |
| `npm run test-fingerprint` | Test fingerprint components |
| `npm run test-encryption` | Test encryption functions |
| `npm run clean-logs` | Clean analysis log files |
| `npm run benchmark` | Run performance benchmarks |
| `npm run validate` | Validate fingerprint generation |

## 📊 Analysis Output

The application provides detailed analysis in a beautiful console interface:

```
┌─ 📊 Shield Analysis Results ──────────────────────────────────────────────┐
║  🟢 Device Score: 85                                                      ║
║  🔒 Shield ID: 7d489dd9ce19dd...                                         ║
║  📱 Session ID: 2ca1195079e510...                                        ║
╟────────────────────────────────────────────────────────────────────────────╢
║  🔍 Detection Analysis:                                                    ║
║     🤖 Bot Detection: No                                                   ║
║     🔄 Proxy Detection: No                                                ║
║     🛡️  Anti-Fingerprinting: Yes                                         ║
║     🎭 Browser Spoofed: No                                               ║
║     💻 Emulated: No                                                       ║
╚════════════════════════════════════════════════════════════════════════════╝
```

### Analysis Files
Results are automatically saved to `./logs/analysis_[score]_[timestamp].json`:

```json
{
  "score": 85,
  "timestamp": "2025-01-12T20:13:58.374Z",
  "fingerprint": { /* Complete fingerprint data */ },
  "shield_response": { /* API response data */ },
  "analysis": {
    "critical_factors": [
      "Anti-fingerprinting measures detected"
    ],
    "recommendations": [
      "Reduce fingerprint entropy",
      "Use more common device configurations"
    ]
  }
}
```

## 🔧 Configuration

### Environment Variables
```bash
# Optional environment configuration
NODE_ENV=development
LOG_LEVEL=info
SHIELD_ENDPOINT=https://api.shield-service.com
```

### Custom Templates
Modify `config/fp_template.json` to customize fingerprint generation:

```json
{
  "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "DISPLAY": "24|24|1920|1080|1920|1080|1920|1080",
  "GPU": "ANGLE (Intel, Intel(R) HD Graphics 630)...",
  "TIMEZONE": "America/New_York"
}
```
