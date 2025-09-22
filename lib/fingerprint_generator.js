const crypto = require('crypto');

// Optional canvas dependency - gracefully handle missing dependency
let createCanvas;
try {
    createCanvas = require('canvas').createCanvas;
} catch (error) {
    console.warn('Warning: canvas module not installed. Canvas fingerprinting will use fallback values.');
    createCanvas = null;
}

/**
 * Comprehensive Fingerprint Generator
 * Generates various browser and device characteristics for testing purposes
 */
class FingerprintGenerator {
    constructor() {
        this.texts = [
            'zh-TW', 'ar-SA', 'hi-IN', 'ja-JP', 'ko-KR',
            'ru-RU', 'tr-TR', 'vi-VN', 'th-TH', 'id-ID'
        ];
    }

    // ==================== GPU AND HARDWARE ====================

    /**
     * Generate realistic GPU configuration
     * @returns {Object} GPU and GPU_VENDOR information
     */
    generateGPU() {
        const gpuConfigs = [
            // NVIDIA GPUs
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 4090 (0x00002684) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 4080 (0x00002682) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 Ti (0x00002671) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 (0x00002670) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 4060 Ti (0x00002654) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3090 Ti (0x00002507) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3090 (0x00002504) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Ti (0x00002508) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 (0x00002506) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 Ti (0x00002509) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 (0x00002503) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Ti (0x00002486) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 (0x00002487) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x00002184) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 Ti (0x00002182) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },
            { gpu: 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 (0x00002184) Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (NVIDIA)' },

            // AMD GPUs
            { gpu: 'ANGLE (AMD, AMD Radeon RX 7900 XTX Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 7900 XT Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 7800 XT Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 7700 XT Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 6950 XT Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 6900 XT Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 6800 XT Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 6800 Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 6700 XT Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },
            { gpu: 'ANGLE (AMD, AMD Radeon RX 6600 XT Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (AMD)' },

            // Intel GPUs
            { gpu: 'ANGLE (Intel, Intel(R) Arc A770 Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (Intel)' },
            { gpu: 'ANGLE (Intel, Intel(R) Arc A750 Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (Intel)' },
            { gpu: 'ANGLE (Intel, Intel(R) Arc A380 Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (Intel)' },
            { gpu: 'ANGLE (Intel, Intel(R) Iris Xe Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (Intel)' },
            { gpu: 'ANGLE (Intel, Intel(R) UHD Graphics 770 Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (Intel)' },
            { gpu: 'ANGLE (Intel, Intel(R) UHD Graphics 750 Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (Intel)' },
            { gpu: 'ANGLE (Intel, Intel(R) UHD Graphics 730 Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (Intel)' },
            { gpu: 'ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11)', vendor: 'Google Inc. (Intel)' }
        ];

        const selectedConfig = gpuConfigs[Math.floor(Math.random() * gpuConfigs.length)];
        return {
            GPU: selectedConfig.gpu,
            GPU_VENDOR: selectedConfig.vendor
        };
    }

    /**
     * Generate CPU core count
     * @returns {number} Random CPU core count between 2-68
     */
    generateCPU() {
        return Math.floor(Math.random() * (68 - 2 + 1)) + 2;
    }

    // ==================== AUDIO AND VISUAL ====================

    /**
     * Generate audio fingerprint hash
     * @returns {string} SHA1 hash of audio data
     */
    generateAudioHash() {
        try {
            // Create buffer for audio data
            const sampleRate = 44100;
            const length = sampleRate; // 1 second
            const buffer = new Float32Array(length);

            // Generate triangle wave at 10000Hz
            for (let i = 0; i < length; i++) {
                const t = i / sampleRate;
                buffer[i] = Math.abs((t * 10000) % 2 - 1) * 2 - 1;
            }

            // Add compression simulation matching original values
            const threshold = -50;
            const knee = 40;
            const ratio = 12;
            const reduction = -20;
            const attack = 0;
            const release = 0.25;

            for (let i = 0; i < length; i++) {
                if (buffer[i] > threshold) {
                    buffer[i] = threshold + (buffer[i] - threshold) / ratio;
                }
            }

            // Generate SHA1 hash
            const shaHash = crypto.createHash('sha1');
            for (let i = 0; i < buffer.length; i++) {
                shaHash.update(buffer[i].toString());
            }
            return shaHash.digest('hex');

        } catch (e) {
            return '';
        }
    }

    /**
     * Generate fonts list with random typos
     * @returns {string} Comma-separated font list
     */
    generateFonts() {
        const baseFonts = [
            'Arial', 'Arial Black', 'Arial Narrow', 'Calibri', 'Calibri Light',
            'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas',
            'Constantia', 'Corbel', 'Courier', 'Courier New', 'Ebrima',
            'Franklin Gothic Heavy', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi',
            'Georgia', 'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode',
            'MS Gothic', 'MS PGothic', 'MS Sans Serif', 'MS Serif', 'MS UI Gothic',
            'Malgun Gothic', 'Microsoft Himalaya', 'Microsoft JhengHei',
            'Microsoft Sans Serif', 'Microsoft YaHei', 'MingLiU-ExtB',
            'Mongolian Baiti', 'NSimSun', 'Palatino Linotype', 'Segoe Print',
            'Segoe Script', 'Segoe UI', 'Symbol', 'Tahoma', 'Times New Roman',
            'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings'
        ];

        const addTypos = (font) => {
            if (Math.random() < 0.3) {
                const chars = font.split('');
                const pos = Math.floor(Math.random() * chars.length);
                chars.splice(pos, 0, 'w'.repeat(Math.floor(Math.random() * 4) + 1));
                return chars.join('');
            }
            return font;
        };

        return baseFonts
            .map(font => addTypos(font))
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 20) + 30)
            .join(',');
    }

    /**
     * Generate client rectangles data
     * @returns {string} Client rect measurements with jitter
     */
    generateClientRects() {
        const jitter = () => (Math.random() * 10 - 5).toFixed(12);
        return `top:${26.920438766479492 + parseFloat(jitter())}|bottom:${74.9864330291748 + parseFloat(jitter())}|left:${92.77533721923828 + parseFloat(jitter())}|right:${229.00428009033203 + parseFloat(jitter())}|width:${136.22894287109375 + parseFloat(jitter())}|height:${48.06599426269531 + parseFloat(jitter())}|x:${92.77533721923828 + parseFloat(jitter())}|y:${26.920438766479492 + parseFloat(jitter())}`;
    }

    /**
     * Generate glyphs measurements
     * @returns {string} Comma-separated glyph measurements
     */
    generateGlyphs() {
        const measurements = [];
        for(let i = 0; i < 100; i++) {
            const width = Math.floor(Math.random() * 1000);
            const height = Math.floor(Math.random() * 500) + 1000;
            measurements.push(`${width}x${height}`);
        }
        return measurements.join(',');
    }

    /**
     * Generate canvas fingerprint
     * @returns {string} MD5 hash of canvas data
     */
    generateCanvas() {
        if (!createCanvas) {
            return '';
        }
        try {
            const canvas = createCanvas(300, 150);
            const ctx = canvas.getContext('2d');
            canvas.width = 300 + Math.floor(Math.random() * 20) - 10;
            canvas.height = 150 + Math.floor(Math.random() * 20) - 10;

            // Draw rectangles with variation
            ctx.beginPath();
            const rectVariation = Math.random() * 2;
            ctx.rect(0 + rectVariation, 0 + rectVariation, 10 - rectVariation, 10 - rectVariation);
            ctx.rect(2 + rectVariation, 2 + rectVariation, 6 - rectVariation, 6 - rectVariation);

            // Font settings
            const fontSettings = {
                size1: 30 + Math.floor(Math.random() * 4) - 2,
                size2: 20 + Math.floor(Math.random() * 3) - 1,
                size3: 50 + Math.floor(Math.random() * 6) - 3,
                family1: Math.random() > 0.5 ? 'no-real-font-meow' : 'Arial',
                family2: Math.random() > 0.5 ? 'sans-serif' : 'Arial'
            };

            const posVar = () => Math.floor(Math.random() * 5) - 2;

            // Draw colored rectangle
            ctx.fillStyle = '#f60' + (Math.floor(6060 + Math.random() * 90).toString(16));
            ctx.fillRect(125 + posVar(), 1 + posVar(), 62 + posVar(), 20 + posVar());

            // Draw three text layers
            ctx.font = `${fontSettings.size1}px ${fontSettings.family1}`;
            ctx.fillStyle = '#72b' + (177 + Math.floor(Math.random() * 10));
            ctx.fillText("xtquiz Cwmfjo rlyphsve dbankg", 5 + posVar(), 33 + posVar());

            ctx.font = `${fontSettings.size2}px Arial`;
            ctx.fillStyle = `rgba(102,${204 + Math.floor(Math.random() * 20)},0,${0.7 + Math.random() * 0.2})`;
            ctx.fillText("A BIG SMILING FACE =", 50 + posVar(), 66 + posVar());

            ctx.font = `${fontSettings.size3}px ${fontSettings.family2}`;
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("�\\_(�)_/�", 100 + posVar(), 120 + posVar());

            // Add noise pixels
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (Math.random() < 0.05) {
                    data[i] = Math.random() * 255;
                    data[i + 1] = Math.random() * 255;
                    data[i + 2] = Math.random() * 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);

            // Generate MD5 hash
            const buffer = canvas.toBuffer();
            return crypto.createHash('md5').update(buffer).digest('hex');
        } catch (e) {
            return '';
        }
    }

    /**
     * Generate canvas pixel data
     * @returns {Object} Original and collected pixel values
     */
    generateCanvasPixel() {
        if (!createCanvas) {
            return { original: [0], collected: [0] };
        }
        const canvas = createCanvas(300, 150);
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        const rectVariation = Math.random() * 2;
        ctx.rect(0 + rectVariation, 0 + rectVariation, 10 - rectVariation, 10 - rectVariation);
        ctx.rect(2 + rectVariation, 2 + rectVariation, 6 - rectVariation, 6 - rectVariation);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelValue = imageData.data[0];

        return {
            original: [pixelValue],
            collected: [pixelValue]
        };
    }

    /**
     * Generate WebGL fingerprint
     * @returns {string} MD5 hash of WebGL rendering
     */
    generateWebGL() {
        if (!createCanvas) {
            return '';
        }
        try {
            const canvas = createCanvas(256, 256);
            const gl = canvas.getContext('webgl', {
                preserveDrawingBuffer: true,
                antialias: false
            });

            if (!gl) return '';

            // Setup vertices and buffer
            const vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Create program and shaders
            const program = gl.createProgram();
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

            gl.shaderSource(vertexShader, 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}');
            gl.shaderSource(fragmentShader, 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}');

            // Compile and link
            gl.compileShader(vertexShader);
            gl.compileShader(fragmentShader);
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            // Set attributes and uniforms
            const vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex');
            const offsetUniform = gl.getUniformLocation(program, 'uniformOffset');
            gl.enableVertexAttribArray(vertexPosAttrib);
            gl.vertexAttribPointer(vertexPosAttrib, 3, gl.FLOAT, false, 0, 0);
            gl.uniform2f(offsetUniform, 1, 1);

            // Draw
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

            // Read pixels and add noise
            const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
            gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

            // Add 5% noise
            for (let i = 0; i < pixels.length; i += 4) {
                if (Math.random() < 0.05) {
                    pixels[i] = Math.random() * 255;
                    pixels[i + 1] = Math.random() * 255;
                    pixels[i + 2] = Math.random() * 255;
                }
            }

            return crypto.createHash('md5').update(Buffer.from(pixels)).digest('hex');
        } catch (e) {
            return '';
        }
    }

    // ==================== NETWORK AND SYSTEM ====================

    /**
     * Generate network information
     * @returns {Object} Network type, downlink, and RTT
     */
    generateNetwork() {
        const types = ['4g', 'wifi', '3g'];
        return {
            type: types[Math.floor(Math.random() * types.length)],
            downlink: Math.random() * 10 + 5,
            rtt: Math.floor(Math.random() * 200)
        };
    }

    /**
     * Generate display configuration
     * @returns {string} Display resolution string
     */
    generateDisplay() {
        const resolutions = [
            '24|24|1920|1080|1920|1080|1920|1080',
            '24|24|1366|768|1366|768|1366|768',
            '30|30|2560|1440|2560|1440|2560|1440'
        ];
        return resolutions[Math.floor(Math.random() * resolutions.length)];
    }

    /**
     * Generate user agent string
     * @returns {string} Random user agent
     */
    generateUserAgent() {
        const browsers = [
            `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 15) + 110}.0.0.0 Safari/537.36`,
            `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:${Math.floor(Math.random() * 50) + 90}.0) Gecko/20100101 Firefox/${Math.floor(Math.random() * 10) + 100}.0`,
            `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${Math.floor(Math.random() * 5) + 14}.0 Safari/605.1.15`
        ];
        return browsers[Math.floor(Math.random() * browsers.length)];
    }

    /**
     * Generate timezone
     * @returns {string} Timezone string
     */
    generateTimezone() {
        const zones = ['Europe/Paris'];
        return zones[Math.floor(Math.random() * zones.length)];
    }

    /**
     * Generate languages array
     * @returns {string} JSON string of languages
     */
    generateLanguages() {
        const languages = [
            'en', 'es', 'de', 'fr', 'it', 'pt', 'ru', 'ja',
            'ko', 'zh-CN', 'zh-TW', 'nl', 'pl', 'tr', 'ar'
        ];

        const shuffled = languages.sort(() => Math.random() - 0.5);
        const count = Math.floor(Math.random() * 4) + 2;
        const selected = shuffled.slice(0, count);
        const finalLangs = ['es-ES', ...selected];

        return JSON.stringify(finalLangs);
    }

    // ==================== CRYPTOGRAPHIC AND MATH ====================

    /**
     * Generate random MD5 hash
     * @returns {string} Random MD5 hash
     */
    generateRandomMD5() {
        const randomBytes = crypto.randomBytes(16);
        return crypto.createHash('md5').update(randomBytes).digest('hex');
    }

    /**
     * Generate window checksum
     * @returns {string} MD5 hash checksum
     */
    generateChecksum() {
        try {
            const defaultValue = '';
            return crypto.createHash('md5').update(defaultValue).digest('hex');
        } catch (e) {
            return 'error';
        }
    }

    /**
     * Generate math calculations
     * @returns {string} Pipe-separated math values
     */
    generateMath() {
        return `${Math.random() * 20000 - 10000}|${Math.random() * 4 - 2}`;
    }

    /**
     * Generate random number with specified precision
     * @param {number} precision - Number of decimal places
     * @returns {string} Random number string
     */
    generateRandomNumber(precision = 16) {
        return Math.random().toFixed(precision);
    }

    // ==================== LANGUAGE AND LOCALIZATION ====================

    /**
     * Generate language string with random text
     * @returns {string} Formatted language string
     */
    generateLanguageString() {
        const randomText = this.texts[Math.floor(Math.random() * this.texts.length)];
        return `[\\\"de\\\","${randomText}\\\"]`;
    }

    // ==================== PLUGINS AND EXTENSIONS ====================

    /**
     * Generate plugins list
     * @returns {string} Pipe-separated plugins list
     */
    generatePlugins() {
        return [
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
    }

    // ==================== BATTERY AND POWER ====================

    /**
     * Generate battery charging status
     * @returns {number} 1 for charging, 0 for not charging
     */
    generateBatteryCharging() {
        return Math.random() > 0.5 ? 1 : 0;
    }

    /**
     * Generate battery level
     * @returns {string} Battery level as string
     */
    generateBatteryLevel() {
        return Math.random().toFixed(2);
    }

    // ==================== DATE AND TIME ====================

    /**
     * Format date for fingerprint
     * @param {Date} date - Date object to format
     * @returns {string} Formatted date string
     */
    formatDate(date) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ` +
               `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ` +
               `GMT+0100 (Central European Standard Time)`;
    }

    // ==================== COMPLETE FINGERPRINT GENERATION ====================

    /**
     * Generate complete fingerprint object
     * @param {string} shieldFpcCookie - Shield FPC cookie value
     * @param {Object} baseFingerprint - Base fingerprint object
     * @returns {Object} Complete fingerprint object
     */
    generateCompleteFingerprint(shieldFpcCookie, baseFingerprint = {}) {
        const now = new Date();
        const network = this.generateNetwork();
        const gpuInfo = this.generateGPU();

        const fingerprint = { ...baseFingerprint };

        // Generate GPU and hardware information
        fingerprint.GPU = gpuInfo.GPU;
        fingerprint.GPU_VENDOR = gpuInfo.GPU_VENDOR;
        fingerprint.CPU = this.generateCPU();

        // Generate audio and visual fingerprints
        fingerprint.AUDIO = this.generateAudioHash();
        fingerprint.FONTS = this.generateFonts();
        fingerprint.CLIENTRECTS = this.generateClientRects();
        fingerprint.GLYPHS = this.generateGlyphs();
        fingerprint.WEBGL = this.generateRandomMD5();

        // Set cookie and session data
        fingerprint.COK = shieldFpcCookie;
        fingerprint.RN = shieldFpcCookie;

        // Generate language configuration
        fingerprint.LANG = this.generateLanguageString();

        // Set network information
        fingerprint.CONNECTION = network.type;
        fingerprint.CONNECTION_DOWNLINK = network.downlink;
        fingerprint.CONNECTION_RTT = network.rtt;
        fingerprint.TIMEZONE = this.generateTimezone();

        // Generate system and cryptographic values
        fingerprint.BATTERY_CHARGING = this.generateBatteryCharging();
        fingerprint.MATH = this.generateMath();
        fingerprint.WINDOW_CS = this.generateChecksum();
        fingerprint.RN = this.generateRandomNumber(16);

        // Generate additional components
        fingerprint.DISPLAY = this.generateDisplay();
        fingerprint.PLUGINS = this.generatePlugins();
        fingerprint.DATE = this.formatDate(now);
        fingerprint.DATE_UTC = now.toUTCString();
        fingerprint.DATE_LOCALE = now.toLocaleString();
        fingerprint.GMT = String(now.getTimezoneOffset() / 60);

        return fingerprint;
    }

    // ==================== CANVAS FINGERPRINTING ====================

    /**
     * Generate realistic canvas fingerprint using actual canvas rendering
     * Creates unique fingerprints through realistic canvas operations
     * @returns {string} MD5 hash of rendered canvas or empty string if canvas unavailable
     */
    generateCanvasHash() {
        if (!createCanvas) {
            // Fallback: Generate realistic canvas hash without canvas module
            const canvasData = [
                'canvas',
                '300x150',
                'rgb(255,0,102)',
                'xtquiz Cwmfjo rlyphsve dbankg',
                'A BIG SMILING FACE 😃',
                '¯\\_(ツ)_/¯',
                Math.random().toString(),
                Date.now().toString()
            ].join('|');
            return crypto.createHash('md5').update(canvasData).digest('hex');
        }
        try {
            // Init canvas with random size
            const canvas = createCanvas(300, 150);
            const ctx = canvas.getContext('2d');
            canvas.width = 300 + Math.floor(Math.random() * 20) - 10;
            canvas.height = 150 + Math.floor(Math.random() * 20) - 10;

            // Draw rectangles with variation
            ctx.beginPath();
            const rectVariation = Math.random() * 2;
            ctx.rect(0 + rectVariation, 0 + rectVariation, 10 - rectVariation, 10 - rectVariation);
            ctx.rect(2 + rectVariation, 2 + rectVariation, 6 - rectVariation, 6 - rectVariation);

            // Font settings
            const fontSettings = {
                size1: 30 + Math.floor(Math.random() * 4) - 2,
                size2: 20 + Math.floor(Math.random() * 3) - 1,
                size3: 50 + Math.floor(Math.random() * 6) - 3,
                family1: Math.random() > 0.5 ? 'no-real-font-meow' : 'Arial',
                family2: Math.random() > 0.5 ? 'sans-serif' : 'Arial'
            };

            // Position jitter function
            const posVar = () => Math.floor(Math.random() * 5) - 2;

            // Draw colored rectangle
            ctx.fillStyle = '#f60' + (Math.floor(6060 + Math.random() * 90).toString(16));
            ctx.fillRect(125 + posVar(), 1 + posVar(), 62 + posVar(), 20 + posVar());

            // Draw three text layers
            ctx.font = `${fontSettings.size1}px ${fontSettings.family1}`;
            ctx.fillStyle = '#72b' + (177 + Math.floor(Math.random() * 10));
            ctx.fillText("xtquiz Cwmfjo rlyphsve dbankg", 5 + posVar(), 33 + posVar());

            ctx.font = `${fontSettings.size2}px Arial`;
            ctx.fillStyle = `rgba(102,${204 + Math.floor(Math.random() * 20)},0,${0.7 + Math.random() * 0.2})`;
            ctx.fillText("A BIG SMILING FACE 😃", 50 + posVar(), 66 + posVar());

            ctx.font = `${fontSettings.size3}px ${fontSettings.family2}`;
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("¯\\_(ツ)_/¯", 100 + posVar(), 120 + posVar());

            // Add noise pixels
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (Math.random() < 0.05) {
                    data[i] = Math.random() * 255;     // R
                    data[i + 1] = Math.random() * 255; // G
                    data[i + 2] = Math.random() * 255; // B
                }
            }
            ctx.putImageData(imageData, 0, 0);

            // Generate MD5 hash
            const buffer = canvas.toBuffer();
            const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');
            return md5Hash;
        } catch (e) {
            return '';
        }
    }
}

module.exports = FingerprintGenerator;