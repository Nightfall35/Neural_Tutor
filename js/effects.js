// Visual Effects Module
const Effects = {
    // Create matrix rain effect
    createMatrixRain() {
        const matrixRain = document.getElementById('matrixRain');
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.style.position = 'absolute';
            column.style.left = `${(i * 100) / columns}%`;
            column.style.top = '-100px';
            column.style.width = '2px';
            column.style.height = '200px';
            column.style.background = 'linear-gradient(to bottom, transparent, #0ff, transparent)';
            column.style.opacity = '0.3';
            matrixRain.appendChild(column);
            
            this.animateRainColumn(column);
        }
    },

    // Animate rain column
    animateRainColumn(column) {
        let position = -100;
        const speed = 2 + Math.random() * 3;
        const height = 50 + Math.random() * 150;
        
        column.style.height = `${height}px`;
        
        function fall() {
            position += speed;
            
            if (position > window.innerHeight) {
                position = -height;
                column.style.opacity = 0.1 + Math.random() * 0.4;
            }
            
            column.style.top = `${position}px`;
            requestAnimationFrame(fall);
        }
        
        fall();
    },

    // Create interactive particles
    createParticles() {
        const particles = document.getElementById('particles');
        const particleCount = 100;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#0ff';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 5px #0ff';
            particle.style.opacity = '0';
            particles.appendChild(particle);
            
            this.animateParticle(particle);
        }
    },

    // Animate particle
    animateParticle(particle) {
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let opacity = 0;
        let phase = Math.random() * Math.PI * 2;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        function float() {
            const time = Date.now() / 1000;
            
            x += Math.sin(time + phase) * 0.05;
            y += Math.cos(time * 0.7 + phase) * 0.05;
            
            // Wrap around edges
            if (x > 100) x = 0;
            if (x < 0) x = 100;
            if (y > 100) y = 0;
            if (y < 0) y = 100;
            
            opacity = 0.2 + Math.sin(time * 2 + phase) * 0.3;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.opacity = Math.max(0, opacity);
            
            requestAnimationFrame(float);
        }
        
        float();
    },

    // Create mouse trail effects
    createMouseTrail(e) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        trail.style.width = '20px';
        trail.style.height = '20px';
        trail.style.background = 'radial-gradient(circle, #0ff, transparent)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.opacity = '0.5';
        document.body.appendChild(trail);
        
        // Animate and remove
        setTimeout(() => {
            trail.style.transition = 'all 0.5s';
            trail.style.opacity = '0';
            trail.style.transform = 'scale(2)';
            setTimeout(() => trail.remove(), 500);
        }, 10);
    }
};

// Add mouse trail on document mousemove
document.addEventListener('mousemove', (e) => Effects.createMouseTrail(e));