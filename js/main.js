// Main Application Module
const NeuralTutor = {
    // DOM Elements
    elements: {
        bootTerminal: null,
        transitionOverlay: null,
        transitionLoading: null,
        loadingText: null,
        loadingProgress: null,
        mainInterface: null,
        neuralNetwork: null,
        matrixRain: null,
        particles: null
    },

    // Boot sequence configuration
    bootSequence: [
        {text: "> Initializing Quantum Neural Tutor v3.0...", delay: 800, color: "#0ff", effect: "glitch"},
        {text: "> Loading quantum processors... [██████████] 100%", delay: 600, color: "#f0f", effect: "pulse"},
        {text: "> Calibrating neural interface...", delay: 700, color: "#0ff", effect: "none"},
        {text: "> Establishing quantum entanglement...", delay: 900, color: "#0f0", effect: "glitch"},
        {text: "> Scanning cognitive patterns...", delay: 600, color: "#0ff", effect: "pulse"},
        {text: "> Decrypting knowledge matrix...", delay: 800, color: "#ff0", effect: "none"},
        {text: "> Synchronizing mentor network...", delay: 700, color: "#0ff", effect: "glitch"},
        {text: "> Optimizing learning algorithms...", delay: 900, color: "#f0f", effect: "pulse"},
        {text: "> System integrity: [██████████] 100%", delay: 600, color: "#0f0", effect: "none"},
        {text: "> Quantum neural bridge: ACTIVE", delay: 800, color: "#0ff", effect: "glitch"},
        {text: "> Welcome to the singularity.", delay: 1200, color: "#ff0", effect: "pulse"}
    ],

    // Initialize the application
    init() {
        this.cacheElements();
        this.setupEventListeners();
        
        // Create initial effects
        Effects.createMatrixRain();
        Effects.createParticles();
        
        // Start boot sequence
        setTimeout(() => this.startBootSequence(), 500);
    },

    // Cache DOM elements
    cacheElements() {
        this.elements.bootTerminal = document.getElementById('bootTerminal');
        this.elements.transitionOverlay = document.getElementById('transitionOverlay');
        this.elements.transitionLoading = document.getElementById('transitionLoading');
        this.elements.loadingText = document.getElementById('loadingText');
        this.elements.loadingProgress = document.getElementById('loadingProgress');
        this.elements.mainInterface = document.getElementById('mainInterface');
        this.elements.neuralNetwork = document.getElementById('neuralNetwork');
        this.elements.matrixRain = document.getElementById('matrixRain');
        this.elements.particles = document.getElementById('particles');
    },

    // Setup event listeners
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    if (this.elements.mainInterface.style.display === 'block') {
                        UI.showNotification("> Press Ctrl+R to restart sequence");
                    }
                    break;
                case 'r':
                    if (e.ctrlKey) {
                        location.reload();
                    }
                    break;
                case '1':
                    NeuralTutorUI.connectNeural();
                    break;
                case '2':
                    NeuralTutorUI.startTutorial();
                    break;
                case '3':
                    NeuralTutorUI.runDemo();
                    break;
            }
        });

        // Mouse effects
        document.addEventListener('click', UI.createRippleEffect);
    },

    // Start boot sequence
    async startBootSequence() {
        const lines = Array.from({length: 12}, (_, i) => document.getElementById(`line${i + 1}`));
        
        // Type initial command
        await this.typeText(lines[0], "", 0);
        
        // Enhanced typing with effects
        for (let i = 0; i < this.bootSequence.length; i++) {
            const line = lines[i + 1];
            const {text, delay, color, effect} = this.bootSequence[i];
            
            line.style.opacity = 1;
            line.style.color = color;
            
            // Add effect class
            if (effect === "glitch") {
                line.classList.add('glitch');
                line.setAttribute('data-text', text.replace('> ', ''));
            }
            
            await this.typeText(line, text, effect === "pulse" ? 20 : 30);
            
            // Add typing sound effect
            this.playTypingSound();
            await Utils.sleep(delay);
        }

        // Start transition to main interface
        await Transitions.startTransition();
    },

    // Type text with effects
    async typeText(element, text, speed) {
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            element.textContent = text.substring(0, i + 1);
            
            // Random glitch effect
            if (Math.random() > 0.9) {
                element.style.color = ['#f0f', '#0f0', '#ff0'][Math.floor(Math.random() * 3)];
                setTimeout(() => {
                    element.style.color = '';
                }, 50);
            }
            
            await Utils.sleep(speed);
        }
    },

    // Play typing sound
    playTypingSound() {
        if (window.AudioContext || window.webkitAudioContext) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800 + Math.random() * 400;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.05);
        }
    }
};

// Initialize when DOM is loaded
window.addEventListener('DOMContentLoaded', () => NeuralTutor.init());