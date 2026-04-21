/**
 * Core application logic for the gRPC service.
 *
 * - Defines service implementation (business logic).
 * - Exposes `createServer` for constructing a configured gRPC server.
 * - Keeps logic separate from runtime concerns (see server.js).
 */

// Load dependencies
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Define port, which will be exported to server.js and used in its `server.bindAsync`
const PORT = 50051;
const PASSWORD = 'asdf';

// Lode the .proto file
const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../proto/greeter.proto')
);

// Convert to gRPC object
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

// Business logic. `name`, `age`, and `pswd`
function sayHello(call, callback) {
  const { name, age, pswd } = call.request;

if (!pswd) {
  return callback({
    code: grpc.status.INVALID_ARGUMENT,
    message: 'Password is required',
  });
}

if (pswd !== PASSWORD) {
  return callback({    
    code: grpc.status.PERMISSION_DENIED,
    message: 'Incorrect password',
  });
}


  const date = new Date();
  const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  const message = age
    ? `Hello, ${name}! You are ${age} years old.\nToday is ${fullDate}`
    : `Hello, ${name}!\nToday is ${fullDate}`;

  callback(null, { message });
}

// Define createServer. Factory that builds a configured server.
function createServer() {
  // Create server instance, a new empty gRPC server.
  const server = new grpc.Server();

  // Register the Greeter service.
  server.addService(greeterPackage.Greeter.service, {
    // This wires incoming `SayHello` to the handler `sayHello`
    // The server knows if any calls `SayHello`, run the `sayHello` function.
    SayHello: sayHello,
  });

  // Back to function `startServer` in `server.js`
  return server;
}

// Exports things needed by server.js
module.exports = { createServer, PORT };