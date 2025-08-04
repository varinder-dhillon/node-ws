import WebSocket, { WebSocketServer } from 'ws';
import { createServer } from 'http';

const server = createServer((req:any, res:any)=>{
    console.log('Received request for:', req.url);
    res.end("Hi there!")
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Echo: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.send('Welcome to the WebSocket server!');
});

server.listen(8080, () => {
    console.log('HTTP server is listening on port 8080');
});