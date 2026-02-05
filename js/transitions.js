// Transition Effects Module
const Transitions = {
    elements: {},

    // Initialize transitions
    init() {
        this.elements.transitionOverlay = document.getElementById('transitionOverlay');
        this.elements.transitionLoading = document.getElementById('transitionLoading');
        this.elements.loadingText = document.getElementById('loadingText');
        this.elements.loadingProgress = document.getElementById('loadingProgress');
        this.elements.bootTerminal = document.getElementById('bootTerminal');
        this.elements.mainInterface = document.getElementById('mainInterface');
    },

    // Start transition sequence
    async startTransition() {
        this.init();
        
        // Show loading bar
        this.elements.transitionLoading.style.opacity = 1;
        
        // Animate loading bar
        await this.animateLoadingBar();
        
        // Terminal deconstruction effect
        await this.terminalDeconstruction();
        
        // Cyber grid transition
        await this.cyberGridTransition();
        
        // Final reveal
        await this.revealMainInterface();
    },

    // Animate loading bar
    async animateLoadingBar() {
        for (let i = 0; i <= 100; i++) {
            const ease = this.easeOutQuad(i / 100);
            this.elements.loadingProgress.style.width = `${ease * 100}%`;
            this.elements.loadingText.textContent = this.getLoadingText(i);
            
            // Pulse effect
            if (i % 10 === 0) {
                this.elements.loadingText.style.transform = `scale(${1 + Math.sin(i/10) * 0.1})`;
            }
            
            await Utils.sleep(20);
        }
    },

    // Terminal deconstruction effect
    async terminalDeconstruction() {
        const lines = Array.from({length: 12}, (_, i) => document.getElementById(`line${i + 1}`));
        const chars = "01!@#$%^&*()_+-=[]{}|;:,.<>?";
        
        // Break text into characters
        lines.forEach(line => {
            if (line.textContent) {
                let newText = '';
                for (let char of line.textContent) {
                    if (char !== ' ') {
                        newText += chars[Math.floor(Math.random() * chars.length)];
                    } else {
                        newText += ' ';
                    }
                }
                line.textContent = newText;
            }
        });

        // Explode effect
        for (let i = 0; i < 20; i++) {
            lines.forEach(line => {
                line.style.transform = `
                    translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)
                    rotate(${Math.random() * 10 - 5}deg)
                `;
                line.style.opacity = Math.random();
            });
            await Utils.sleep(50);
        }

        // Fade out
        this.elements.bootTerminal.style.opacity = 0;
        await Utils.sleep(500);
        this.elements.bootTerminal.style.display = 'none';
    },

    // Cyber grid transition
    async cyberGridTransition() {
        this.elements.transitionOverlay.style.opacity = 1;
        
        // Animate grid with distortion
        for (let i = 0; i <= 100; i += 2) {
            const size = 50 + Math.sin(i/10) * 10;
            this.elements.transitionOverlay.style.backgroundSize = `${size}px ${size}px`;
            this.elements.transitionOverlay.style.filter = `hue-rotate(${i * 3.6}deg)`;
            await Utils.sleep(10);
        }

        // Flash effect
        const colors = ['#0ff', '#f0f', '#0f0', '#ff0'];
        for (let color of colors) {
            this.elements.transitionOverlay.style.backgroundColor = color;
            await Utils.sleep(30);
            this.elements.transitionOverlay.style.backgroundColor = 'transparent';
            await Utils.sleep(30);
        }
        
        // Fade out
        this.elements.transitionOverlay.style.opacity = 0;
        this.elements.transitionLoading.style.opacity = 0;
    },

    // Reveal main interface
    async revealMainInterface() {
        this.elements.mainInterface.style.display = 'block';
        
        // Create neural network
        NeuralNetwork.create();
        
        // Animated reveal with stagger
        for (let i = 0; i <= 100; i += 2) {
            this.elements.mainInterface.style.opacity = this.easeOutQuad(i / 100);
            this.elements.mainInterface.style.filter = `blur(${(100 - i) / 20}px)`;
            await Utils.sleep(10);
        }

        // Animate cards with physics
        this.animateCards();
        
        // Start dynamic updates
        UI.startDynamicData();
    },

    // Animate hologram cards
    animateCards() {
        const cards = document.querySelectorAll('.hologram-card');
        cards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = `
                translateY(100px)
                rotateX(45deg)
                scale(0.8)
            `;
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = 1;
                card.style.transform = 'translateY(0) rotateX(0) scale(1)';
                
                // Add hover tilt effect
                this.addCardHoverEffect(card);
            }, index * 150);
        });
    },

    // Add hover effect to cards
    addCardHoverEffect(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 20;
            const tiltY = (0.5 - x) * 20;
            
            card.style.transform = `
                translateY(-5px)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    },

    // Get loading text with progress
    getLoadingText(percent) {
        const phases = [
            {start: 0, text: "INITIALIZING QUANTUM CORE"},
            {start: 20, text: "LOADING NEURAL MATRIX"},
            {start: 40, text: "SYNCING KNOWLEDGE DATABASE"},
            {start: 60, text: "CALIBRATING ALGORITHMS"},
            {start: 80, text: "ESTABLISHING ENTANGLEMENT"},
            {start: 90, text: "SYSTEM READY"}
        ];
        
        const phase = phases.find(p => percent >= p.start) || phases[phases.length - 1];
        return `${phase.text} [${percent}%]`;
    },

    // Easing function
    easeOutQuad(t) {
        return t * (2 - t);
    }
};