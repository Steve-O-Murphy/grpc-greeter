// server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('greeter.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

// Implement the service
function sayHello(call, callback) {
  const name = call.request.name;
  callback(null, { message: `Hello, ${name}!` });
}

const server = new grpc.Server();

server.addService(greeterPackage.Greeter.service, {
  SayHello: sayHello,
});

server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log('Server running at http://0.0.0.0:50051');
    server.start();
  }
);