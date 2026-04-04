// server.js
require('dotenv').config();

const dotenv = require('dotenv');

// two envs-- default to 'dev'
const env = process.env.NODE_ENV || 'dev';

// Load the correct env file
dotenv.config({ path: `.env.${env}` });


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

const PORT = process.env.PORT || 50051;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    server.start();
  }
);

/*

Start the server in dev mode:
-----------------------------
node server.js
This is because the env is set to dev by default


Start the server in prod mode:
-----------------------------
You have to force it using  NODE_ENV="prod"


- Powershell
$env:NODE_ENV="prod"; node server.js

- Command prompt
set NODE_ENV=prod && node server.js

*/