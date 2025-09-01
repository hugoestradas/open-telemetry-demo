# Simple Login with OpenTelemetry

Ultra-simple login app demonstrating OpenTelemetry distributed tracing.

## What It Does
- Simple login form (React)
- Basic authentication (Java Quarkus) 
- Distributed tracing (OpenTelemetry + Jaeger)
- Everything runs in Docker

## Quick Start

```bash
docker-compose up --build
```

## Access Points
- **App**: http://localhost:3000
- **API**: http://localhost:8080/api/health  
- **Traces**: http://localhost:16686

## Demo Credentials
- `admin` / `password`
- `demo` / `demo`

## How It Works

### 1. Frontend (React)
Single component with a login form. Sends POST to `/api/login`.

### 2. Backend (Quarkus)
Single file with:
- Login endpoint
- Simple credential check  
- OpenTelemetry tracing

### 3. Tracing (Jaeger)
- Automatic HTTP tracing
- Custom business logic spans
- Zero configuration required

## File Structure
```
├── backend/
│   └── src/main/java/com/simple/LoginApp.java  # Everything in one file
├── frontend/  
│   └── src/App.js                              # Simple React form
└── docker-compose.yml                          # Run everything
```

## OpenTelemetry Integration

### Backend Tracing
```java
Span span = tracer.spanBuilder("login").startSpan();
span.setAttribute("user", username);
span.setAttribute("result", valid ? "success" : "failed");
span.end();
```

### Configuration
```properties
quarkus.application.name=simple-login
quarkus.otel.exporter.otlp.traces.endpoint=http://jaeger:14250
```

That's it! KISS principle in action.

## Demo Flow
1. Open app at localhost:3000
2. Try login with demo credentials  
3. Check Jaeger at localhost:16686
4. See traces with custom attributes

## Stop
```bash
docker-compose down
```
