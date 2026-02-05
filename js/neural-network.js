// Neural Network Visualization Module
const NeuralNetwork = {
    nodes: [],
    connections: [],

    // Create neural network visualization
    create(containerId = 'neuralNetwork') {
        this.container = document.getElementById(containerId);
        this.nodeCount = 20;
        this.createNodes();
        this.createConnections();
        this.animate();
    },

    // Create nodes
    createNodes() {
        this.nodes = [];
        
        for (let i = 0; i < this.nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.animationDelay = `${Math.random() * 2}s`;
            this.container.appendChild(node);
            
            // Store node data
            this.nodes.push({
                element: node,
                x: parseFloat(node.style.left),
                y: parseFloat(node.style.top),
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2
            });
        }
    },

    // Create connections between nodes
    createConnections() {
        // Clear existing connections
        this.connections.forEach(conn => conn.remove());
        this.connections = [];
        
        this.nodes.forEach((node1, i) => {
            this.nodes.slice(i + 1).forEach(node2 => {
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 30) { // Connect nearby nodes
                    const connection = this.createConnectionLine(node1, node2);
                    this.connections.push(connection);
                }
            });
        });
    },

    // Create connection line between two nodes
    createConnectionLine(node1, node2) {
        const x1 = node1.x;
        const y1 = node1.y;
        const x2 = node2.x;
        const y2 = node2.y;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        const connection = document.createElement('div');
        connection.className = 'neural-connection';
        connection.style.width = `${length}%`;
        connection.style.left = `${x1}%`;
        connection.style.top = `${y1}%`;
        connection.style.transform = `rotate(${angle}deg)`;
        connection.style.opacity = 0.2 + Math.random() * 0.3;
        
        this.container.appendChild(connection);
        
        // Animate connection
        this.animateConnection(connection);
        return connection;
    },

    // Animate connection
    animateConnection(conn) {
        let opacity = parseFloat(conn.style.opacity);
        let direction = 1;
        
        function pulse() {
            opacity += 0.01 * direction;
            
            if (opacity > 0.5) direction = -1;
            if (opacity < 0.1) direction = 1;
            
            conn.style.opacity = opacity;
            requestAnimationFrame(pulse);
        }
        
        pulse();
    },

    // Animate entire network
    animate() {
        let frameCount = 0;
        
        const update = () => {
            this.nodes.forEach(node => {
                // Update position with physics
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x <= 0 || node.x >= 100) node.vx *= -1;
                if (node.y <= 0 || node.y >= 100) node.vy *= -1;
                
                // Apply boundaries
                node.x = Math.max(0, Math.min(100, node.x));
                node.y = Math.max(0, Math.min(100, node.y));
                
                // Update element
                node.element.style.left = `${node.x}%`;
                node.element.style.top = `${node.y}%`;
            });
            
            // Update connections every 60 frames
            if (frameCount % 60 === 0) {
                this.createConnections();
            }
            
            frameCount++;
            requestAnimationFrame(update);
        };
        
        update();
    }
};