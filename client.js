// client.js

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'dev'}`
});



const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('greeter.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

const PORT = process.env.PORT || 50051;

const client = new greeterPackage.Greeter(
  `localhost:${PORT}`,
  grpc.credentials.createInsecure()
);

console.log("ENV:", process.env.NODE_ENV);

// Make the call
client.SayHello({ name: 'Stevie' }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Greeting:', response.message);
});