// UI Interactions Module
const NeuralTutorUI = {
    // Connect neural interface
    connectNeural() {
        UI.showNotification("> Establishing quantum neural bridge...");
        setTimeout(() => {
            UI.showNotification("> Neural sync complete. Welcome to the collective.");
            const connectBtn = document.getElementById('connectBtn');
            connectBtn.innerHTML = '<i class="fas fa-brain"></i> CONNECTED';
            connectBtn.classList.add('connected');
        }, 2000);
    },

    // Start tutorial
    startTutorial() {
        UI.showNotification("> Loading quantum tutorial module...");
        setTimeout(() => {
            UI.showNotification("> Tutorial initialized. Neural interface active.");
        }, 1500);
    },

    // Run demo
    runDemo() {
        UI.showNotification("> Initializing quantum simulation...");
        setTimeout(() => {
            UI.showNotification("> Simulation running. Neural patterns detected.");
        }, 1500);
    },

    // Open settings
    openSettings() {
        UI.showNotification("> Accessing system configuration...");
    },

    // Select topic
    selectTopic(topic) {
        const topics = {
            algorithms: "Quantum Algorithms",
            ml: "Neural Architectures",
            security: "Cybersecurity Mesh",
            quantum: "Quantum Computing",
            systems: "Distributed Systems"
        };
        
        UI.showNotification(`> Loading ${topics[topic]} module...`);
    }
};

// UI Utility Module
const UI = {
    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
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
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Create ripple effect on click
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
        
        // Animate ripple
        const size = 100;
        ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: `${size}px`, height: `${size}px`, opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    },

    // Dynamic data updates
    startDynamicData() {
        const metrics = {
            systemStatus: ['ONLINE', 'OPTIMAL', 'SYNCED', 'QUANTUM_ACTIVE'],
            neuralLoad: () => `${30 + Math.random() * 40}%`,
            quantumEnt: () => `${85 + Math.random() * 10}%`,
            bandwidth: () => `${(10 + Math.random() * 8).toFixed(1)}Gb/s`,
            activeSessions: () => Math.floor(200 + Math.random() * 100)
        };
        
        setInterval(() => {
            // Update all metrics
            for (const [id, value] of Object.entries(metrics)) {
                const element = document.getElementById(id);
                if (element) {
                    if (typeof value === 'function') {
                        element.textContent = value();
                    } else {
                        element.textContent = value[Math.floor(Math.random() * value.length)];
                    }
                    
                    // Add update animation
                    element.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        element.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        }, 2000);
    }
};

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
    
    .cyber-button.connected {
        background: linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 200, 0, 0.2));
        border-color: #0f0;
        color: #0f0;
    }
`;
document.head.appendChild(style);