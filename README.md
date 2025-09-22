

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
