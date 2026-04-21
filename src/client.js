
/**
 * Simple CLI client for the gRPC Greeter service.
 *
 * - Sends a single request and exits.
 * - Accepts optional CLI arguments:
 *     node src/client.js <name> <age?> <password?>
 * - Falls back to default values when arguments are not provided.
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
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../proto/greeter.proto');
const PORT = 50051;

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

// --- CLI args ---
const [, , nameArg, ageArg, pswdArg] = process.argv;

// Here is where you determine values to pass. Either the CLI args or hard-coded values.
const name = nameArg || 'Stevie';
const age = ageArg ? parseInt(ageArg, 10) : undefined;
const pswd = pswdArg || 'asdf';

// --- client ---
const client = new greeterPackage.Greeter(
  `localhost:${PORT}`,
  grpc.credentials.createInsecure()
);

// timing
const start = process.hrtime.bigint();

// --- output ---
console.log(cyan(`[CLIENT] Sending request...`));
console.log(cyan(`[CLIENT] name=${name}${age ? ` age=${age}` : ''}`));
// console.log(`[CLIENT] name=${name} age=${age ?? 'N/A'}`);

client.SayHello({ name, age, pswd }, (err, response) => {
  const end = process.hrtime.bigint();
  const durationMs = Number(end - start) / 1e6;

  if (err) {
    console.error(red(`[ERROR ${err.code}] ${err.message}`));
    console.log(yellow(`[TIMING] Failed after ${durationMs.toFixed(2)} ms`));
    return;
  }

  console.log('\n' + green('[SERVER RESPONSE]'));
  console.log(response.message);

  console.log('\n' + yellow(`[TIMING] Response received in ${durationMs.toFixed(2)} ms`));
});

