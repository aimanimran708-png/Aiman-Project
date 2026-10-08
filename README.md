# Groq Chatbot

A chatbot built with Next.js (App Router) and the Groq API, deployed on Vercel.
The browser never sees the API key: all model calls go through a server route.

## Model information
- **Provider:** Groq (OpenAI-compatible chat completions API)
- **Default model:** `llama-3.3-70b-versatile` (Meta Llama 3.3 70B, served by Groq)
- **Endpoint:** `https://api.groq.com/openai/v1/chat/completions`
- **Settings:** temperature 0.7, max 1024 output tokens, last 30 messages sent as context
- **Change the model:** set the `GROQ_MODEL` environment variable to any model listed at
  https://console.groq.com/docs/models

## Features
- Chat interface with message history and a typing indicator
- Enter to send, Shift+Enter for a new line
- Clear chat button, error messages with retry
- Light and dark mode, mobile friendly

## Project structure
```
├── app/
│   ├── api/chat/route.js   # server route that calls Groq
│   ├── globals.css         # styling
│   ├── layout.js           # root layout and metadata
│   └── page.js             # chat UI
├── .env.local.example      # environment variable template
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

## Setup (local)
1. Install Node.js 18.17 or newer.
2. Install dependencies:
   ```
   npm install
   ```
3. Create your environment file and add your key (get one at https://console.groq.com/keys):
   ```
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` and set `GROQ_API_KEY`.
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open http://localhost:3000

## Deployment (GitHub + Vercel)
1. Push this project to a new GitHub repository. `.env.local` is git-ignored, so your key stays private.
2. Go to https://vercel.com, choose Add New > Project, and import the repository.
3. Vercel detects Next.js automatically. Leave the build settings as they are.
4. Under Environment Variables add `GROQ_API_KEY` (and optionally `GROQ_MODEL`, `SYSTEM_PROMPT`).
5. Click Deploy. If you change variables later, redeploy for them to take effect.

## Environment variables
| Name | Required | Description |
|------|----------|-------------|
| `GROQ_API_KEY` | Yes | Your Groq API key |
| `GROQ_MODEL` | No | Model ID, defaults to `llama-3.3-70b-versatile` |
| `SYSTEM_PROMPT` | No | Instructions that shape the bot's behavior |

## Notes
- Never commit your API key.
- Anyone with your site URL can use your Groq quota. Add rate limiting or authentication before sharing widely.
