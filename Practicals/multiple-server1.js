const http = require('http');
const ports = [3000, 3001, 3002, 3003, 3004]; 
const servers = {};


const createServer = (port) => {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Server running on port ${port}\n`);
    });

    server.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    server.on('close', () => {
        console.log(`Server on port ${port} closed.`);
    });

    return server;
};

ports.forEach(port => {
    servers[port] = createServer(port);
});

// Close server on port 3001 after 5 seconds
setTimeout(() => {
    console.log('Closing server on port 3001...');
    servers[3001].close();
}, 5000);
