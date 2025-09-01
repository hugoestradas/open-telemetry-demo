# Guía de Diseño Visual para PowerPoint
## Especificaciones Completas para Presentación OpenTelemetry

---

## 🎨 Esquema de Colores Principal

### Colores Primarios
- **Azul OpenTelemetry**: #0C83E7 (RGB: 12, 131, 231)
- **Naranja Jaeger**: #FF8C42 (RGB: 255, 140, 66)
- **Verde Éxito**: #28A745 (RGB: 40, 167, 69)
- **Rojo Error**: #DC3545 (RGB: 220, 53, 69)

### Colores Secundarios
- **Gris Oscuro**: #343A40 (RGB: 52, 58, 64)
- **Gris Medio**: #6C757D (RGB: 108, 117, 125)
- **Gris Claro**: #F8F9FA (RGB: 248, 249, 250)
- **Blanco**: #FFFFFF

### Combinaciones de Colores
```
Fondo Principal: Blanco (#FFFFFF)
Texto Principal: Gris Oscuro (#343A40)
Acentos: Azul OpenTelemetry (#0C83E7)
Código: Fondo Gris Claro (#F8F9FA), Texto Gris Oscuro
Éxito: Verde (#28A745)
Advertencia: Naranja Jaeger (#FF8C42)
Error: Rojo (#DC3545)
```

---

## 🔤 Especificaciones de Tipografía

### Fuentes Principales
1. **Fuente Principal**: Segoe UI (Windows) / San Francisco (Mac) / Roboto (Web)
2. **Fuente de Código**: Consolas / Monaco / Fira Code
3. **Fuente de Respaldo**: Arial / Helvetica

### Jerarquía de Tamaños
```
Título de Presentación: 44pt, Bold
Títulos de Diapositiva: 36pt, Bold
Subtítulos: 28pt, Semibold
Texto Principal: 24pt, Regular
Texto Secundario: 20pt, Regular
Código: 18pt, Monospace
Notas al Pie: 16pt, Light
```

### Estilos de Texto
- **Títulos**: Bold, Color Azul OpenTelemetry
- **Subtítulos**: Semibold, Color Gris Oscuro
- **Texto Código**: Monospace, Fondo Gris Claro
- **Enlaces**: Underline, Color Azul OpenTelemetry
- **Énfasis**: Bold o Italic según contexto

---

## 📐 Layout y Espaciado

### Márgenes y Padding
```
Márgenes de Diapositiva: 60px todos los lados
Espacio entre Títulos: 40px
Espacio entre Párrafos: 20px
Espacio entre Elementos: 15px
Padding de Cajas de Código: 20px
Interlineado: 1.4x altura de fuente
```

### Grid System
- **Ancho de Contenido**: 1800px (para 1920x1080)
- **Columnas**: Sistema de 12 columnas
- **Ancho de Columna**: 135px
- **Gutters**: 20px entre columnas

### Áreas de Contenido
```
Header: 120px altura
Content Area: 800px altura
Footer: 80px altura
Sidebar (cuando aplique): 400px ancho
```

---

## 🎯 Elementos Visuales Específicos

### Logotipos y Marcas
```
Logo OpenTelemetry:
- Tamaño: 80px altura en título
- Posición: Esquina superior derecha
- Versión: Full color sobre fondo blanco

Logo Jaeger:
- Tamaño: 60px altura
- Posición: Junto a logo OpenTelemetry
- Versión: Original naranja
```

### Iconografía
```
Iconos de Tecnología:
- Tamaño: 48px x 48px
- Estilo: Line icons, grosor 2px
- Color: Azul OpenTelemetry (#0C83E7)

Iconos de Estado:
- ✅ Verde para éxito
- ❌ Rojo para error
- ⚠️ Naranja para advertencia
- 🔍 Azul para análisis
```

### Diagramas de Arquitectura
```
Componentes:
- Rectángulos redondeados (radio: 10px)
- Borde: 2px sólido, color según tipo de servicio
- Fondo: Blanco con sombra ligera
- Tamaño mínimo: 200px x 120px

Conexiones:
- Flechas: Grosor 3px
- Color: Gris Medio (#6C757D)
- Estilo: Línea sólida con punta de flecha

Labels de Puertos:
- Fuente: 16pt, Monospace
- Color: Gris Medio
- Posición: Debajo del componente
```

---

## 💻 Formato de Código

### Bloques de Código
```css
Fondo: #F8F9FA
Borde: 1px sólido #E9ECEF
Border-radius: 8px
Padding: 20px
Font-family: 'Consolas', 'Monaco', 'Fira Code'
Font-size: 18pt
Line-height: 1.5
```

### Syntax Highlighting
```
Keywords (public, class, try): #0000FF (Azul)
Strings ("login", "admin"): #008000 (Verde)
Comments (// texto): #808080 (Gris)
Numbers (8080, 200): #FF0000 (Rojo)
Annotations (@Path, @POST): #808000 (Verde Oliva)
```

### Bloques de Terminal
```css
Fondo: #000000 (Negro)
Texto: #00FF00 (Verde Terminal)
Font-family: 'Consolas', 'Monaco'
Font-size: 16pt
Padding: 15px
Border-radius: 5px
```

---

## 📊 Elementos de Datos y Métricas

### Cajas de Métricas
```css
Fondo: Gradiente sutil de blanco a gris claro
Borde: 1px sólido #E9ECEF
Border-radius: 12px
Padding: 25px
Sombra: 0 2px 8px rgba(0,0,0,0.1)
```

### Elementos de Estado
```
Estados Positivos:
- Color: Verde (#28A745)
- Ícono: ✅ checkmark
- Fondo: Verde claro (rgba(40,167,69,0.1))

Estados Negativos:
- Color: Rojo (#DC3545)
- Ícono: ❌ X mark
- Fondo: Rojo claro (rgba(220,53,69,0.1))

Estados Neutrales:
- Color: Azul (#0C83E7)
- Ícono: 🔍 magnifier
- Fondo: Azul claro (rgba(12,131,231,0.1))
```

### Gráficos de Traza
```
Timeline Background: Gris muy claro (#F5F5F5)
Span Bars: Azul OpenTelemetry con gradiente
Span Text: Gris Oscuro, 14pt
Time Labels: Gris Medio, 12pt
Grid Lines: Gris claro, 1px, punteado
```

---

## 🎭 Elementos Interactivos (Para Referencia)

### Botones y Call-to-Actions
```css
Botón Primario:
- Fondo: Azul OpenTelemetry (#0C83E7)
- Texto: Blanco, Bold
- Padding: 12px 24px
- Border-radius: 6px
- Hover: Azul más oscuro (#0A6BC2)

Botón Secundario:
- Fondo: Transparente
- Borde: 2px sólido Azul OpenTelemetry
- Texto: Azul OpenTelemetry, Bold
- Hover: Fondo Azul claro
```

### Enlaces y Referencias
```css
Enlaces en Texto:
- Color: Azul OpenTelemetry (#0C83E7)
- Text-decoration: underline
- Hover: Azul más oscuro

URLs y Paths:
- Font-family: Monospace
- Color: Gris Medio (#6C757D)
- Background: Gris muy claro (#F8F9FA)
- Padding: 2px 6px
- Border-radius: 3px
```

---

## 🖼️ Plantillas de Diapositivas

### Diapositiva de Título
```
Layout: Centrado vertical y horizontal
Elementos:
- Logo OpenTelemetry (top-right)
- Título principal (center, 44pt)
- Subtítulo (center, 28pt)
- Tagline (center, 24pt, italic)
- Información del presentador (bottom-center, 20pt)
```

### Diapositiva de Contenido
```
Layout: Header + Content
Elementos:
- Título (top-left, 36pt)
- Área de contenido principal
- Numeración de diapositiva (bottom-right)
- Logo pequeño (bottom-left)
```

### Diapositiva de Código
```
Layout: Título + Código + Notas
Elementos:
- Título (top, 36pt)
- Bloque de código (center, 70% width)
- Notas explicativas (bottom, 20pt)
- Highlighting para puntos clave
```

### Diapositiva de Demo
```
Layout: Split 50/50
Elementos:
- Título (top, full width)
- Captura de pantalla (left 50%)
- Lista de pasos (right 50%)
- Arrows y callouts para navegación
```

---

## 🎬 Elementos de Presentación

### Transiciones Recomendadas
```
Entre Diapositivas: Fade (0.5 segundos)
Elementos de Aparición: Fly In from Left (0.3 segundos)
Elementos de Código: Typewriter (para efecto dramático)
Diagramas: Build Up (elemento por elemento)
```

### Animaciones
```
Bullets Points: Appear uno por vez
Código: Highlight líneas importantes
Diagramas: Flow arrows aparecen en secuencia
Métricas: Count up animations para números
```

### Speaker Notes
```
Font: Segoe UI, 18pt
Color: Gris Oscuro
Line-height: 1.6
Estructura:
- Punto clave (Bold)
- Detalles de apoyo
- Transición a siguiente diapositiva
```

---

## 📱 Consideraciones de Responsive Design

### Para Pantallas Grandes (>1920px)
- Escalar todos los elementos proportcionalmente
- Mantener ratios de aspecto
- Aumentar márgenes para evitar texto muy extendido

### Para Pantallas Medianas (1366x768)
- Reducir tamaños de fuente en 10%
- Compactar espaciado vertical
- Simplificar diagramas complejos

### Para Proyección
- Aumentar contraste
- Usar fuentes más Bold
- Simplificar elementos visuales
- Probar legibilidad desde diferentes ángulos

---

## 🔧 Herramientas y Assets

### Software Recomendado
1. **Microsoft PowerPoint** (Primario)
2. **Google Slides** (Alternativo)
3. **Figma** (Para crear diagramas personalizados)
4. **Draw.io/Lucidchart** (Para diagramas de arquitectura)

### Assets Necesarios
```
Logotipos:
- opentelemetry-logo.svg
- jaeger-logo.png
- docker-logo.png
- quarkus-logo.png
- react-logo.png

Iconos:
- success-icon.svg
- error-icon.svg
- warning-icon.svg
- analytics-icon.svg
- server-icon.svg
- frontend-icon.svg

Diagramas Base:
- architecture-diagram.svg
- trace-timeline-template.svg
- microservices-diagram.svg
```

### Snippets de Código Formateados
```
Archivos listos para copiar/pegar:
- LoginApp.java (formatted)
- docker-compose.yml (formatted)
- package.json (formatted)
- application.properties (formatted)
```

---

## ✅ Checklist de Diseño

### Antes de Crear
- [ ] Confirmar resolución objetivo (1920x1080 recomendado)
- [ ] Descargar todos los logos y assets
- [ ] Preparar código formateado y probado
- [ ] Verificar que todos los colores sean accesibles

### Durante la Creación
- [ ] Usar esquema de colores consistente
- [ ] Aplicar jerarquía tipográfica
- [ ] Mantener espaciado uniforme
- [ ] Optimizar código para legibilidad
- [ ] Incluir números de diapositiva

### Después de Crear
- [ ] Probar en pantalla de proyección
- [ ] Verificar legibilidad desde atrás del salón
- [ ] Revisar tiempos de transición
- [ ] Preparar backup en múltiples formatos
- [ ] Probar funcionamiento de demos

### Control de Calidad Final
- [ ] Revisar ortografía y gramática
- [ ] Verificar consistencia visual
- [ ] Probar todos los enlaces y referencias
- [ ] Confirmar que el código funciona
- [ ] Preparar notas del presentador

---

**Nota:** Esta guía está diseñada para crear una presentación profesional y cohesiva que refleje la calidad técnica del contenido OpenTelemetry mientras mantiene claridad visual y facilidad de comprensión para la audiencia.
