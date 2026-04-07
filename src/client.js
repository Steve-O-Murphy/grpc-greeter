// client.js
const path = require('path');


require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'dev'}`
});

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../proto/greeter.proto')
);



const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

const PORT = process.env.PORT || 50051;

const client = new greeterPackage.Greeter(
  `localhost:${PORT}`,
  grpc.credentials.createInsecure()
);


// Do this for readability.
const helloObject = {
  name: 'Stevie', 
  age: 29, 
  pswd: 'asdf'
};


  console.log('\n🚀 [CLIENT] Sending request...');
  console.log('[CLIENT] Payload:', helloObject);

  // Make the call
  client.SayHello(helloObject, (err, response) => {
  console.log('\n📥 [CLIENT] Response received');
  if (err) {
    console.error('[CLIENT] Error:', err);
    return;
  }
  console.log();
  console.log(response.message);
  console.log();
});