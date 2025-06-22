# Comerse.ai - Production-Ready AI Customer Support Platform

A complete, production-ready AI-powered customer support platform for ecommerce businesses.

## 🚀 Features

- **AI-Powered Chat**: GPT-4 powered customer support with context awareness
- **Voice Support**: Speech-to-text and text-to-speech capabilities
- **Multi-Industry**: Pre-trained for fashion, electronics, beauty, and home goods
- **Real-time Analytics**: Comprehensive performance tracking and insights
- **Custom Training**: Upload your own product catalogs and knowledge base
- **Multi-language**: Support for 20+ languages
- **Enterprise Security**: SOC 2 compliant with end-to-end encryption
- **Scalable Architecture**: Built for high-volume ecommerce stores

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase, PostgreSQL
- **AI**: OpenAI GPT-4, LangChain, Pinecone Vector Database
- **Payments**: Stripe Subscriptions
- **Email**: Nodemailer with SMTP
- **Authentication**: Supabase Auth with RLS
- **Monitoring**: Sentry, Vercel Analytics
- **Deployment**: Docker, Vercel, or self-hosted

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database (Supabase recommended)
- OpenAI API key
- Stripe account
- Pinecone account
- SMTP email service

## 🔧 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-org/comerse-ai-platform.git
   cd comerse-ai-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Fill in all required environment variables.

4. **Set up the database**
   \`\`\`bash
   # Run database migrations
   npm run db:migrate
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🌐 Environment Variables

### Required Variables

\`\`\`env
# App Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Stripe
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
STRIPE_PRICE_BASIC=price_basic_monthly_id
STRIPE_PRICE_PRO=price_pro_monthly_id
STRIPE_PRICE_ENTERPRISE=price_enterprise_monthly_id

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Vector Database
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX=comerse-ai-index
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

\`\`\`bash
# Build the image
docker build -t comerse-ai .

# Run with docker-compose
docker-compose up -d
\`\`\`

### Self-Hosted

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Set up reverse proxy (nginx recommended)
4. Configure SSL certificates

## 📊 Database Schema

The platform uses PostgreSQL with the following main tables:

- `users` - User accounts and subscription info
- `chat_sessions` - Chat conversation history
- `training_data` - Custom training data uploads
- `analytics_events` - Usage and performance tracking
- `api_keys` - API key management

## 🔐 Security Features

- Row Level Security (RLS) on all tables
- API rate limiting with Redis
- CSRF protection
- Input sanitization and validation
- Secure session management
- SOC 2 compliance ready

## 📈 Monitoring & Analytics

- Real-time performance metrics
- User behavior tracking
- Error monitoring with Sentry
- Custom analytics dashboard
- Usage-based billing tracking

## 🔌 API Documentation

### Authentication

All API endpoints require authentication via:
- Session cookies (dashboard)
- API keys (widget integration)

### Chat API

\`\`\`typescript
POST /api/chat
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
\`\`\`

### Training API

\`\`\`typescript
POST /api/training/upload
Content-Type: multipart/form-data

file: [CSV/JSON file]
dataType: "product" | "faq" | "policy" | "custom"
\`\`\`

## 🎯 Usage Limits

| Plan | Monthly Queries | Features |
|------|----------------|----------|
| Trial | 1,000 | Basic chat, 7-day trial |
| Basic | 10,000 | All features, email support |
| Pro | 50,000 | Priority support, advanced analytics |
| Enterprise | Unlimited | Custom features, dedicated support |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Documentation: [docs.comerse.ai](https://docs.comerse.ai)
- Email: support@comerse.ai
- Discord: [Join our community](https://discord.gg/comerse-ai)

## 🗺 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI model fine-tuning
- [ ] Integration marketplace
- [ ] White-label solutions
- [ ] Advanced workflow automation
