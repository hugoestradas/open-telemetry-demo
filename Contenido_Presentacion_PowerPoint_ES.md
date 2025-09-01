# Presentación PowerPoint: Demo Simple de OpenTelemetry
## Contenido Completo de Diapositivas y Notas del Presentador

---

## Diapositiva 1: Diapositiva de Título
**Título:** OpenTelemetry en Acción
**Subtítulo:** Aplicación Simple de Login con Trazado Distribuido
**Lema:** Del Código a las Perspectivas en 5 Minutos
**Tu Nombre y Fecha:** [Tu Nombre] - Septiembre 2025

**Elementos Visuales:**
- Logo de OpenTelemetry
- Logo de Jaeger
- Icono simple de diagrama de red
- Fondo limpio y profesional

**Notas del Presentador:**
- Bienvenidos a esta demostración práctica de OpenTelemetry
- Hoy veremos cómo agregar observabilidad poderosa a cualquier aplicación
- Usaremos una aplicación deliberadamente simple para enfocarnos en los conceptos de trazado
- Todo lo que vean puede implementarse en menos de 100 líneas de código

---

## Diapositiva 2: Por Qué Importa Esta Demo
**El Desafío:**
- Las aplicaciones modernas son distribuidas y complejas
- El logging tradicional no es suficiente
- Necesitamos rastrear solicitudes a través de servicios
- Los problemas de rendimiento son difíciles de encontrar

**La Solución:**
- OpenTelemetry proporciona trazado distribuido
- Ver el viaje completo de la solicitud
- Identificar cuellos de botella instantáneamente
- Depurar con contexto, no adivinanzas

**Elementos Visuales:**
- Diagrama de comparación Antes/Después
- Ilustración de complejidad de microservicios
- Lupa sobre sistema distribuido

**Notas del Presentador:**
- Incluso las aplicaciones simples se benefician de la observabilidad
- OpenTelemetry es el estándar de la industria para trazado
- Es neutral al proveedor y funciona con cualquier backend
- Las habilidades que aprendan se aplican a cualquier escala de aplicación

---

## Diapositiva 3: Nuestra Arquitectura Simple de Demo
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Frontend React │───▶│ Backend Quarkus │───▶│ Trazado Jaeger  │
│ (localhost:3000)│    │ (localhost:8080)│    │(localhost:16686)│
│                 │    │                 │    │                 │
│ • Form de Login │    │ • Archivo Único │    │ • Almacén Trazas│
│ • 50 líneas CSS │    │ • 50 líneas Java│    │ • Análisis Visual│
│ • Config Cero   │    │ • OpenTelemetry │    │ • Config Cero   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Principio KISS Aplicado:**
- **Keep** (Mantener): Funcionalidad core y trazado
- **It** (Eso): Enfocado en lo esencial
- **Simple** (Simple): Un archivo por componente
- **Stupid** (Estúpido): Tan simple que cualquiera puede entender

**Notas del Presentador:**
- Deliberadamente simple para enfocarnos en conceptos de OpenTelemetry
- Cada componente tiene una responsabilidad clara
- Las aplicaciones del mundo real siguen los mismos patrones, solo a mayor escala
- La complejidad está en la observabilidad, no en la aplicación

---

## Diapositiva 4: Integración OpenTelemetry - De Cero a Héroe

### Paso 1: Agregar Dependencia (1 línea)
```xml
<dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-opentelemetry</artifactId>
</dependency>
```

### Paso 2: Configurar Endpoint (2 líneas)
```properties
quarkus.application.name=simple-login
quarkus.otel.exporter.otlp.traces.endpoint=http://jaeger:14250
```

### Paso 3: Agregar Trazado Personalizado (3 líneas)
```java
Span span = tracer.spanBuilder("login").startSpan();
span.setAttribute("user", username);
span.end();
```

**¡Eso es Todo! 🎉**

**Notas del Presentador:**
- La integración de OpenTelemetry es sorprendentemente simple
- Quarkus proporciona auto-instrumentación lista para usar
- Los spans personalizados agregan contexto de negocio a las trazas técnicas
- La mayor parte de la "magia" sucede automáticamente

---

## Diapositiva 5: El Código Completo del Backend
```java
@Path("/api")
public class LoginApp {
    @Inject Tracer tracer;

    @POST @Path("/login")
    public Map<String, Object> login(Map<String, String> request) {
        Span span = tracer.spanBuilder("login").startSpan();
        
        try {
            String user = request.get("username");
            String pass = request.get("password");
            
            span.setAttribute("user", user);
            
            // Autenticación simple - principio KISS
            boolean valid = ("admin".equals(user) && "password".equals(pass)) || 
                           ("demo".equals(user) && "demo".equals(pass));
            
            span.setAttribute("result", valid ? "success" : "failed");
            
            return Map.of(
                "success", valid,
                "message", valid ? "¡Login exitoso!" : "Credenciales inválidas",
                "token", valid ? "simple-token-" + user : null
            );
        } finally {
            span.end();
        }
    }
}
```

**50 líneas. Ese es todo el backend.**

**Notas del Presentador:**
- Esta es la implementación completa del backend
- Noten cómo el trazado está entretejido en la lógica de negocio
- Los atributos de span proporcionan contexto de negocio
- Try/finally asegura que los spans siempre se cierren
- Las aplicaciones reales siguen exactamente este patrón

---

## Diapositiva 6: Instrumentación Automática vs Manual

### 🤖 Automática (Quarkus Proporciona)
- ✅ Solicitudes/respuestas HTTP
- ✅ Consultas de base de datos
- ✅ Llamadas a APIs externas
- ✅ Colas de mensajes
- ✅ Propagación de contexto

### 👋 Manual (Nosotros Agregamos)
- ✅ Spans de lógica de negocio
- ✅ Atributos personalizados
- ✅ Condiciones de error
- ✅ Marcadores de rendimiento
- ✅ Contexto de usuario

### 🎯 Resultado: Visibilidad Completa
Cada solicitud genera una traza con contexto técnico y de negocio.

**Notas del Presentador:**
- OpenTelemetry te da 80% de observabilidad automáticamente
- La instrumentación manual agrega el contexto de negocio que importa
- La combinación proporciona visibilidad completa de solicitudes
- Comienza con automático, agrega manual donde agregue valor

---

## Diapositiva 7: Docker - Demo de Un Comando

### docker-compose.yml (Simplificado)
```yaml
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports: ["16686:16686", "14250:14250"]

  backend:
    build: ./backend
    ports: ["8080:8080"]
    environment:
      - QUARKUS_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://jaeger:14250

  frontend:
    build: ./frontend
    ports: ["3000:80"]
```

### Inicio con Un Comando
```bash
docker-compose up --build
```

**Notas del Presentador:**
- Stack completo de observabilidad en un comando
- Jaeger proporciona tanto colección como visualización
- Las variables de entorno configuran la conexión
- El mismo patrón funciona para cualquier entorno de despliegue

---

## Diapositiva 8: ¡Tiempo de Demo en Vivo! 🎬

### Lo Que Veremos:
1. **🚀 Iniciar Todo**
   - `docker-compose up --build`
   - Tres servicios inician automáticamente

2. **🌐 Usar la Aplicación**
   - Formulario simple de login en localhost:3000
   - Probar escenarios de éxito y falla

3. **🔍 Analizar Trazas**
   - UI de Jaeger en localhost:16686
   - Ver spans, timing y atributos

4. **📊 Descubrir Insights**
   - Desglose de duración de solicitudes
   - Patrones de éxito vs falla
   - Seguimiento de comportamiento de usuario

**Notas del Presentador:**
- Comenzaremos con la aplicación ejecutándose
- Enfócate en los aspectos de trazado, no en la funcionalidad de la app
- Muestra cómo las trazas aparecen en tiempo real
- Destaca el valor de negocio de los insights

---

## Diapositiva 9: Recorrido por la UI de Jaeger

### 🔍 Encontrando Trazas
- **Servicio**: Seleccionar "simple-login"
- **Operación**: Elegir "login" o "GET /"
- **Rango de Tiempo**: Última hora
- **Etiquetas**: Filtrar por usuario, resultado, etc.

### 📊 Análisis de Trazas
- **Línea de Tiempo**: Ver duración de solicitud
- **Spans**: Profundizar en componentes
- **Atributos**: Contexto de negocio
- **Errores**: Spans rojos muestran problemas

### 🎯 Insights Clave
- ¿Qué operaciones son lentas?
- ¿Cuál es la tasa de error?
- ¿Cómo se comportan los usuarios?
- ¿Dónde están los cuellos de botella?

**Notas del Presentador:**
- La UI de Jaeger es intuitiva y poderosa
- Las capacidades de filtrado ayudan a encontrar escenarios específicos
- Los detalles de span proporcionan contexto de depuración
- Aquí es donde el valor de negocio se vuelve claro

---

## Diapositiva 10: Lo Que Muestra una Traza de Login Exitoso

```
📊 Traza de Login Exitoso (Total: ~150ms)
├── 🌐 HTTP GET / (5ms)
│   └── Frontend carga
├── 🔐 HTTP POST /api/login (145ms)
│   ├── 🛡️ span login (140ms)
│   │   ├── user: "demo"
│   │   ├── result: "success"
│   │   └── token: "simple-token-demo"
│   └── 📤 Respuesta enviada (5ms)
```

### Atributos Clave Capturados:
- **Técnicos**: http.method, http.status_code, http.route
- **Negocio**: user, result, token
- **Rendimiento**: span.duration, timing de operación
- **Contexto**: trace.id, span.id para correlación

**Notas del Presentador:**
- Esta vista jerárquica muestra el flujo completo de la solicitud
- La información de timing ayuda a identificar cuellos de botella
- Los atributos de negocio proporcionan contexto de depuración
- Los atributos técnicos se capturan automáticamente

---

## Diapositiva 11: Login Fallido vs Login Exitoso

### 🔴 Patrón de Login Fallido
```
❌ Login Fallido (Total: ~50ms)
└── 🔐 span login
    ├── user: "usuarioIncorrecto"
    ├── result: "failed"
    └── Sin token generado
```

### ✅ Patrón de Login Exitoso
```
✅ Login Exitoso (Total: ~150ms)
└── 🔐 span login
    ├── user: "demo"
    ├── result: "success"
    └── token: "simple-token-demo"
```

### 📈 Diferencias Observables:
- **Duración**: Los logins fallidos son más rápidos (sin generación de token)
- **Atributos**: Campo resultado muestra éxito/falla
- **Patrones**: Puede identificar intentos de fuerza bruta
- **Experiencia de Usuario**: Medir rendimiento de autenticación

**Notas del Presentador:**
- El trazado revela patrones no visibles en logs
- Las diferencias de rendimiento cuentan una historia
- Los equipos de seguridad pueden identificar patrones de ataque
- Los equipos de producto pueden optimizar la experiencia de usuario

---

## Diapositiva 12: Beneficios del Mundo Real

### 🔧 Beneficios de Desarrollo
- **Depuración Más Rápida**: Ver puntos exactos de falla
- **Optimización de Rendimiento**: Identificar operaciones lentas
- **Pruebas de Integración**: Verificar flujos de solicitudes
- **Calidad de Código**: Entender patrones de uso reales

### 🚀 Beneficios de Producción
- **Respuesta a Incidentes**: Análisis rápido de causa raíz
- **Experiencia de Usuario**: Monitorear viajes reales de usuario
- **Planificación de Capacidad**: Entender uso de recursos
- **Monitoreo de SLA**: Rastrear rendimiento de servicio

### 💰 Valor de Negocio
- **Tiempo de Inactividad Reducido**: Resolución más rápida de problemas
- **Mejor UX**: Mejoras proactivas de rendimiento
- **Optimización de Costos**: Identificar operaciones ineficientes
- **Decisiones Basadas en Datos**: Insights de uso real

**Notas del Presentador:**
- Conectar capacidades técnicas con resultados de negocio
- Enfatizar el ROI de la inversión en observabilidad
- Estos beneficios escalan con la complejidad de la aplicación
- Comenzar simple, hacer crecer la práctica de observabilidad

---

## Diapositiva 13: Ecosistema OpenTelemetry

### 🛠️ Instrumentación
- **20+ Lenguajes**: Java, Python, Go, .NET, Node.js...
- **Auto-Instrumentación**: Frameworks, bases de datos, HTTP
- **Instrumentación Manual**: Lógica de negocio, métricas personalizadas

### 📊 Backends
- **Jaeger**: Trazado distribuido (lo que usamos)
- **Zipkin**: Backend alternativo de trazado
- **Prometheus**: Colección de métricas
- **Grafana**: Dashboards y visualización

### ☁️ Proveedores de Nube
- **AWS X-Ray**: Servicio de trazado de Amazon
- **Google Cloud Trace**: Trazado de GCP
- **Azure Monitor**: Solución de Microsoft
- **Todos soportan datos de OpenTelemetry**

**Notas del Presentador:**
- OpenTelemetry es verdaderamente neutral al proveedor
- Comenzar con un backend, cambiar sin cambiar código
- Ecosistema creciente de herramientas e integraciones
- Inversión a prueba de futuro en observabilidad

---

## Diapositiva 14: Hoja de Ruta de Implementación

### 🏃‍♂️ Semana 1: Comenzar Simple
- Agregar OpenTelemetry a un servicio
- Configurar Jaeger localmente
- Instrumentar operaciones críticas
- Entrenar al equipo en lo básico

### 🚶‍♂️ Mes 1: Expandir Cobertura
- Agregar más servicios al trazado
- Crear spans personalizados para lógica de negocio
- Configurar dashboards de monitoreo
- Establecer políticas de retención de trazas

### 🏃‍♀️ Trimestre 1: Características Avanzadas
- Implementar métricas personalizadas
- Configurar alertas en datos de trazas
- Crear monitoreo de SLO
- Optimizar estrategias de muestreo

### 🎯 Largo Plazo: Cultura de Observabilidad
- Desarrollo guiado por trazas
- Pruebas de regresión de rendimiento
- Análisis de viaje del cliente
- Optimización continua

**Notas del Presentador:**
- Comenzar pequeño y construir momentum
- Enfocarse en operaciones de alto valor primero
- Construir experiencia del equipo gradualmente
- La observabilidad se convierte en parte del proceso de desarrollo

---

## Diapositiva 15: Mejores Prácticas de Nuestra App Simple

### ✅ Hacer Esto
```java
// Nombres de span significativos
tracer.spanBuilder("user_authentication")

// Atributos relevantes al negocio
span.setAttribute("user.id", userId);
span.setAttribute("auth.method", "password");

// Manejo apropiado de errores
span.setStatus(StatusCode.ERROR);
span.recordException(exception);

// Siempre cerrar spans
try (Scope scope = span.makeCurrent()) {
    // trabajo aquí
} finally {
    span.end();
}
```

### ❌ Evitar Esto
- Nombres de span genéricos como "process" o "handle"
- Incluir datos sensibles en atributos
- Crear spans para cada operación pequeña
- Olvidar terminar spans

**Notas del Presentador:**
- Calidad sobre cantidad en instrumentación
- El contexto de negocio es más valioso que el detalle técnico
- Las consideraciones de seguridad y privacidad son importantes
- El manejo apropiado del ciclo de vida del span previene memory leaks

---

## Diapositiva 16: Consideraciones de Escalamiento

### 📊 Estrategias de Muestreo
```properties
# Desarrollo: Trazar todo
quarkus.otel.traces.sampler=always_on

# Producción: Muestrear basado en carga
quarkus.otel.traces.sampler=traceidratio
quarkus.otel.traces.sampler.arg=0.1  # 10%

# Personalizado: Muestreo guiado por negocio
# Muestrear todos los errores, 1% de éxitos
```

### 🚀 Impacto en Rendimiento
- **Overhead de CPU**: < 5% típicamente
- **Uso de Memoria**: ~1KB por traza
- **Red**: Exportación asíncrona
- **Almacenamiento**: Considerar políticas de retención

### 💡 Consejos Pro
- Comenzar con muestreo alto en desarrollo
- Reducir muestreo en producción basado en volumen
- Siempre muestrear errores y solicitudes lentas
- Monitorear el sistema de monitoreo mismo

**Notas del Presentador:**
- La observabilidad no debería lastimar el rendimiento
- El muestreo es crucial para sistemas de alto volumen
- Las operaciones críticas de negocio merecen mayor muestreo
- Monitorear costos y ajustar muestreo en consecuencia

---

## Diapositiva 17: Código de Demo Disponible

### 📁 Implementación Completa
**Repositorio GitHub:** [URL de Tu Repositorio]

### 📦 Qué Está Incluido:
- ✅ Código fuente completo (< 100 líneas total)
- ✅ Configuración Docker
- ✅ Guía de configuración paso a paso
- ✅ Consejos de solución de problemas
- ✅ Ejemplos de extensión

### 🏃‍♂️ Inicio Rápido:
```bash
git clone [tu-repo]
cd simple-otel-demo
docker-compose up --build
# Abrir localhost:3000 y localhost:16686
```

### 💡 Ideas para Experimentar:
- Agregar operaciones de base de datos
- Implementar métricas personalizadas
- Probar diferentes backends
- Agregar más contexto de negocio

**Notas del Presentador:**
- El código está disponible para aprendizaje práctico
- Alentar experimentación y modificación
- Proporcionar canales de soporte para preguntas
- El aprendizaje real sucede a través de la práctica

---

## Diapositiva 18: Puntos Clave

### 🎯 OpenTelemetry es Accesible
- **Integración Simple**: Agregar dependencia, configurar endpoint
- **Valor Inmediato**: La auto-instrumentación funciona lista para usar
- **Adopción Incremental**: Comenzar pequeño, crecer gradualmente

### 🔍 Enfocarse en Valor de Negocio
- **Spans Personalizados**: Agregar contexto de negocio a trazas técnicas
- **Atributos Significativos**: Usuario, resultado de operación, métricas de negocio
- **Insights de Errores**: No solo qué falló, sino por qué

### 🚀 Comenzar Hoy
- **Elegir Un Servicio**: Comenzar con tu componente más crítico
- **Agregar Trazado Básico**: OpenTelemetry + Jaeger localmente
- **Iterar**: Agregar más contexto mientras aprendes

### 💪 Construir el Hábito
- **Desarrollo Guiado por Trazas**: Considerar observabilidad en diseño
- **Entrenamiento de Equipo**: Todos deberían entender lo básico
- **Mejora Continua**: Usar trazas para optimizar rendimiento

**Notas del Presentador:**
- Resumir las propuestas de valor principales
- Enfatizar que comenzar es más importante que la perfección
- Alentar acción inmediata, no solo planificación
- Posicionar como ventaja competitiva

---

## Diapositiva 19: Discusión de Preguntas y Respuestas

### 🤔 Preguntas Comunes:

**"¿Cuál es el overhead de rendimiento?"**
- Típicamente < 5% CPU, impacto mínimo en memoria
- La exportación asíncrona no bloquea solicitudes
- El muestreo reduce overhead en producción

**"¿Cómo manejamos datos sensibles?"**
- Nunca incluir contraseñas, PII en atributos
- Usar eventos de span para logging detallado
- Configurar filtrado de atributos en exportación

**"¿Esto funciona con microservicios?"**
- ¡Sí! El contexto se propaga automáticamente
- Cada servicio agrega sus propios spans
- Trazas distribuidas completas a través de servicios

**"¿Qué pasa con el logging existente?"**
- OpenTelemetry complementa, no reemplaza logs
- Puede correlacionar logs con trazas
- El logging estructurado funciona genial con trazas

### 📧 Información de Contacto:
- **Email**: [tu-email]
- **GitHub**: [tu-github]
- **Slack del Equipo**: #observability

**Notas del Presentador:**
- Alentar preguntas a lo largo de la presentación
- Compartir información de contacto para seguimiento
- Ofrecer ayuda con implementación
- Conectar personas con la comunidad de observabilidad

---

## Diapositiva 20: ¡Gracias y Próximos Pasos!

### 🎉 ¡Gracias!

### 🚀 Tus Próximos Pasos:
1. **Probar la Demo**: Clonar y ejecutar localmente
2. **Elegir un Servicio**: Identificar un buen candidato para trazado
3. **Comenzar Simple**: Agregar instrumentación básica de OpenTelemetry
4. **Medir Impacto**: Ver los beneficios inmediatos
5. **Expandir Gradualmente**: Agregar más servicios y contexto

### 🤝 ¡Construyamos Sistemas Observables Juntos!

**Recuerda: La mejor estrategia de observabilidad es la que realmente implementas.**

### 📞 ¿Preguntas? ¡Hablemos!

**Notas del Presentador:**
- Terminar con una nota alentadora y accionable
- Reforzar que pasos simples llevan a grandes mejoras
- Ofrecer soporte continuo y colaboración
- Dejarlos emocionados por probar OpenTelemetry
- Agradecer a la audiencia por su tiempo y atención

---

## Apéndice: Inmersión Técnica Profunda (Diapositivas de Respaldo)

### A1: Atributos Avanzados de Span
```java
span.setAttribute("http.method", "POST");
span.setAttribute("http.status_code", 200);
span.setAttribute("user.session.id", sessionId);
span.setAttribute("business.transaction.value", amount);
span.setAttribute("feature.flag.enabled", isFeatureEnabled);
```

### A2: Patrones de Manejo de Errores
```java
try {
    // lógica de negocio
    span.setStatus(StatusCode.OK);
} catch (ValidationException e) {
    span.setStatus(StatusCode.ERROR, "Validación falló");
    span.setAttribute("error.type", "validation");
    span.recordException(e);
    throw e;
} catch (Exception e) {
    span.setStatus(StatusCode.ERROR, "Error inesperado");
    span.recordException(e);
    throw e;
}
```

### A3: Integración de Métricas Personalizadas
```java
// Contador para intentos de login
Counter loginAttempts = GlobalMeterProvider.get()
    .get("simple-login")
    .counterBuilder("login_attempts_total")
    .build();

// Histograma para duración de login
Histogram loginDuration = GlobalMeterProvider.get()
    .get("simple-login")
    .histogramBuilder("login_duration_seconds")
    .build();
```

**Notas del Presentador para Apéndice:**
- Usar estas diapositivas si la audiencia quiere detalles técnicos más profundos
- Mostrar patrones avanzados para uso en producción
- Demostrar cómo extender los conceptos básicos
- Proporcionar ejemplos para escenarios comunes
