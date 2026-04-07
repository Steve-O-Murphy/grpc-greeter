
const path = require('path');
const dotenv = require('dotenv');

// Establish the env
// two envs-- default to 'dev'
const env = process.env.NODE_ENV || 'dev';


// Load the correct env file
dotenv.config({ path: `.env.${env}` });
// Get password value
const envPswd = process.env.PSWD;
console.log('[SERVER] Expected password from env:', envPswd);


const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../proto/greeter.proto')
);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

// Implement the service
function sayHello(call, callback) {
  console.log('[SERVER] Type of request:', typeof call.request);
  console.log('\n📡 [SERVER] Incoming request received');
  console.log('[SERVER] Raw request object:', call.request);
  
  const date = new Date();
  const fullDate = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;

  

  // const name = call.request.name;
  // name and age
  const { name, age, pswd } = call.request;
  console.log(`[SERVER] Extracted → name: ${name}, age: ${age}, pswd: ${pswd}`);

  let message = '';
  
  if (pswd) {
    if (envPswd !== pswd) {
     console.log('[SERVER] ❌ Password mismatch'); 
      message = 'Incorrect password';
    } else {
      console.log('[SERVER] ✅ Password correct');
      message = age
        ? `Hello, ${name}! You are ${age} years old.\nToday is ${fullDate}`
        : `Hello, ${name}!\nToday is ${fullDate}`;
    }
  } else {
    console.log('[SERVER] ⚠️ No password provided');
    message = 'Error: Client must send a password.'
  }

  console.log('[SERVER] 📤 Sending response:', message);
  callback(null, { message });

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
    console.log();
    console.log('---------------------------------------------');
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    console.log('---------------------------------------------');
    console.log();
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