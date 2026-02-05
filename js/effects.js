const Effects = {
    createMatrixRain() {
        const container = document.getElementById('matrixRain');
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                left: ${(i * 100) / columns}%;
                top: -100px;
                width: 2px;
                height: 200px;
                background: linear-gradient(to bottom, transparent, #0ff, transparent);
                opacity: 0.3;
            `;
            container.appendChild(column);
            this.animateRainColumn(column);
        }
    },

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

    createParticles() {
        const container = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #0ff;
                border-radius: 50%;
                box-shadow: 0 0 5px #0ff;
                opacity: 0;
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
            x += Math.sin(time + phase) * 0.05;
            y += Math.cos(time * 0.7 + phase) * 0.05;
            if (x > 100) x = 0;
            if (x < 0) x = 100;
            if (y > 100) y = 0;
            if (y < 0) y = 100;
            const opacity = 0.2 + Math.sin(time * 2 + phase) * 0.3;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.opacity = Math.max(0, opacity);
            requestAnimationFrame(float);
        }
        float();
    }
};