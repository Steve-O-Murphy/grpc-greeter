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

1. `npm install`

1. `node server.js`

1. `node client.js`

# Documentation

## Overview

The Greeter service provides a simple RPC endpoint for generating personalized greetings with optional authentication.

## Service Definition

### Service Definition

Service: `Greeter`

| Method | Type | Descripton |
| :-------- | :-------- |
| SayHello | Unary | Returns a greeting message based on input parameters |

### RPC Method Details

`SayHello`

**Request Type:** `HelloRequest`
**Response Type:** `HelloReply`

#### Request Fields

| Column 1 | Column 2 | Column 3 | Column 4 |
|----------|----------|----------|----------|
| Row 1 A  | Row 1 B  | Row 1 C  | Row 1 D  |
| Row 2 A  | Row 2 B  | Row 2 C  | Row 2 D  |
| Row 3 A  | Row 3 B  | Row 3 C  | Row 3 D  |





