import { createServer } from 'http';

let storedData = []; // Array to store POST data

// Create the server
const server = createServer((req, res) => {
    // Handle POST request
    if (req.method === 'POST' && req.url === '/api/data') {
        let body = '';

        // Listen for data chunks from the request
        req.on('data', chunk => {
            body += chunk.toString(); // Convert buffer to string
        });

        // Once all the data is received, process it
        req.on('end', () => {
            try {
                // Parse the received JSON data
                const parsedData = JSON.parse(body);

                // Store the received data
                storedData.push(parsedData);

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

    // Handle GET request to fetch stored data
    } else if (req.method === 'GET' && req.url === '/api/data') {
        // Send the stored data as JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Data retrieved successfully!',
            data: [
                {
                    "name": "farhad ullah",
                    "age": 20
                }
            ]
        }));

    // Handle other routes or methods
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
