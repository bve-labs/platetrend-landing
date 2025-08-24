# PlateTrend - AI-Powered Restaurant Intelligence

PlateTrend is a Next.js application that provides AI-powered restaurant intelligence through sentiment analysis of competitor reviews and market insights.

## 🚀 Features

### Current Features
- **Landing Page**: Professional restaurant intelligence marketing site
- **Waitlist Management**: Email capture with Supabase storage and Resend notifications
- **AI Sentiment Analysis**: Hugging Face-powered review sentiment analysis
- **Live Demo**: Interactive restaurant analysis tool

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase (PostgreSQL)
- **AI/ML**: Hugging Face Inference API
- **Email**: Resend
- **Validation**: Zod

## 🛠 Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd platetrend
npm install
```

### 2. Environment Configuration
Copy the environment example file:
```bash
cp env.example .env.local
```

Fill in your API keys in `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
ADMIN_EMAIL=your_admin_email_here

# Hugging Face Configuration (for AI sentiment analysis)
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

### 3. Get API Keys

#### Hugging Face (Free Tier Available)
1. Go to [Hugging Face](https://huggingface.co/settings/tokens)
2. Create a new token with "Read" permissions
3. Free tier includes 30k characters/month

#### Supabase (Free Tier Available)
1. Create project at [Supabase](https://supabase.com)
2. Get URL and keys from Settings > API
3. Create a `waitlist` table with columns: `id`, `restaurant_name`, `email`, `location`, `num_locations`, `created_at`

#### Resend (Free Tier Available)
1. Sign up at [Resend](https://resend.com)
2. Get API key from dashboard
3. Free tier includes 3k emails/month

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

### Landing Page
- Visit `/` for the main marketing site
- Sign up for waitlist to get notified of launch

### AI Sentiment Analysis Demo
- Visit `/analysis` for the live demo
- Enter any restaurant name to see AI-powered sentiment analysis
- Currently uses mock data for demonstration (easily replaceable with real scraping)

## 🏗 Architecture

### Frontend Components
- `src/app/page.tsx` - Main landing page
- `src/app/analysis/page.tsx` - Sentiment analysis demo page
- `src/components/SentimentAnalysis.tsx` - Main analysis interface

### Backend APIs
- `src/app/api/waitlist/route.ts` - Waitlist management
- `src/app/api/analyze/route.ts` - Sentiment analysis endpoint

### Services
- `src/lib/huggingface.ts` - AI sentiment analysis service
- `src/lib/scraper.ts` - Web scraping utilities (currently mock data)
- `src/lib/supabase.ts` - Database client
- `src/lib/validations.ts` - Input validation schemas

## 🤖 AI Integration Details

### Sentiment Analysis Model
- **Model**: `cardiffnlp/twitter-roberta-base-sentiment-latest`
- **Provider**: Hugging Face Inference API
- **Cost**: Free tier (30k characters/month), then $0.0002/1k tokens
- **Accuracy**: High-quality sentiment classification (Positive/Negative/Neutral)

### Data Processing Pipeline
1. **Input**: Restaurant name
2. **Data Collection**: Mock reviews (easily replaceable with real scraping)
3. **AI Analysis**: Hugging Face sentiment analysis
4. **Aggregation**: Summary statistics and confidence scores
5. **Visualization**: Interactive charts and detailed breakdowns

## 🔄 Development Workflow

### Current Branch: `feature/hugging-imp`
This branch contains the Hugging Face integration and sentiment analysis MVP.

### Key Files Modified/Added:
- Added Hugging Face sentiment analysis
- Created analysis demo page
- Integrated AI-powered restaurant intelligence
- Added comprehensive error handling
- Implemented responsive UI components

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Environment Variables for Production
Ensure all environment variables from `.env.local` are configured in your deployment platform.

## 📈 Future Enhancements

### Planned Features
- Real web scraping integration (Google Reviews, Yelp)
- Competitive analysis dashboard
- Menu trend prediction
- Pricing optimization recommendations
- Multi-restaurant comparison
- Historical sentiment tracking

### Scaling Considerations
- Implement caching for API responses
- Add rate limiting for AI API calls
- Consider local model deployment for high volume
- Add database indexing for performance

## 🤝 Contributing

1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Submit pull request

## 📄 License

This project is private and proprietary.
