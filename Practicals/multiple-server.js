const http = require('http');

const servers = [];
const ports = [8000, 8001, 8002, 8003, 8004];

ports.forEach((port, index) => {
    const server = http.createServer((req, res) => {
        res.end(`Server ${index + 1} is running on port ${port}`);
    });

    server.listen(port, () => {
        console.log(`Server ${index + 1} is running on http://localhost:${port}`);
    });

    servers.push(server);
});

//setEncoding('utf8') tells Node.js to interpret the incoming data as a UTF-8 string instead of the default Buffer (binary data)
//process.stdin refers to the standard input stream, which is where the script reads user input (like when you type something in the terminal).
process.stdin.setEncoding('utf8');

process.stdin.on('data', (input) => {
    const serverIndex = parseInt(input.trim()) - 1;
    
    if (serverIndex >= 0 && serverIndex < servers.length) {
        
        console.log(`\nStopping Server ${serverIndex + 1} (Port ${ports[serverIndex]})...`);
        
        servers[serverIndex].close(() => {
            console.log(`Server ${serverIndex + 1} stopped.`);
        });
        servers[serverIndex] = null;

    } else {
        console.log('Invalid server number. Please enter a number between 1 and 5.');
    }
    console.log("\nEnter another server number (1-5) to stop, or press Ctrl+C to exit:");
});

console.log("\nEnter a server number (1-5) to stop it:");