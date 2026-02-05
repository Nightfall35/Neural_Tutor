const NeuralTutorUI = {
    connectNeural() {
        UI.showNotification("> Establishing quantum neural bridge...");
        setTimeout(() => {
            UI.showNotification("> Neural sync complete. Welcome to the collective.");
            const btn = document.getElementById('connectBtn');
            btn.innerHTML = '<i class="fas fa-brain"></i> CONNECTED';
            btn.classList.add('connected');
        }, 2000);
    },
    startTutorial() {
        UI.showNotification("> Loading quantum tutorial module...");
    },
    runDemo() {
        UI.showNotification("> Initializing quantum simulation...");
    },
    openSettings() {
        UI.showNotification("> Accessing system configuration...");
    },
    selectTopic(topic) {
        const topics = {
            algorithms: "Quantum Algorithms",
            ml: "Neural Architectures",
            security: "Cybersecurity Mesh",
            quantum: "Quantum Computing",
            systems: "Distributed Systems"
        };
        UI.showNotification(`> Loading ${topics[topic] || 'topic'} module...`);
    }
};

const UI = {
    showNotification(message) {
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 30, 40, 0.9);
            border: 1px solid #0ff;
            color: #0ff;
            padding: 15px 30px;
            border-radius: 5px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    createRippleEffect(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.opacity = '0';
            ripple.style.transition = 'all 0.5s ease-out';
            setTimeout(() => ripple.remove(), 500);
        }, 10);
    },

    startDynamicData() {
        const metrics = {
            systemStatus: ['ONLINE', 'OPTIMAL', 'SYNCED', 'QUANTUM_ACTIVE'],
            neuralLoad: () => `${Math.floor(30 + Math.random() * 40)}%`,
            quantumEnt: () => `${Math.floor(85 + Math.random() * 10)}%`,
            bandwidth: () => `${(10 + Math.random() * 8).toFixed(1)}Gb/s`,
            activeSessions: () => Math.floor(200 + Math.random() * 100)
        };
        
        setInterval(() => {
            Object.entries(metrics).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) {
                    const newValue = typeof value === 'function' ? value() : value[Math.floor(Math.random() * value.length)];
                    element.textContent = newValue;
                    element.style.transform = 'scale(1.2)';
                    setTimeout(() => element.style.transform = 'scale(1)', 200);
                }
            });
        }, 2000);
    }
};

const style = document.createElement('style');
style.textContent = `
    .notification { animation: slideIn 0.3s ease-out; }
    @keyframes slideIn {
        from { opacity: 0; transform: translate(-50%, -20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    .cyber-button.connected {
        background: linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 200, 0, 0.2));
        border-color: #0f0; color: #0f0;
    }
`;
document.head.appendChild(style);

document.addEventListener('click', UI.createRippleEffect);