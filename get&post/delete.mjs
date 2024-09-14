import { createServer } from 'http';
                                                            
// In-memory list of users (example data)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// Create the server
const server = createServer((req, res) => {
    if (req.method === 'DELETE' && req.url === '/api/user') {
        let body = '';

        // Listen for data from the request
        req.on('data', chunk => {
            body += chunk.toString(); // Convert buffer to string
        });

        // When the data is fully received, process it
        req.on('end', () => {
            try {  
                // Parse the received JSON data (e.g., a user ID to delete)
                const parsedData = JSON.parse(body);
                const userId = parsedData.id; // Expecting user ID in the request body

                // Find the index of the user to delete
                const userIndex = users.findIndex(user => user.id === userId);

                if (userIndex !== -1) {
                    // Delete the user from the list
                    const deletedUser = users.splice(userIndex, 1);

                    // Send a success response
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        message: 'User deleted successfully!',
                        user: deletedUser[0] // Return the deleted user data
                    }));
                } else {
                    // If user is not found
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }

            } catch (error) {
                // Handle parsing errors
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
    } else {
        // Handle requests that are not DELETE or don't match the route
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
