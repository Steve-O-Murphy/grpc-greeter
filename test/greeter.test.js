/**
 * Integration tests for the Greeter gRPC service.
 *
 * - Starts the server using the exported `startServer` function.
 * - Verifies both success and failure scenarios.
 */

const { startServer } = require('../src/server');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.join(__dirname, '../proto/greeter.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const greeterPackage = grpcObject.greeter;

let server;

beforeAll((done) => {
  startServer((err, srv) => {
    server = srv;
    done(err);
  });
});



afterAll((done) => {
  if (server) {
    server.tryShutdown(() => {
      done();
    });
  } else {
    done();
  }
});

// Pass correct password
test('returns greeting with valid password', (done) => {
  const client = new greeterPackage.Greeter(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  client.SayHello(
    { name: 'Stevie', age: 29, pswd: 'asdf' },
    (err, response) => {
      expect(err).toBeNull();
      expect(response.message).toMatch(/Hello, Stevie/);
      done();
    }
  );
});


// Omit the passworod
test('rejects request with missing password', (done) => {
  const client = new greeterPackage.Greeter(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  client.SayHello(
    { name: 'Stevie', age: 29 }, // no pswd
    (err, response) => {
      expect(err).not.toBeNull();
      expect(err.code).toBe(grpc.status.INVALID_ARGUMENT);
      expect(err.message).toMatch(/Password is required/);
      done();
    }
  );
});



// Pass an incorrect password. The test passes because it expects the password to be wrong.
test('rejects request with invalid password', (done) => {
  const client = new greeterPackage.Greeter(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  client.SayHello(
    { name: 'Stevie', age: 29, pswd: 'wrong' },
    (err, response) => {
      expect(err).not.toBeNull();
      expect(err.code).toBe(grpc.status.PERMISSION_DENIED);
      expect(err.message).toMatch(/Incorrect password/);
      done();
    }
  );
});