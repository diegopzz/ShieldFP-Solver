/**
 * ShieldID Solver - Advanced Browser Fingerprint Generator and Shield Bypass System
 *
 * This system generates sophisticated browser fingerprints to test and analyze
 * anti-bot detection systems like Shield. It provides comprehensive fingerprint
 * simulation with real-time analysis and logging capabilities.
 *
 * @author ShieldID-Solver Team
 * @version 2.0.0
 * @license MIT
 */

const fs = require('fs');
const crypto = require('crypto');
const axios = require('axios');
const chalk = require('chalk');
const { HttpsProxyAgent } = require('https-proxy-agent');

// Import custom modules
const uuidv1cs = require('../lib/uuidv1cs');
const { getScoreColor, getBooleanColor, sleep, processShieldResponse, saveLowScoreResult, identifyCriticalFactors, generateRecommendations, initializeLogging, displayBanner, formatDate, displayRequestHeader, displayWarning, displayError, displaySuccess, displayInfo, displayShutdown } = require('./utils');
const encrypt = require('../lib/encryption');
const shield_fpc = require('../lib/shield_fpc');
const FingerprintGenerator = require('../lib/fingerprint_generator');

// Initialize components
const fingerprintGenerator = new FingerprintGenerator();

// ==================== CONFIGURATION ====================

const CONFIG = {
    // Shield API Configuration
    shield: {
        endpoint: 'https://a65d82f32a95ed2f8fae8e20563001365d8a887b.csftr.com/shield-fp/v1/api/web',
        siteId: 'a65d82f32a95ed2f8fae8e20563001365d8a887b',
        version: 'SHIELD 1.5.154',
        sourceUrl: 'https://example/de/men/signup/create-account/verification-payment'
    },

    // Request Configuration
    request: {
        delayMs: 10,                    // Delay between requests
        timeout: 30000,                 // Request timeout
        retries: 3,                     // Retry attempts
        saveThreshold: 115              // Save results below this score
    },

    // Proxy Configuration (optional)
    proxy: {
        enabled: false,
        url: ''
    },

    // Headers Configuration
    headers: {
        'accept': '*/*',
        'accept-language': 'de-DE',
        'content-type': 'text/plain;charset=UTF-8',
        'dnt': '1',
        'origin': 'https://onthatass.com',
        'priority': 'u=1, i',
        'referer': 'https://onthatass.com/',
        'sec-ch-ua': '"Google Chrome";v="132", "Chromium";v="132", "Not_A Brand";v="8"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-platform-version': '"24.0.0.0"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'
    }
};

// ==================== UTILITY FUNCTIONS ====================

// ==================== FINGERPRINT GENERATION ====================

/**
 * Generate comprehensive browser fingerprint
 * @param {string} shieldFpcCookie - Shield FPC cookie value
 * @param {string} sessionId - Session identifier
 * @returns {Object} Complete fingerprint object
 */
function generateFingerprint(shieldFpcCookie, sessionId) {
    const now = new Date();
    const network = fingerprintGenerator.generateNetwork();
    const gpuInfo = fingerprintGenerator.generateGPU();

    // Load base fingerprint template
    let fingerprint;
    try {
        fingerprint = JSON.parse(fs.readFileSync('./config/fp_template.json', 'utf8'));
    } catch (error) {
        displayWarning('Template not found, using default structure');
        fingerprint = {};
    }

    // Core System Information
    fingerprint.SITE_ID = CONFIG.shield.siteId;
    fingerprint.SESSION_ID = sessionId;
    fingerprint.TEST = false;
    fingerprint.TYPE = "JS";
    fingerprint.VER = CONFIG.shield.version;
    fingerprint.SR = CONFIG.shield.sourceUrl;
    fingerprint.USER_AGENT = CONFIG.headers['user-agent'];
    fingerprint.PLATFORM = "Win32";

    // Date and Time Information
    fingerprint.DATE = formatDate(now);
    fingerprint.DATE_UTC = now.toUTCString();
    fingerprint.DATE_LOCALE = now.toLocaleString();
    fingerprint.GMT = String(now.getTimezoneOffset() / 60);

    // Display and Resolution
    fingerprint.DISPLAY = fingerprintGenerator.generateDisplay();

    // Plugin Information
    fingerprint.PLUGINS = [
        'internal-pdf-viewer(Chrome PDF Viewer)',
        Math.random() > 0.5 ? 'Chrome PDF Plugin' : '',
        Math.random() > 0.5 ? 'Native Client' : '',
        Math.random() > 0.5 ? 'Chromium PDF Viewer' : '',
        Math.random() > 0.5 ? 'Microsoft Edge PDF Viewer' : '',
        Math.random() > 0.5 ? 'PDF Viewer' : '',
        Math.random() > 0.5 ? 'WebKit built-in PDF' : '',
        Math.random() > 0.5 ? 'Adobe Acrobat' : '',
        Math.random() > 0.5 ? 'Shockwave Flash' : '',
        Math.random() > 0.5 ? 'IcedTea-Web Plugin' : '',
        Math.random() > 0.5 ? 'QuickTime Plug-in' : '',
        Math.random() > 0.5 ? 'Windows Media Player Plug-in' : '',
        Math.random() > 0.5 ? 'RealPlayer Version Plugin' : ''
    ].filter(Boolean).join('|');

    // Canvas Fingerprinting - generate realistic canvas data
    fingerprint.CANVAS = fingerprintGenerator.generateCanvasHash();
    fingerprint.CANVAS_WINDING = 1;

    // Canvas pixel data for additional verification
    fingerprint.CANVAS_PIXEL = {
        "original": [Math.floor(Math.random() * 20000)],
        "collected": [Math.floor(Math.random() * 20000)]
    };

    // ==================== HARDWARE FINGERPRINTING ====================

    // GPU and Graphics Information
    fingerprint.GPU = gpuInfo.GPU;
    fingerprint.GPU_VENDOR = gpuInfo.GPU_VENDOR;
    fingerprint.CPU = Math.floor(Math.random() * (68 - 2 + 1)) + 2; // 2-68 cores

    // Audio and Visual Fingerprints - ensure audio is not empty
    fingerprint.AUDIO = fingerprintGenerator.generateAudioHash();
    fingerprint.FONTS = fingerprintGenerator.generateFonts();
    fingerprint.CLIENTRECTS = fingerprintGenerator.generateClientRects();
    fingerprint.GLYPHS = fingerprintGenerator.generateGlyphs();
    fingerprint.WEBGL = fingerprintGenerator.generateRandomMD5();

    // ==================== SESSION AND COOKIE DATA ====================

    // Cookie and Session Management
    fingerprint.COK = shieldFpcCookie;
    fingerprint.RN = shieldFpcCookie;

    // Language Configuration - must match accept-language header 'de-DE'
    fingerprint.LANG = `[\"de\"]`;

    // Additional browser consistency fields
    fingerprint.B17 = {
        "l": "de",
        "ul": "",
        "bl": "",
        "sl": "",
        "ls": ["de"]
    };

    // ==================== NETWORK INFORMATION ====================

    // Network Connection Details - match template exactly
    fingerprint.CONNECTION = network.type;
    fingerprint.CONNECTION_DOWNLINK = network.downlink;
    fingerprint.CONNECTION_DOWNLINKMAX = -1;
    fingerprint.CONNECTION_RTT = network.rtt;
    fingerprint.CONNECTION_TYPE = "";
    fingerprint.CONNECTION_SAVEDATA = 0;
    fingerprint.TIMEZONE = fingerprintGenerator.generateTimezone();

    // ==================== SYSTEM AND CRYPTOGRAPHIC VALUES ====================

    // Battery and Power Management
    fingerprint.BATTERY_LEVEL = 1;
    fingerprint.BATTERY_CHARGING = Math.random() > 0.5 ? 1 : 0;

    // Mathematical Calculations and Random Values
    fingerprint.MATH = `${Math.random() * 20000 - 10000}|${Math.random() * 4 - 2}`;
    fingerprint.WINDOW_CS = fingerprintGenerator.generateChecksum();
    fingerprint.RN = Math.random().toFixed(16);

    // Error handling for more natural appearance - match template format
    fingerprint.ERR = "{}";
    fingerprint.GEN_ERROR = "ResizeObserver loop limit exceeded|TypeError: Cannot read properties of null (reading 'offsetHeight')";

    // Additional Chrome-specific fields for anti-spoofing
    fingerprint.CANVAS_TODATAURL = "function toDataURL() { [native code] }";
    fingerprint.AUDIO_GETCHANNELDATA = "function getChannelData() { [native code] }";
    fingerprint.SETATTRIBUTE = "function setAttribute() { [native code] }";
    fingerprint.OFFSETWIDTH = "function get offsetWidth() { [native code] }";

    // User-Agent version extraction for anti-spoofing (B20)
    fingerprint.B20 = "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36";

    // eval function signature
    fingerprint.B19 = "function eval() { [native code] }";
    fingerprint.B18 = "1";

    // Touch and Orientation
    fingerprint.ORI = -1;
    fingerprint.ORI_PROP = false;
    fingerprint.TCH = 0;
    fingerprint.MAX_TOUCH_POINTS = 0;

    // Browser Detection Evasion
    fingerprint.NIGHTMARE_JS = false;
    fingerprint.PHANTOM_JS = [false, false, false];
    fingerprint.WEBDRIVER = false;
    fingerprint.PERMISSION = false;
    fingerprint.DONOTTRACK = 1;

    // Additional Fingerprinting Resistance
    fingerprint.PRIVATE = false; // Setting to true reduces score by 10 points

    // User Agent Data (UAD) - must match User-Agent string to avoid spoofing detection
    fingerprint.UAD = {
        "ual": {
            "brands": [
                {
                    "brand": "Google Chrome",
                    "version": "132"
                },
                {
                    "brand": "Chromium",
                    "version": "132"
                },
                {
                    "brand": "Not_A Brand",
                    "version": "8"
                }
            ],
            "mobile": false,
            "platform": "Windows"
        },
        "ualerr": "",
        "uah": {
            "architecture": "x86",
            "bitness": "64",
            "brands": [
                {
                    "brand": "Google Chrome",
                    "version": "132"
                },
                {
                    "brand": "Chromium",
                    "version": "132"
                },
                {
                    "brand": "Not_A Brand",
                    "version": "8"
                }
            ],
            "fullVersionList": [
                {
                    "brand": "Google Chrome",
                    "version": "132.0.0.0"
                },
                {
                    "brand": "Chromium",
                    "version": "132.0.0.0"
                },
                {
                    "brand": "Not_A Brand",
                    "version": "8.0.0.0"
                }
            ],
            "mobile": false,
            "model": "",
            "platform": "Windows",
            "platformVersion": "19.0.0.0",
            "uaFullVersion": "132.0.0.0",
            "wow64": false
        },
        "uaherr": ""
    };

    // WebRTC data for Chrome consistency
    fingerprint.WR = {
        "rc_res": {
            "id": Math.random().toString(36).substring(2, 15),
            "timestamp": Date.now(),
            "type": "remote-candidate",
            "address": "192.168.1." + Math.floor(Math.random() * 254 + 1),
            "candidateType": "host",
            "foundation": Math.floor(Math.random() * 2000000000).toString(),
            "ip": "192.168.1." + Math.floor(Math.random() * 254 + 1),
            "isRemote": false,
            "port": Math.floor(Math.random() * 65535),
            "priority": Math.floor(Math.random() * 1000000000),
            "protocol": "udp",
            "transportId": "T01",
            "usernameFragment": Math.random().toString(36).substring(2, 6)
        },
        "rc_err": ""
    };

    // Fix WR_2 with proper WebRTC candidate data
    fingerprint.WR_2 = {
        "r": [
            {
                "candidate": `candidate:209961847 1 udp 2113937151 ${Math.random().toString(36).substring(2, 8)}-${Math.random().toString(36).substring(2, 8)}.local 51668 typ host generation 0 ufrag ${Math.random().toString(36).substring(2, 6)} network-cost 999`,
                "sdpMid": "0",
                "sdpMLineIndex": 0,
                "usernameFragment": Math.random().toString(36).substring(2, 6)
            }
        ],
        "i": [`192.168.1.${Math.floor(Math.random() * 254 + 1)}`],
        "ix": [
            {
                "type": "srflx",
                "address": `192.168.1.${Math.floor(Math.random() * 254 + 1)}`
            }
        ],
        "e": "",
        "t": Math.random() * 2000
    };

    // Add missing critical browser test fields from template
    fingerprint.LSTS = Date.now();

    fingerprint.B1 = {
        "v1": 0.09999999776482582 + Math.random() * 0.00000001,
        "v2": 0.10000000149011612 + Math.random() * 0.00000001,
        "e": ""
    };

    fingerprint.B2 = "";
    fingerprint.B3 = "";

    fingerprint.B4 = {
        "any-hover": "",
        "any-pointer": "fine",
        "color-gamut": "srgb",
        "min-color-index": "68719476736",
        "color": "8",
        "resolution": "",
        "forced-colors": "",
        "inverted-colors": "",
        "display-mode": "browser",
        "overflow-block": "scroll",
        "overflow-inline": "scroll",
        "update": "fast",
        "scripting": "enabled",
        "grid": "0",
        "scan": "",
        "prefers-color-scheme": "light",
        "prefers-contrast-scheme": "",
        "prefers-reduced-motion": "no-preference",
        "prefers-reduced-transparency": "no-preference"
    };

    fingerprint.B47 = {
        "d": Math.random() * 30000 + 15000,
        "st": Math.random() * 40000 + 20000,
        "en": Math.random() * 50000 + 25000,
        "to": Date.now(),
        "e": "",
        "dhi": "false",
        "dvs": "visible"
    };

    fingerprint.B48 = {
        "oh": 1080,
        "ow": 1920,
        "ih": 959,
        "iw": 619,
        "pb": "function bind() { [native code] }",
        "to": -60,
        "da": {
            "ss": 1,
            "ls": 1,
            "id": 1,
            "od": 0
        },
        "bi": 0,
        "vn": "Google Inc.",
        "ce": false,
        "ts": false,
        "ld": false,
        "pt": false,
        "pl": false,
        "ed": "function EyeDropper() { [native code] }",
        "ad": "function AudioData() { [native code] }",
        "ws": "function WritableStreamDefaultController() { [native code] }",
        "cc": "function CSSCounterStyleRule() { [native code] }",
        "ud": "function NavigatorUAData() { [native code] }",
        "bd": "",
        "cm": false,
        "cd": false,
        "sd": "",
        "ve": "function getVideoPlaybackQuality() { [native code] }",
        "d": Math.random() * 10000
    };

    fingerprint.B50 = false;

    // Additional missing B fields from template
    fingerprint.B5 = -1;
    fingerprint.B6 = {
        "i": -1,
        "d": "",
        "e": ""
    };
    fingerprint.B7 = Math.floor(Math.random() * 100000000000);
    fingerprint.B8 = [
        {
            "deviceId": "",
            "kind": "audioinput",
            "label": "",
            "groupId": ""
        },
        {
            "deviceId": "",
            "kind": "videoinput",
            "label": "",
            "groupId": ""
        },
        {
            "deviceId": "",
            "kind": "audiooutput",
            "label": "",
            "groupId": ""
        }
    ];
    fingerprint.B10 = {
        "ancestorOrigins": {},
        "href": "https://onthatass.com/de/men/signup/create-account/verification-payment",
        "origin": "https://onthatass.com",
        "protocol": "https:",
        "host": "onthatass.com",
        "hostname": "onthatass.com",
        "port": "",
        "pathname": "/de/men/signup/create-account/verification-payment",
        "search": "",
        "hash": ""
    };
    fingerprint.B11 = {
        "w": [],
        "d": [],
        "e": ""
    };
    fingerprint.B12 = ["0"];
    fingerprint.B13 = [
        "__uspapiLocator",
        "createElementOrig",
        "createElement",
        "braintree-hosted-field-number",
        "braintree-hosted-field-expirationDate",
        "braintree-hosted-field-cvv",
        "braintree-hosted-field-cardholderName",
        "dispatch_742sc711f5eb84134a78468b49ba64491",
        "__detect_close_uid_61d93e8579_mtk6mtm6ntq__"
    ];
    fingerprint.B14 = [
        "songbirdLoader",
        "Cardinal",
        "executeFPRoutine",
        "a0_0x2a18",
        "shieldGetParams",
        "shieldRunFP",
        "a0_0x5dac",
        "getDeviceResult",
        "uuidv1cs",
        "i",
        "asdasdas"
    ];
    fingerprint.B15 = ["lang"];
    fingerprint.B16 = -1;
    fingerprint.B21 = 0;
    fingerprint.B22 = -1;
    fingerprint.B23 = {
        "sbt": "function",
        "sblt": "function",
        "e": ""
    };
    fingerprint.B24 = [
        "[object External]",
        {}
    ];
    fingerprint.B25 = "";
    fingerprint.B26 = "function close() { [native code] }";
    fingerprint.B27 = {
        "0": false,
        "1": false,
        "2": false
    };
    fingerprint.B28 = {
        "0": false,
        "1": true,
        "2": false
    };
    fingerprint.B29 = {
        "0": true,
        "1": true,
        "2": true,
        "3": true,
        "4": false,
        "5": true,
        "6": true
    };
    fingerprint.B30 = {
        "0": true,
        "1": true,
        "2": true,
        "3": true
    };
    fingerprint.B31 = {
        "0": true,
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true,
        "6": true
    };
    fingerprint.B32 = {
        "0": false,
        "1": false,
        "2": false,
        "3": false
    };
    fingerprint.B33 = {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false
    };
    fingerprint.B34 = {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    };
    fingerprint.B35 = false;
    fingerprint.B36 = {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    };
    fingerprint.B37 = {
        "v": -3,
        "e": "",
        "psc": false,
        "psm": []
    };
    fingerprint.B38 = -3;
    fingerprint.B39 = true;
    fingerprint.B40 = true;
    fingerprint.B41 = 0;
    fingerprint.B43 = "3.0.8";
    fingerprint.B44 = "J";
    fingerprint.B45 = Math.floor(Math.random() * 1000000000000000);

    // Additional missing fields for browser consistency
    fingerprint.DM = 8;
    fingerprint.SW = 1;
    fingerprint.THE_FORKS = false;
    fingerprint.SOURCE_REF = "";
    fingerprint.WEBGL_MVD = "function Int32Array() { [native code] }";
    fingerprint.PRIVATE_INDICATORS = '{"detection_class":"C","detection_type":"SC"}';

    return fingerprint;
}

// ==================== REQUEST PROCESSING ====================




// ==================== MAIN EXECUTION LOOP ====================

/**
 * Execute single Shield API request with comprehensive fingerprint
 */
async function executeSingleRequest(shieldFpcCookie, sessionId) {
    try {

        // Generate comprehensive fingerprint
        const fingerprint = generateFingerprint(shieldFpcCookie, sessionId);

        // Encrypt fingerprint data
        const encryptedData = await encrypt.f17(JSON.stringify(fingerprint));

        // Configure request options
        const requestOptions = {
            method: 'POST',
            url: CONFIG.shield.endpoint,
            headers: {
                ...CONFIG.headers,
                'Cookie': `shield_FPC=${shieldFpcCookie}`
            },
            data: encryptedData,
            timeout: CONFIG.request.timeout
        };

        // Add proxy if configured
        if (CONFIG.proxy.enabled && CONFIG.proxy.url) {
            requestOptions.httpsAgent = new HttpsProxyAgent(CONFIG.proxy.url);
        }

        // Display request info
        // Cookie will be displayed with request header

        // Execute request
        const response = await axios(requestOptions);

        // Process and display results
        processShieldResponse(response, fingerprint,
            (score, fp, resp) => saveLowScoreResult(score, fp, resp),
            CONFIG.request.saveThreshold);

    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            displayError('Request timeout');
        } else if (error.response) {
            displayError(`HTTP Error: ${error.response.status} - ${error.response.statusText}`);
        } else {
            displayError('Network Error', error);
        }
    }
}

/**
 * Main continuous execution loop
 */
async function runContinuousLoop() {
    console.log(chalk.green.bold('\n┌─ 🚀 Starting Continuous Analysis ─────────────────────────────────────┐'));
    console.log(chalk.yellow(`│ ⏱️  Delay between requests: ${chalk.bold(CONFIG.request.delayMs + 'ms')}                                    │`));
    console.log(chalk.yellow(`│ 🎯 Saving results with score < ${chalk.bold(CONFIG.request.saveThreshold)}                                     │`));
    console.log(chalk.gray(`│ 📝 Press Ctrl+C to stop                                                      │`));
    console.log(chalk.green.bold('└─────────────────────────────────────────────────────────────────────────┘\n'));

    let requestCount = 0;

    while (true) {
        requestCount++;

        // Generate unique identifiers for this request
        const sessionId = uuidv1cs().replace(/-/g, "");
        const shieldFpcCookie = shield_fpc.generate_shield_fpc(32);

        displayRequestHeader(requestCount, shieldFpcCookie);

        await executeSingleRequest(shieldFpcCookie, sessionId);

        // Wait before next request
        await new Promise(resolve => setTimeout(resolve, CONFIG.request.delayMs));
    }
}

// ==================== STARTUP AND INITIALIZATION ====================

/**
 * Initialize and start the ShieldID Solver
 */
async function initialize() {
    try {
        // Display startup information
        displayBanner();

        // Initialize logging system
        initializeLogging();

        // Start the main loop
        await runContinuousLoop();

    } catch (error) {
        displayError('Fatal Error', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    displayShutdown();
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    displayError('Uncaught Exception', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    displayError('Unhandled Rejection', new Error(reason));
    process.exit(1);
});

// Export for testing and module usage
module.exports = {
    generateFingerprint,
    processShieldResponse,
    executeSingleRequest,
    CONFIG
};

// Start the application if run directly
if (require.main === module) {
    initialize();
}
