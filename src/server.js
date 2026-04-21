/**
 * Entry point for starting the gRPC server.
 *
 * - Invoked via the `start` script in package.json.
 * - Delegates server creation to app.js (separation of concerns).
 * - Exports `startServer` so tests can spin up the server programmatically.
 */

// Add colors for console writes
const color = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const green = (text) => `${color.green}${text}${color.reset}`;
const red = (text) => `${color.red}${text}${color.reset}`;
const yellow = (text) => `${color.yellow}${text}${color.reset}`;
const cyan = (text) => `${color.cyan}${text}${color.reset}`;


// Define application-specific constants.
const grpc = require('@grpc/grpc-js');

/*
  This looks just like variable assignment, but `require('./app')` actually runs the logic in `app.js`
  We can reference `createServer` and `PORT` because `app.js` exports them.
  See comments in `app.server`.
*/
const { createServer, PORT } = require('./app');

function startServer(callback) {
  const server = createServer();
  
  /*
    Bind the server to a port.
    - Open a network socket
    - Reserve the port
    - Prepares to accept incoming connections
  */
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    // Server is live and listening on the port defined in `app.js`
    // Waiting for gRPC requests
    // Ready to route calls to `sayHello`
    (err, boundPort) => {
      if (err) return callback(err);

      console.log(cyan(`[SERVER] Running on port ${boundPort} 🚀`));
      callback(null, server);
    }
  );
}

// Entry point check.
if (require.main === module) {
  startServer((err) => {
    if (err) {
      console.error(red('[SERVER] Failed to start:', err));
      process.exit(1);
    }
  });
}

module.exports = { startServer };