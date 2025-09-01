# OpenTelemetry Integration Technical Guide

## How OpenTelemetry Works in Our Demo Application

### 1. Automatic vs Manual Instrumentation

#### Automatic Instrumentation (Quarkus Provides)
Quarkus automatically instruments:
- **HTTP Requests**: All incoming REST endpoints
- **HTTP Client Calls**: Outbound HTTP requests
- **Database Queries**: JPA/Hibernate operations
- **Message Queues**: If using messaging extensions

#### Manual Instrumentation (We Added)
We manually added spans for:
- **Business Logic**: Authentication workflow
- **Custom Operations**: Credential validation, token generation
- **Error Scenarios**: Exception handling and recording

### 2. Span Lifecycle Management

```java
// Proper span lifecycle in our AuthService
public LoginResponse authenticate(String username, String password) {
    // 1. Create span
    Span span = tracer.spanBuilder("auth.authenticate")
            .setAttribute("user.name", username)
            .startSpan();
    
    try (Scope scope = span.makeCurrent()) {
        // 2. Make span current (for context propagation)
        // 3. Do work and add attributes
        if (isValidCredentials(username, password)) {
            span.setAttribute("auth.result", "success");
            return new LoginResponse(true, "Success", generateToken(username));
        } else {
            span.setAttribute("auth.result", "failure");
            return new LoginResponse(false, "Invalid credentials", null);
        }
    } catch (Exception e) {
        // 4. Record exceptions
        span.recordException(e);
        throw e;
    } finally {
        // 5. Always end the span
        span.end();
    }
}
```

### 3. Context Propagation

OpenTelemetry automatically propagates trace context:

```
HTTP Request Headers:
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
```

This ensures:
- Child spans are properly linked to parent spans
- Distributed traces work across service boundaries
- Baggage (custom context) can be propagated

### 4. Span Attributes Best Practices

#### What We Include:
```java
span.setAttribute("user.name", username);           // Business context
span.setAttribute("auth.result", "success");        // Operation result
span.setAttribute("http.method", "POST");           // Technical context
span.setAttribute("validation.result", isValid);    // Step-by-step results
```

#### What to Avoid:
- Passwords or sensitive data
- Large payloads or objects
- Rapidly changing values (like timestamps)
- Non-essential debug information

### 5. Sampling Strategies

#### Default Sampling (What We Use):
```properties
# Sample all traces (good for demo, not production)
quarkus.otel.traces.sampler=always_on
```

#### Production Sampling Options:
```properties
# Sample 10% of traces
quarkus.otel.traces.sampler=traceidratio
quarkus.otel.traces.sampler.arg=0.1

# Custom sampling based on attributes
quarkus.otel.traces.sampler=parentbased_traceidratio
```

### 6. Export Configuration

#### Our OTLP Configuration:
```properties
# Export to Jaeger via OTLP
quarkus.otel.exporter.otlp.traces.endpoint=http://jaeger:14250
quarkus.otel.exporter.otlp.traces.protocol=grpc

# Alternative: Direct Jaeger export
# quarkus.otel.exporter.jaeger.endpoint=http://jaeger:14268/api/traces
```

#### Export Formats:
- **OTLP/gRPC**: Modern, efficient (what we use)
- **OTLP/HTTP**: HTTP-based alternative
- **Jaeger**: Direct Jaeger protocol
- **Zipkin**: Zipkin-compatible format

### 7. Performance Considerations

#### Instrumentation Overhead:
- **Minimal CPU impact**: < 5% typically
- **Memory usage**: Small per-span overhead
- **Network**: Asynchronous export doesn't block requests

#### Optimization Techniques:
```java
// Use span builders efficiently
private static final String SPAN_NAME = "auth.authenticate";

// Reuse attribute keys
private static final AttributeKey<String> USER_NAME = 
    AttributeKey.stringKey("user.name");

span.setAttribute(USER_NAME, username);
```

### 8. Error Handling and Debugging

#### Exception Recording:
```java
try {
    // Business logic
} catch (Exception e) {
    span.setStatus(StatusCode.ERROR, "Authentication failed");
    span.recordException(e);
    throw e;
}
```

#### Debugging Missing Traces:
1. **Check configuration**: Verify exporter endpoint
2. **Verify sampling**: Ensure traces aren't being dropped
3. **Check logs**: Look for OpenTelemetry startup messages
4. **Network connectivity**: Ensure Jaeger is reachable
5. **Service name**: Verify service appears in Jaeger dropdown

### 9. Production Deployment Considerations

#### Resource Management:
```properties
# Batch export for efficiency
otel.bsp.max.export.batch.size=512
otel.bsp.export.timeout=30000
otel.bsp.schedule.delay=5000

# Resource limits
otel.resource.attributes=service.name=login-demo,service.version=1.0.0
```

#### Security:
- Use HTTPS for trace export in production
- Configure authentication for Jaeger access
- Sanitize sensitive data before adding to spans
- Implement proper access controls

### 10. Monitoring the Monitoring

#### Key Metrics to Watch:
- **Trace export success rate**: Are traces reaching Jaeger?
- **Instrumentation overhead**: CPU/memory impact
- **Span drop rate**: Are we losing data due to limits?
- **Export latency**: How long does trace export take?

#### Health Checks:
```java
// Add OpenTelemetry health check
@ApplicationScoped
public class TracingHealthCheck implements HealthCheck {
    
    @Override
    public HealthCheckResponse call() {
        // Verify tracing is working
        return HealthCheckResponse.up("tracing");
    }
}
```

### 11. Advanced Features Available

#### Baggage (Cross-Service Context):
```java
// Add baggage for cross-service propagation
Baggage baggage = Baggage.current()
    .with("user.id", userId)
    .with("request.id", requestId);

try (Scope scope = baggage.makeCurrent()) {
    // Baggage automatically propagates to downstream services
}
```

#### Custom Metrics:
```java
@Inject
LongCounter loginAttempts;

@PostConstruct
void initMetrics() {
    loginAttempts = GlobalMeterProvider.get()
        .get("login-demo")
        .counterBuilder("login_attempts_total")
        .setDescription("Total login attempts")
        .build();
}

public void recordLogin(boolean success) {
    loginAttempts.add(1, 
        Attributes.of(AttributeKey.booleanKey("success"), success));
}
```

### 12. Integration with Other Tools

#### Correlation with Logs:
```java
// Automatically correlate logs with traces
@ConfigProperty(name = "quarkus.log.console.format")
String logFormat = "%d{HH:mm:ss} %-5p traceId=%X{traceId}, spanId=%X{spanId} %c{2.}: %s%e%n";
```

#### APM Integration:
- Works with Elastic APM, Datadog, New Relic
- Most APMs support OpenTelemetry ingestion
- Use OTLP export for vendor-neutral approach

### 13. Troubleshooting Common Issues

#### No Traces Appearing:
1. Check Jaeger connectivity: `curl http://localhost:16686`
2. Verify service name in configuration
3. Check sampling configuration
4. Look for export errors in logs

#### Incomplete Traces:
1. Verify context propagation
2. Check span lifecycle management
3. Ensure all spans are properly ended
4. Verify exception handling doesn't break traces

#### Performance Issues:
1. Review sampling strategy
2. Check batch export configuration
3. Monitor resource usage
4. Consider async instrumentation patterns

### 14. Demo-Specific Implementation Details

#### Why We Use Thread.sleep():
```java
// Simulate realistic processing time for demo
Thread.sleep(100); // Database call simulation
Thread.sleep(50);  // Validation simulation
Thread.sleep(25);  // Token generation simulation
```

This makes traces more interesting and realistic for demonstration purposes.

#### Demo Credentials Logic:
```java
// Simple validation for demo
private boolean isValidCredentials(String username, String password) {
    return ("admin".equals(username) && "password".equals(password)) ||
           ("demo".equals(username) && "demo".equals(password));
}
```

Real applications would integrate with actual authentication systems.

### 15. Next Steps for Production

1. **Add Metrics**: Complement traces with custom metrics
2. **Log Correlation**: Link logs to traces automatically
3. **Alerting**: Set up alerts on trace-derived metrics
4. **Dashboards**: Create Grafana dashboards from trace data
5. **SLO Monitoring**: Use traces to monitor service level objectives

This technical foundation provides the observability needed for modern distributed applications while maintaining minimal overhead and maximum insight.
