# YHOCHAT 🚀

Una aplicación de chat inteligente moderna construida con Next.js, TypeScript y la API de Google Gemini AI. YHOCHAT ofrece una experiencia conversacional fluida con múltiples conversaciones, almacenamiento local y una interfaz de usuario elegante.

## 🔍 About Yhochat

**YHOCHAT** es tu asistente personal con inteligencia artificial diseñado para revolucionar la forma en que interactúas con la tecnología. Nuestro objetivo es proporcionar una experiencia conversacional natural, intuitiva y altamente personalizada que se adapte a tus necesidades específicas.

### 🎯 Nuestra Visión

Creemos que la comunicación con la IA debe ser tan natural como hablar con un amigo. YHOCHAT elimina las barreras técnicas y te permite enfocarte en lo que realmente importa: obtener respuestas precisas, insights valiosos y soluciones creativas a tus desafíos diarios.

### 🚀 ¿Por qué elegir YHOCHAT?

- **🧠 Inteligencia Avanzada**: Impulsado por Google Gemini AI, una de las IAs más avanzadas disponibles
- **🔄 Conversaciones Contextuales**: Mantiene el contexto de toda la conversación para respuestas más precisas
- **💾 Memoria Persistente**: Tus conversaciones se guardan automáticamente para acceso futuro
- **🎨 Experiencia Premium**: Interfaz elegante y moderna diseñada para máxima usabilidad
- **⚡ Rendimiento Optimizado**: Respuestas rápidas y fluidas sin interrupciones
- **🔒 Privacidad Garantizada**: Tus datos se mantienen seguros y privados

## 🔧 How it Works?

YHOCHAT utiliza una arquitectura moderna y eficiente que garantiza una experiencia de usuario excepcional. Aquí te explicamos el flujo completo:

### 1. 🚀 Inicialización de la Aplicación

- Al acceder a YHOCHAT, la aplicación se inicializa con **Next.js 15** y **React 19**
- Se carga dinámicamente el componente principal sin SSR para mejor rendimiento
- El **GeminiProvider** configura la conexión con la API de Google Gemini AI
- Se restauran automáticamente las conversaciones guardadas desde el almacenamiento local

### 2. 💬 Gestión de Conversaciones

- **Zustand** maneja el estado global de todas las conversaciones
- Cada conversación tiene un ID único, título, mensajes y timestamps
- Las conversaciones se organizan cronológicamente en la sidebar
- Auto-generación de títulos basados en el primer mensaje del usuario

### 3. 🔄 Flujo de Mensajes

```
Usuario escribe mensaje → Validación → Envío a Gemini AI → Procesamiento → Respuesta → Actualización UI
```

#### Proceso detallado:

1. **Input del Usuario**: Escribe en el campo de texto y presiona Enter o clic en enviar
2. **Validación**: Se verifica que el mensaje no esté vacío y que Gemini esté inicializado
3. **Historial de Contexto**: Se construye el historial completo de la conversación
4. **Llamada a la API**: Se envía el mensaje junto con el contexto a Gemini AI
5. **Procesamiento**: Gemini AI procesa el mensaje y genera una respuesta inteligente
6. **Respuesta**: Se recibe y formatea la respuesta con markdown y sintaxis destacada
7. **Actualización**: Se actualiza la UI y se guarda automáticamente la conversación

### 4. 💾 Almacenamiento y Persistencia

- **Almacenamiento Local**: Todas las conversaciones se guardan en el navegador
- **Auto-guardado**: Cada mensaje se guarda automáticamente después de 100ms
- **Restauración**: Al recargar la página, se restauran todas las conversaciones
- **Sincronización**: El estado se mantiene sincronizado entre todos los componentes

### 5. 🎨 Interfaz Responsiva

- **Diseño Adaptativo**: Funciona perfectamente en desktop, tablet y móvil
- **Sidebar Inteligente**: Se oculta automáticamente en pantallas pequeñas
- **Scroll Automático**: Se desplaza automáticamente a los mensajes más recientes
- **Indicadores Visuales**: Muestra estados de carga, error y éxito

### 6. 🔍 Características Avanzadas

- **Formato de Mensajes**: Soporte completo para markdown, código y listas
- **Múltiples Conversaciones**: Cambia entre conversaciones sin perder el contexto
- **Eliminar Conversaciones**: Gestión completa del historial de conversaciones
- **Atajos de Teclado**: Enter para enviar, Shift+Enter para nueva línea

## ✨ Características

- 💬 **Conversaciones en Lenguaje Natural**: Chatea de forma natural con la IA de Google Gemini
- 📚 **Base de Conocimiento**: Acceso a información completa y actualizada
- 🔄 **Múltiples Conversaciones**: Gestiona varias conversaciones simultáneamente
- 💾 **Almacenamiento Local**: Tus conversaciones se guardan automáticamente
- 🎨 **Interfaz Moderna**: Diseño elegante y responsivo con TailwindCSS
- ⚡ **Rendimiento Optimizado**: Carga rápida con componentes optimizados
- 🔗 **Integraciones Seamless**: Fácil integración con otros servicios

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [TailwindCSS](https://tailwindcss.com/)
- **IA**: [Google Gemini AI](https://ai.google.dev/)
- **Gestión de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Componentes UI**: [Radix UI](https://www.radix-ui.com/)
- **Iconos**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Almacenamiento**: Local Storage para persistencia de conversaciones

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.0.0 o superior
- npm, yarn, pnpm o bun
- Una API key de Google Gemini AI

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/yourusername/yhochat.git
cd yhochat
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env.local
```

Edita el archivo `.env.local` y añade tu API key de Gemini:

```env
NEXT_PUBLIC_GEMINI_API_KEY=tu_api_key_aqui
```

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

5. **Abrir en tu navegador**
   Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 🔧 Configuración

### Variables de Entorno

| Variable                     | Descripción                 | Requerida |
| ---------------------------- | --------------------------- | --------- |
| `NEXT_PUBLIC_GEMINI_API_KEY` | API key de Google Gemini AI | ✅        |

### Configuración de Gemini

La configuración de Gemini se encuentra en `src/lib/config/gemini.ts`:

```typescript
export const GEMINI_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  MODEL_NAME: 'gemini-2.5-flash-preview-05-20',
  TEMPERATURE: 0.7,
  MAX_TOKENS: 1024
}
```

## 📱 Uso

1. **Iniciar una Nueva Conversación**: Haz clic en el botón "+" para crear una nueva conversación
2. **Enviar Mensajes**: Escribe tu mensaje y presiona Enter o haz clic en enviar
3. **Gestionar Conversaciones**: Usa la barra lateral para navegar entre conversaciones
4. **Eliminar Conversaciones**: Usa el botón de eliminar en cada conversación

## 📁 Estructura del Proyecto

```
yhochat/
├── src/
│   ├── app/                     # App Router de Next.js
│   │   ├── ChatApp.tsx         # Componente principal de la aplicación
│   │   ├── layout.tsx          # Layout global
│   │   └── page.tsx            # Página principal
│   ├── components/             # Componentes React
│   │   ├── chat/              # Componentes específicos del chat
│   │   ├── layout/            # Componentes de layout
│   │   └── ui/                # Componentes UI reutilizables
│   ├── hooks/                 # React hooks personalizados
│   ├── lib/                   # Utilidades y configuración
│   │   ├── config/           # Configuración de la aplicación
│   │   ├── context/          # Context providers
│   │   ├── services/         # Servicios (Gemini, Storage)
│   │   ├── store/            # Zustand store
│   │   └── types/            # Definiciones de tipos TypeScript
│   └── ...
├── public/                    # Archivos estáticos
├── package.json              # Dependencias y scripts
└── ...
```

## 🤖 Integración con Gemini AI

YHOCHAT utiliza la API de Google Gemini AI para proporcionar respuestas inteligentes. El servicio está implementado en `src/lib/services/GeminiService.ts` y ofrece:

- Conversaciones con contexto
- Streaming de respuestas
- Manejo de errores robusto
- Configuración personalizable

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Linting
npm run lint         # Ejecuta ESLint para verificar el código
```

## 🎨 Personalización

### Temas y Estilos

Los estilos están configurados con TailwindCSS en `src/app/globals.css`. Puedes personalizar:

- Variables CSS para colores
- Configuración de TailwindCSS en `tailwind.config.js`
- Componentes UI en `src/components/ui/`

### Configuración del Chat

Personaliza el comportamiento del chat en:

- `src/lib/config/gemini.ts` - Configuración de Gemini AI
- `src/lib/store/useChatStore.ts` - Estado global del chat
- `src/hooks/useChat.ts` - Lógica del chat

## 🔒 Seguridad

- Las API keys se manejan como variables de entorno
- Los datos se almacenan localmente en el navegador
- Sin almacenamiento en servidor por defecto

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor:

1. Revisa la [documentación](https://nextjs.org/docs)
2. Abre un [issue](https://github.com/yourusername/yhochat/issues)
3. Contáctanos en [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

---

<div align="center">
  <p>Hecho con ❤️ por [Tu Nombre]</p>
  <p>
    <a href="https://nextjs.org/">Next.js</a> •
    <a href="https://www.typescriptlang.org/">TypeScript</a> •
    <a href="https://tailwindcss.com/">TailwindCSS</a> •
    <a href="https://ai.google.dev/">Gemini AI</a>
  </p>
</div>
