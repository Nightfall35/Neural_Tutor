// Utility Functions Module
const Utils = {
    // Sleep function for async/await
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Easing functions
    easeOutQuad(t) {
        return t * (2 - t);
    },

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },

    // Random number in range
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Random integer in range
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    // Map value from one range to another
    map(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
};