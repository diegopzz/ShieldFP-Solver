const chalk = require('chalk');

/**
 * Utility functions for ShieldID Solver
 */

/**
 * Get color for score display based on score value
 * @param {number} score - Device score from Shield API
 * @returns {Function} Chalk color function
 */
function getScoreColor(score) {
    if (score >= 150) return chalk.green;
    if (score >= 100) return chalk.yellow;
    if (score >= 50) return chalk.orange;
    return chalk.red;
}

/**
 * Get color for boolean detection results
 * @param {boolean} value - Detection flag value
 * @returns {string} Colored Yes/No string
 */
function getBooleanColor(value) {
    return value ? chalk.red('Yes') : chalk.green('No');
}

/**
 * Format timestamp for display
 * @param {number|Date} timestamp - Timestamp to format
 * @returns {string} Formatted timestamp string
 */
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');
}

/**
 * Generate random string with specified length
 * @param {number} length - Length of random string
 * @param {string} charset - Character set to use (default: alphanumeric)
 * @returns {string} Random string
 */
function generateRandomString(length, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
}

/**
 * Generate random hexadecimal string
 * @param {number} length - Length of hex string
 * @returns {string} Random hex string
 */
function generateRandomHex(length) {
    return generateRandomString(length, '0123456789abcdef');
}

/**
 * Generate random integer within range
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number} Random integer
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random float within range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} Random float
 */
function randomFloat(min, max, decimals = 2) {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(decimals));
}

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sanitize string for file names
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeFilename(str) {
    return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

/**
 * Calculate percentage with specified decimal places
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @param {number} decimals - Decimal places (default: 1)
 * @returns {number} Percentage
 */
function percentage(value, total, decimals = 1) {
    if (total === 0) return 0;
    return parseFloat(((value / total) * 100).toFixed(decimals));
}

/**
 * Format bytes to human readable format
 * @param {number} bytes - Bytes to format
 * @param {number} decimals - Decimal places (default: 2)
 * @returns {string} Formatted byte string
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Deep clone object (JSON safe)
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts (default: 3)
 * @param {number} baseDelay - Base delay in ms (default: 1000)
 * @returns {Promise} Promise that resolves with function result
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (attempt === maxRetries) {
                throw lastError;
            }

            const delay = baseDelay * Math.pow(2, attempt);
            await sleep(delay);
        }
    }
}

/**
 * Initialize logging directory
 * @param {string} logsDir - Directory path for logs (default: './logs')
 */
function initializeLogging(logsDir = './logs') {
    const fs = require('fs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
}

/**
 * Display startup banner for the application
 */
function displayBanner() {
    console.clear();
    console.log(chalk.cyan.bold('\n╔══════════════════════════════════════════════════════════════════════════╗'));
    console.log(chalk.cyan.bold('║') + chalk.cyan('                          🛡️  ShieldFP Solver  🛡️                     ') + chalk.cyan.bold('║'));
    console.log(chalk.cyan.bold('║') + chalk.cyan('                             ') + chalk.cyan.bold('║'));
    console.log(chalk.cyan.bold('║') + chalk.cyan('                    🔬 For Security Research & Testing 🔬                ') + chalk.cyan.bold('║'));
    console.log(chalk.cyan.bold('╚══════════════════════════════════════════════════════════════════════════╝'));

    console.log(chalk.magenta('\n┌─ 🚀 System Initialization ─────────────────────────────────────────────┐'));
    console.log(chalk.yellow('│ 🔬 System Status:                                                      │'));
    console.log(chalk.green(`│   ✅ Fingerprint Generator: ${chalk.bold('Loaded')}                                  │`));
    console.log(chalk.green(`│   ✅ Encryption Module: ${chalk.bold('Loaded')}                                      │`));
    console.log(chalk.green(`│   ✅ Shield FPC: ${chalk.bold('Loaded')}                                            │`));
    console.log(chalk.green(`│   ✅ UUID Generator: ${chalk.bold('Loaded')}                                        │`));
    console.log(chalk.magenta('└─────────────────────────────────────────────────────────────────────────┘\n'));
}

/**
 * Format date for fingerprint generation
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ` +
           `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ` +
           `GMT+0100 (Central European Standard Time)`;
}

/**
 * Identify critical factors affecting the Shield score
 * @param {Object} response - Shield response object
 * @returns {Array} Array of critical factors
 */
function identifyCriticalFactors(response) {
    const factors = [];
    const { device_intelligence } = response.result || response;

    if (device_intelligence.is_bot) factors.push('Bot detection triggered');
    if (device_intelligence.is_browser_spoofed) factors.push('Browser spoofing detected');
    if (device_intelligence.is_anti_fingerprinting) factors.push('Anti-fingerprinting measures detected');
    if (device_intelligence.is_emulated) factors.push('Emulation detected');
    if (device_intelligence.is_proxy) factors.push('Proxy usage detected');

    return factors;
}

/**
 * Generate recommendations based on Shield response
 * @param {Object} response - Shield response object
 * @returns {Array} Array of recommendations
 */
function generateRecommendations(response) {
    const recommendations = [];
    const { device_intelligence } = response.result || response;

    if (device_intelligence.is_bot) {
        recommendations.push('Improve browser behavior simulation');
        recommendations.push('Add realistic timing patterns');
    }

    if (device_intelligence.is_browser_spoofed) {
        recommendations.push('Ensure User-Agent consistency with other fingerprint elements');
        recommendations.push('Validate browser feature compatibility');
    }

    if (device_intelligence.is_anti_fingerprinting) {
        recommendations.push('Reduce fingerprint entropy');
        recommendations.push('Use more common device configurations');
    }

    if (device_intelligence.is_emulated) {
        recommendations.push('Enhance hardware simulation accuracy');
    }

    if (device_intelligence.is_proxy) {
        recommendations.push('Review network configuration');
    }

    return recommendations;
}

/**
 * Process and format Shield API response for display
 * @param {Object} response - Axios response object
 * @param {Object} rawFingerprint - Original fingerprint data
 * @param {Function} saveLowScoreCallback - Callback function for saving low scores
 * @param {number} saveThreshold - Score threshold for saving results
 */
function processShieldResponse(response, rawFingerprint, saveLowScoreCallback, saveThreshold = 115) {
    try {
        const { device_intelligence } = response.data.result;
        const scoreColor = getScoreColor(device_intelligence.device_score);
        const scoreIcon = device_intelligence.device_score < 50 ? '🔴' : device_intelligence.device_score < 100 ? '🟡' : '🟢';

        console.log('\n' + chalk.cyan.bold('╔═══ 📊 Shield Analysis Results ═══════════════════════════════════════╗'));
        console.log(chalk.cyan.bold('║') + chalk.cyan(`  ${scoreIcon} Device Score: `) + scoreColor.bold(device_intelligence.device_score) + chalk.cyan('                                                      ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('  🔒 Shield ID: ') + chalk.yellow.bold(device_intelligence.shield_id.substring(0, 16) + '...') + chalk.cyan('                   ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('  📱 Session ID: ') + chalk.yellow.bold(response.data.result.session_id.substring(0, 16) + '...') + chalk.cyan('                  ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('╠═══════════════════════════════════════════════════════════════════════╣'));

        // Detection Results with better formatting
        console.log(chalk.cyan.bold('║') + chalk.cyan.bold('  🔍 Detection Analysis:') + chalk.cyan('                                             ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('     🤖 Bot Detection: ') + getBooleanColor(device_intelligence.is_bot).padEnd(15) + chalk.cyan('                               ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('     🔄 Proxy Detection: ') + getBooleanColor(device_intelligence.is_proxy).padEnd(15) + chalk.cyan('                             ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('     🛡️  Anti-Fingerprinting: ') + getBooleanColor(device_intelligence.is_anti_fingerprinting).padEnd(15) + chalk.cyan('                       ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('     🎭 Browser Spoofed: ') + getBooleanColor(device_intelligence.is_browser_spoofed).padEnd(15) + chalk.cyan('                           ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('     💻 Emulated: ') + getBooleanColor(device_intelligence.is_emulated).padEnd(15) + chalk.cyan('                                   ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('     🕵️  Incognito: ') + getBooleanColor(device_intelligence.is_incognito).padEnd(15) + chalk.cyan('                                  ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('║') + chalk.cyan('     🧅 Tor Network: ') + getBooleanColor(device_intelligence.is_tor).padEnd(15) + chalk.cyan('                                 ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('╚═══════════════════════════════════════════════════════════════════════╝'));

        // Save low-score results for analysis
        if (device_intelligence.device_score < saveThreshold && saveLowScoreCallback) {
            saveLowScoreCallback(device_intelligence.device_score, rawFingerprint, response.data);
        }

    } catch (error) {
        console.error(chalk.red.bold('❌ Error processing Shield response:'), error.message);
    }
}

/**
 * Save low-score results for further analysis
 * @param {number} score - Device score
 * @param {Object} fingerprint - Original fingerprint
 * @param {Object} response - Shield response
 * @param {string} logsDir - Directory to save logs (default: './logs')
 */
function saveLowScoreResult(score, fingerprint, response, logsDir = './logs') {
    const fs = require('fs');

    try {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const analysisData = {
            score,
            timestamp,
            fingerprint,
            shield_response: response,
            analysis: {
                critical_factors: identifyCriticalFactors(response),
                recommendations: generateRecommendations(response)
            }
        };

        const filename = `${logsDir}/analysis_${score}_${timestamp}.json`;
        fs.writeFileSync(filename, JSON.stringify(analysisData, null, 2));

        console.log(chalk.green.bold('\n──────────────────────────────────────────────────'));
        console.log(chalk.green(`📊 ${chalk.bold('Low Score Analysis saved:')} ${chalk.yellow(filename)}`));
        console.log(chalk.green.bold('──────────────────────────────────────────────────'));

    } catch (error) {
        console.error(chalk.red.bold('❌ Error saving analysis:'), error.message);
    }
}

/**
 * Display a beautiful progress bar
 * @param {number} current - Current progress
 * @param {number} total - Total progress
 * @param {string} label - Progress label
 * @param {number} width - Bar width (default: 40)
 */
function displayProgressBar(current, total, label = 'Progress', width = 40) {
    const percentage = Math.round((current / total) * 100);
    const filled = Math.round((current / total) * width);
    const empty = width - filled;

    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    const coloredBar = chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));

    process.stdout.write(`\r🚀 ${label}: [[36m${coloredBar}[0m] ${percentage}% (${current}/${total})`);

    if (current === total) {
        process.stdout.write('\n');
    }
}

/**
 * Display a request header with improved formatting
 * @param {number} requestNumber - Request number
 * @param {string} cookie - Cookie value
 */
function displayRequestHeader(requestNumber, cookie) {
    console.log(chalk.magenta.bold(`\n┌── 📡 Request #${requestNumber} ────────────────────────────────────────────────┐`));
    console.log(chalk.cyan(`│ 🍪 Cookie: ${chalk.yellow.bold(cookie)}`));
    console.log(chalk.magenta.bold(`└─────────────────────────────────────────────────────────────────────────┘`));
}

/**
 * Display a warning message with enhanced formatting
 * @param {string} message - Warning message
 */
function displayWarning(message) {
    console.log(chalk.yellow.bold(`\n⚠️  ${message}`));
}

/**
 * Display an error message with enhanced formatting
 * @param {string} message - Error message
 * @param {Error} error - Error object (optional)
 */
function displayError(message, error = null) {
    console.log(chalk.red.bold(`\n❌ ${message}`));
    if (error) {
        console.log(chalk.red(`   Details: ${error.message}`));
    }
}

/**
 * Display success message with enhanced formatting
 * @param {string} message - Success message
 */
function displaySuccess(message) {
    console.log(chalk.green.bold(`\n✅ ${message}`));
}

/**
 * Display info message with enhanced formatting
 * @param {string} message - Info message
 */
function displayInfo(message) {
    console.log(chalk.blue.bold(`\n📝 ${message}`));
}

/**
 * Display shutdown message with enhanced formatting
 */
function displayShutdown() {
    console.log(chalk.yellow.bold('\n\n⏹️  Gracefully shutting down ShieldID Solver...'));
    console.log(chalk.green('✅ Session completed. Analysis files saved to ./logs/'));
    console.log(chalk.cyan.bold('\n🚀 Thank you for using ShieldID Solver! \n'));
}

module.exports = {
    getScoreColor,
    getBooleanColor,
    formatTimestamp,
    generateRandomString,
    generateRandomHex,
    randomInt,
    randomFloat,
    sleep,
    sanitizeFilename,
    percentage,
    formatBytes,
    isValidEmail,
    deepClone,
    retryWithBackoff,
    initializeLogging,
    displayBanner,
    formatDate,
    identifyCriticalFactors,
    generateRecommendations,
    processShieldResponse,
    saveLowScoreResult,
    displayProgressBar,
    displayRequestHeader,
    displayWarning,
    displayError,
    displaySuccess,
    displayInfo,
    displayShutdown
};