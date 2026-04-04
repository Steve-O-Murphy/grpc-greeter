# gPRC Greeter
A minimal Node.js service demonstrating high-performance RPC using Protocol Buffers.

gRPC is a modern communication framework that enables strongly typed, contract-first APIs over HTTP/2.
It uses Protocol Buffers (protobuf) for efficient binary serialization, resulting in faster and smaller payloads than REST/JSON.
Services are defined in .proto files and generate client/server code across multiple languages.
gRPC supports unary and streaming calls, making it suitable for real-time and distributed systems.
This project showcases a simple client-server interaction using dynamic proto loading in Node.js.

# Setup
Copy `.env.example` to a real `.env` file. `.gitignore` ignores `.env`.

`cp .env.example .env`

# Run Dockerless

1. `npm install`

1. `node server.js`

1. `node client.js`

# Run Dockerized

docker build -t grpc-greeter .