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

Service: `Greeter`

| Method | Type | Descripton |
|:--------|:--------|:--------|
| SayHello | Unary | Returns a greeting message based on input parameters |

## RPC Method Details

`SayHello`

**Request Type:** `HelloRequest`

**Response Type:** `HelloReply`

### Request Fields

| Field | Type | Required | Description |
|:----------|:----------|:----------|:----------|
| name | string  | Yes | Name of the user |
| age  | int32  | No | User's age |
| password | string  | Optional | Password for authentication |

### Response Fields

| Field | Type | Description |
|:----------|:----------|:----------|
| message  | string | Greeting or error message |


### Request/Response Examples

Example Request

```json
{
  "name": "Stevie",
  "age": 29,
  "pswd": "asdf"
}
```

Example Response (Success)

```json
{
  "message": "Hello, Stevie! You are 29 years old."
}
```

Example Response (Error)
```json
{
  "message": "Incorrect password"
}
```

### Authentication Behavior

- Password is validated against environment configuration
- If invalid:
  - Service returns "Incorrect password"
- If missing:
  - Service ends

### Environment Configuration

|Variable|Description|
|:----------|:----------|
| PORT | Server port (dafault: 50051 |
| PSWD | Expected  password value |
| NODE_ENV | Environment (`dev` or `prod`) |


### Error Handling

|Scenario|Behavior|
|:----------|:----------|
| Invalid password | Returns error message in response |
| Missing fields | Uses defaults |
| Server unavailable | Client receives gRPC error |


### How It Works
1. Client constructs HelloRequest

1. gRPC serializes request using protobuf

1. Request sent over HTTP/2

1. Server receives and deserializes request

1. Business logic executes

1. Response returned to client


### Running the Service

``` bash
npm run client:dev
```

#### Start Server


#### Run Client 




