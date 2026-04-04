// client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('greeter.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

const client = new greeterPackage.Greeter(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Make the call
client.SayHello({ name: 'Stevie' }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Greeting:', response.message);
});