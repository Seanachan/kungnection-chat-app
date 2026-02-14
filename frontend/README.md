# Kungnection Chat App

A modern, real-time chat application built with React and TypeScript, featuring code sharing with syntax highlighting and live code execution capabilities.

## Features

- **Real-time Messaging**: Instant message delivery with polling-based updates
- **Channel-based Communication**: Create and join channels with invite codes
- **Direct Messaging**: Private one-on-one conversations with friends
- **Code Sharing**: Share code snippets with syntax highlighting
- **Live Code Execution**: Execute code directly in the chat (supports Python, JavaScript, C, C++, Java)
- **User Authentication**: Secure JWT-based authentication
- **Profile Management**: Edit profile, change password, customize settings
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router DOM 7
- **Styling**: CSS Modules with Tailwind CSS
- **Icons**: Lucide React
- **Markdown**: Marked for rendering markdown content
- **Code Execution**: Integration with Judge0 API via backend

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Backend API running (see [Kungnection Backend](https://github.com/Seanachan/Kungnection))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Seanachan/kungnection-chat-app.git
   cd kungnection-chat-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API endpoint:
   - Edit `src/config.ts` to point to your backend URL

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── login/        # Authentication pages
│   │   ├── edit-profile/ # Profile editing
│   │   ├── change-passwd/# Password change
│   │   ├── Chat.tsx      # Main chat component
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   ├── CodeBlock.tsx # Code display and execution
│   │   └── ...
│   ├── css/              # CSS Modules
│   ├── types/            # TypeScript type definitions
│   ├── config.ts         # App configuration
│   ├── App.tsx           # Root component
│   └── main.tsx          # Entry point
├── public/               # Static assets
└── package.json
```

## Key Components

### Chat Interface
The main chat view with message display, input, and code block rendering.

### Sidebar
Navigation component showing friend list, channel list, and settings access.

### CodeBlock
Renders code snippets with syntax highlighting, copy functionality, and live execution.

## API Integration

The app communicates with the Kungnection backend API for:
- User authentication (`/auth/login`, `/auth/register`)
- User profile management (`/user/me`)
- Channel operations (`/user/channels`)
- Friend management (`/user/friends`)
- Messaging (`/messages/channel`, `/messages/friend`)

## Deployment

The app is deployed on Vercel.

Live demo: [https://kungnection-chat-app.vercel.app](https://kungnection-chat-app.vercel.app)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Related Projects

- [Kungnection Backend](https://github.com/Seanachan/Kungnection) - Java/Spring Boot backend API

