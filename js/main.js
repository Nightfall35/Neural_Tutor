const NeuralTutor = {
    elements: {},
    bootSequence: [
        {text: "> Initializing Quantum Neural Tutor v3.0...", delay: 800, color: "#0ff"},
        {text: "> Loading quantum processors... [██████████] 100%", delay: 600, color: "#f0f"},
        {text: "> Calibrating neural interface...", delay: 700, color: "#0ff"},
        {text: "> Establishing quantum entanglement...", delay: 900, color: "#0f0"},
        {text: "> Scanning cognitive patterns...", delay: 600, color: "#0ff"},
        {text: "> Decrypting knowledge matrix...", delay: 800, color: "#ff0"},
        {text: "> Synchronizing mentor network...", delay: 700, color: "#0ff"},
        {text: "> Optimizing learning algorithms...", delay: 900, color: "#f0f"},
        {text: "> System integrity: [██████████] 100%", delay: 600, color: "#0f0"},
        {text: "> Quantum neural bridge: ACTIVE", delay: 800, color: "#0ff"},
        {text: "> Welcome to the singularity.", delay: 1200, color: "#ff0"}
    ],

    init() {
        this.cacheElements();
        this.setupEventListeners();
        Effects.createMatrixRain();
        Effects.createParticles();
        setTimeout(() => this.startBootSequence(), 500);
    },

    cacheElements() {
        this.elements.bootTerminal = document.getElementById('bootTerminal');
        this.elements.transitionOverlay = document.getElementById('transitionOverlay');
        this.elements.transitionLoading = document.getElementById('transitionLoading');
        this.elements.loadingText = document.getElementById('loadingText');
        this.elements.loadingProgress = document.getElementById('loadingProgress');
        this.elements.mainInterface = document.getElementById('mainInterface');
    },

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                location.reload();
            }
        });
    },

    async startBootSequence() {
        const lines = Array.from({length: 12}, (_, i) => document.getElementById(`line${i + 1}`));
        
        lines[0].style.opacity = '1';
        
        for (let i = 0; i < this.bootSequence.length; i++) {
            const line = lines[i + 1];
            const sequence = this.bootSequence[i];
            
            if (line) {
                line.style.opacity = '1';
                line.style.color = sequence.color;
                line.style.display = 'block';
                line.textContent = '';
                
                await this.typeText(line, sequence.text, 30);
                this.playTypingSound();
                await Utils.sleep(sequence.delay);
            }
        }
        
        setTimeout(() => Transitions.startTransition(), 1000);
    },

    async typeText(element, text, speed) {
        return new Promise(resolve => {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                    resolve();
                }
            }, speed);
        });
    },

    playTypingSound() {
        if (window.AudioContext || window.webkitAudioContext) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.value = 800 + Math.random() * 400;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (e) {}
        }
    }
};

document.addEventListener('DOMContentLoaded', () => NeuralTutor.init());