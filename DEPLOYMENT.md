# Comerse AI - Production Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Production ready"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add all environment variables from `.env.production.example`
   - Deploy!

3. **Configure Webhooks**
   - Add Stripe webhook endpoint: `https://your-domain.com/api/payments/webhook`
   - Add Vercel cron job for daily tasks

## 🐳 Docker Deployment

1. **Build and run with Docker Compose**
   \`\`\`bash
   # Copy production environment
   cp .env.production.example .env.production
   
   # Edit with your values
   nano .env.production
   
   # Build and start
   docker-compose up -d
   \`\`\`

2. **SSL Certificate Setup**
   \`\`\`bash
   # Generate SSL certificate (Let's Encrypt recommended)
   certbot certonly --webroot -w /var/www/html -d your-domain.com
   
   # Copy certificates to nginx volume
   cp /etc/letsencrypt/live/your-domain.com/* ./ssl/
   \`\`\`

## 🔧 Manual Server Setup

1. **Server Requirements**
   - Node.js 18+
   - Redis 6+
   - Nginx (reverse proxy)
   - SSL certificate

2. **Install Dependencies**
   \`\`\`bash
   npm ci --production
   npm run build
   \`\`\`

3. **Start Application**
   \`\`\`bash
   # Using PM2 (recommended)
   npm install -g pm2
   pm2 start npm --name "comerse-ai" -- start
   pm2 startup
   pm2 save
   \`\`\`

## 📊 Monitoring Setup

1. **Sentry Error Tracking**
   - Create Sentry project
   - Add DSN to environment variables
   - Errors will be automatically tracked

2. **Health Checks**
   - Health endpoint: `/api/health`
   - Monitor database, Redis, and OpenAI connectivity

3. **Performance Monitoring**
   - Vercel Analytics (automatic)
   - Custom metrics in Sentry

## 🔒 Security Checklist

- [ ] All environment variables set
- [ ] HTTPS enabled with valid SSL
- [ ] Rate limiting configured
- [ ] CSRF protection enabled
- [ ] Security headers set
- [ ] Database RLS policies active
- [ ] API keys rotated regularly

## 📈 Scaling Considerations

1. **Database Scaling**
   - Supabase automatically scales
   - Consider read replicas for high traffic

2. **Redis Scaling**
   - Upstash Redis scales automatically
   - Consider clustering for very high traffic

3. **Application Scaling**
   - Vercel: Automatic scaling
   - Docker: Use load balancer + multiple containers

## 🔄 Maintenance

1. **Daily Tasks** (Automated)
   - Clean old chat sessions
   - Send trial expiration emails
   - Update analytics

2. **Weekly Tasks**
   - Review error logs
   - Check performance metrics
   - Update dependencies

3. **Monthly Tasks**
   - Security audit
   - Backup verification
   - Cost optimization review

## 📞 Support

For deployment issues:
1. Check health endpoint: `/api/health`
2. Review application logs
3. Check Sentry for errors
4. Contact support if needed
