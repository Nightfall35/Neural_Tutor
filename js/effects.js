const Effects = {
    createMatrixRain() {
        const container = document.getElementById('matrixRain');
        if (!container) return;
        
        const columns = Math.floor(window.innerWidth / 25);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                left: ${(i * 100) / columns}%;
                top: -100px;
                width: 1.5px;
                height: 150px;
                background: linear-gradient(to bottom, transparent, #00ff41, #008f11, transparent);
                opacity: 0.2;
                pointer-events: none;
            `;
            container.appendChild(column);
            this.animateRainColumn(column);
        }
    },

    animateRainColumn(column) {
        let position = -100;
        const speed = 1.5 + Math.random() * 2;
        const height = 40 + Math.random() * 100;
        column.style.height = `${height}px`;
        
        function fall() {
            position += speed;
            if (position > window.innerHeight) {
                position = -height;
                column.style.opacity = 0.1 + Math.random() * 0.3;
            }
            column.style.top = `${position}px`;
            requestAnimationFrame(fall);
        }
        fall();
    },

    createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 1.5px;
                height: 1.5px;
                background: #00ff41;
                border-radius: 50%;
                box-shadow: 0 0 3px #00ff41;
                opacity: 0;
                pointer-events: none;
            `;
            container.appendChild(particle);
            this.animateParticle(particle);
        }
    },

    animateParticle(particle) {
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let phase = Math.random() * Math.PI * 2;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        function float() {
            const time = Date.now() / 1000;
            x += Math.sin(time + phase) * 0.03;
            y += Math.cos(time * 0.7 + phase) * 0.03;
            if (x > 100) x = 0;
            if (x < 0) x = 100;
            if (y > 100) y = 0;
            if (y < 0) y = 100;
            const opacity = 0.1 + Math.sin(time * 1.5 + phase) * 0.2;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.opacity = Math.max(0, opacity);
            requestAnimationFrame(float);
        }
        float();
    }
};