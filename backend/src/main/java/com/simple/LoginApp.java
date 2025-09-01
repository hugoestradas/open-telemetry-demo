package com.simple;

import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.Map;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginApp {

    @Inject
    Tracer tracer;

    @POST
    @Path("/login")
    public Map<String, Object> login(Map<String, String> request) {
        Span span = tracer.spanBuilder("login").startSpan();
        
        try {
            String user = request.get("username");
            String pass = request.get("password");
            
            span.setAttribute("user", user);
            
            // Simple auth - KISS principle
            boolean valid = ("admin".equals(user) && "password".equals(pass)) || 
                           ("demo".equals(user) && "demo".equals(pass));
            
            if (valid) {
                span.setAttribute("result", "success");
                return Map.of(
                    "success", true,
                    "message", "Login successful!",
                    "token", "simple-token-" + user
                );
            } else {
                span.setAttribute("result", "failed");
                return Map.of(
                    "success", false,
                    "message", "Invalid credentials"
                );
            }
        } finally {
            span.end();
        }
    }

    @GET
    @Path("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
