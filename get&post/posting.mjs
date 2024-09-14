import { createServer } from 'http';

// Create the server
const server = createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/item') {
        let body = '';

        // Listen for data from the request
        req.on('data', chunk => {
            body += chunk.toString(); // Convert buffer to string
        });

        // When the data is fully received, process it
        req.on('end', () => {
            try {
                // Parse the received JSON data
                const parsedData = JSON.parse(body);

                console.log('Data received:', parsedData);

                // Send a response back to the client
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Data received successfully!',
                    data: parsedData
                }));
            } catch (error) {
                // Handle parsing errors
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
    } else {
        // Handle requests that are not POST or don't match the route
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});