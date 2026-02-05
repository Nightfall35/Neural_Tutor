const Transitions = {
    elements: {},

    async startTransition() {
        this.init();
        this.elements.transitionLoading.style.opacity = 1;
        this.elements.transitionLoading.style.display = 'block';
        await this.animateLoadingBar();
        await this.terminalDeconstruction();
        await this.cyberGridTransition();
        await this.revealMainInterface();
    },

    init() {
        this.elements.transitionOverlay = document.getElementById('transitionOverlay');
        this.elements.transitionLoading = document.getElementById('transitionLoading');
        this.elements.loadingText = document.getElementById('loadingText');
        this.elements.loadingProgress = document.getElementById('loadingProgress');
        this.elements.bootTerminal = document.getElementById('bootTerminal');
        this.elements.mainInterface = document.getElementById('mainInterface');
    },

    async animateLoadingBar() {
        return new Promise(resolve => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                const ease = this.easeOutQuad(progress / 100);
                this.elements.loadingProgress.style.width = `${ease * 100}%`;
                this.elements.loadingText.textContent = this.getLoadingText(progress);
                
                if (progress >= 100) {
                    clearInterval(interval);
                    resolve();
                }
            }, 20);
        });
    },

    async terminalDeconstruction() {
        return new Promise(resolve => {
            const lines = Array.from({length: 12}, (_, i) => document.getElementById(`line${i + 1}`));
            const chars = "01!@#$%^&*()_+-=[]{}|;:,.<>?";
            
            lines.forEach(line => {
                if (line.textContent) {
                    let newText = '';
                    for (let char of line.textContent) {
                        newText += char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
                    }
                    line.textContent = newText;
                }
            });
            
            let frame = 0;
            const explodeInterval = setInterval(() => {
                lines.forEach(line => {
                    line.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 10 - 5}deg)`;
                    line.style.opacity = Math.random();
                });
                
                frame++;
                if (frame >= 20) {
                    clearInterval(explodeInterval);
                    this.elements.bootTerminal.style.opacity = 0;
                    setTimeout(() => {
                        this.elements.bootTerminal.style.display = 'none';
                        resolve();
                    }, 500);
                }
            }, 50);
        });
    },

    async cyberGridTransition() {
        return new Promise(resolve => {
            this.elements.transitionOverlay.style.opacity = 1;
            this.elements.transitionOverlay.style.display = 'block';
            
            let i = 0;
            const gridInterval = setInterval(() => {
                const size = 50 + Math.sin(i/10) * 10;
                this.elements.transitionOverlay.style.backgroundSize = `${size}px ${size}px`;
                this.elements.transitionOverlay.style.filter = `hue-rotate(${i * 3.6}deg)`;
                
                i += 2;
                if (i > 100) {
                    clearInterval(gridInterval);
                    const colors = ['#0ff', '#f0f', '#0f0', '#ff0'];
                    let colorIndex = 0;
                    const flashInterval = setInterval(() => {
                        if (colorIndex < colors.length) {
                            this.elements.transitionOverlay.style.backgroundColor = colors[colorIndex];
                            setTimeout(() => {
                                this.elements.transitionOverlay.style.backgroundColor = 'transparent';
                                colorIndex++;
                            }, 30);
                        } else {
                            clearInterval(flashInterval);
                            this.elements.transitionOverlay.style.opacity = 0;
                            this.elements.transitionLoading.style.opacity = 0;
                            setTimeout(resolve, 300);
                        }
                    }, 60);
                }
            }, 10);
        });
    },

    async revealMainInterface() {
        return new Promise(resolve => {
            this.elements.mainInterface.style.display = 'block';
            NeuralNetwork.create();
            
            let i = 0;
            const revealInterval = setInterval(() => {
                this.elements.mainInterface.style.opacity = this.easeOutQuad(i / 100);
                this.elements.mainInterface.style.filter = `blur(${(100 - i) / 20}px)`;
                
                i += 2;
                if (i > 100) {
                    clearInterval(revealInterval);
                    this.animateCards();
                    UI.startDynamicData();
                    resolve();
                }
            }, 10);
        });
    },

    animateCards() {
        const cards = document.querySelectorAll('.hologram-card');
        cards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(100px) rotateX(45deg) scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = 1;
                card.style.transform = 'translateY(0) rotateX(0) scale(1)';
                
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    const tiltX = (y - 0.5) * 20;
                    const tiltY = (0.5 - x) * 20;
                    card.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
                });
            }, index * 150);
        });
    },

    getLoadingText(percent) {
        const phases = [
            {start: 0, text: "INITIALIZING QUANTUM CORE"},
            {start: 20, text: "LOADING NEURAL MATRIX"},
            {start: 40, text: "SYNCING KNOWLEDGE DATABASE"},
            {start: 60, text: "CALIBRATING ALGORITHMS"},
            {start: 80, text: "ESTABLISHING ENTANGLEMENT"},
            {start: 90, text: "SYSTEM READY"}
        ];
        
        for (let phase of phases) {
            if (percent >= phase.start) {
                return `${phase.text} [${percent}%]`;
            }
        }
        return `SYSTEM READY [${percent}%]`;
    },

    easeOutQuad(t) {
        return t * (2 - t);
    }
};