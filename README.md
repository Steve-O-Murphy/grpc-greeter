## TOC

[About this project](#-about-this-project)
[Service Documentation](#service-documentation)
[Running the service](#️-running-the-service)
[Testing the service](#-testing)


# 🚀 About this project
Demonstrates my knowledge of gRPC and my ability to effectively document a service. Consists of:

- a server waiting for requests
- a client that sends a request

Includes automated tests (Jest).

If you want to dive in and run the server and client, skip to [Running the service](#️-running-the-service). Otherwise, keep reading.


# Service Documentation

## 📖 Overview

The Greeter service provides a simple RPC endpoint for generating personalized greetings with  authentication.
**Note:** gRPC includes true authentication; this project implements it as part of server business logic.


## 📁 Project Structure

```bash
project-root/
├── proto/
│   └── greeter.proto # gRPC service definitions
├── src # client + server implementation
│   ├── app.js
│   ├── client.js
│   └── server.js
├── test # unit/integration tests
│   └── greeter.test.js
│── README.md
└── package.json
```

## 📜 Service Definition

Service: `Greeter`

| Method | Type | Description |
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


### 🧪 Request/Response Examples

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
| PORT | Server port (default: 50051) |
| PSWD | Expected  password value |
| NODE_ENV | Environment (`dev` or `prod`) |


### Error Handling

|Scenario|Behavior|
|:----------|:----------|
| Invalid password | Returns error message in response |
| Missing fields | Uses defaults |
| Server unavailable | Client receives gRPC error |

### How It Works

#### Overview
1. Client constructs HelloRequest

1. gRPC serializes request using protobuf

1. Request sent over HTTP/2

1. Server receives and deserializes request

1. Business logic executes

1. Response returned to client

#### System flow--server

1. User runs `npm run start`
1. server.js runs the code in app.js
1. app.js defines and exports the PORT, and the `startServer` function

### ▶️ Running the service

#### Start Server (dev)

In one shell, run 

```bash
npm run start
```

#### Run Client 
In another shell, run

```bash
npm run client
```


### 🧪 Testing
Run 

`npm test`

