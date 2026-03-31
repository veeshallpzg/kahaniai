# KahaniAI - AI-Powered Hindi Story Generator

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Supabase-3.3-3ECF8E?style=flat-square&logo=supabase" alt="Supabase">
  <img src="https://img.shields.io/badge/Groq-LLM-brightgreen?style=flat-square" alt="Groq">
</p>

<p align="center">
  वायरल हिंदी कहानियां, सेकंडों में। AI-powered scriptwriter for Indian Podcasters.
</p>

---

## 🚀 Features

- 🎯 **AI Story Generation** - Generate viral-worthy Hindi stories using Groq's Llama-3.3-70b model
- 📝 **12 Genre Categories** - Horror, Romance, Thriller, Mythology, Crime, Sci-Fi, Illusion, Paranormal, Comedy, Suspense, Supernatural, Conspiracy
- 🇮🇳 **Indian Cultural Context** - Stories with chai, auto-rickshaw, monsoon, shaadi references
- 🌐 **Natural Hinglish** - Delhi/Mumbai style conversational Hindi
- 💾 **Story Storage** - Save and manage generated stories with Supabase
- 📱 **Responsive Design** - Mobile-first, dark theme with gold accents
- ⏱️ **Streaming Response** - Real-time story generation

---

## 📁 Project Structure

```
KahaniAI/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # Story generation API
│   │   └── stories/route.ts     # Fetch saved stories
│   ├── dashboard/page.tsx        # User dashboard
│   ├── generate/page.tsx         # Story generator page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── Navbar.tsx                # Navigation
│   ├── HeroSection.tsx           # Hero section
│   ├── FeatureGrid.tsx           # Features grid
│   └── Footer.tsx                # Footer
├── lib/
│   └── supabase.ts               # Supabase client
├── supabase/
│   └── schema.sql                # Database schema
└── public/                       # Static assets
```

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- [Groq API Key](https://console.groq.com/keys)
- [Supabase Project](https://supabase.com)

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/kahani-ai.git
cd kahani-ai
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
# Groq API Key (Required)
GROQ_API_KEY=your_groq_api_key_here

# Supabase Configuration (Optional - for story storage)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Database Setup

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor**
3. Run the SQL from `supabase/schema.sql`:

```sql
-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  genre TEXT NOT NULL,
  genre_hindi TEXT NOT NULL,
  duration INTEGER NOT NULL,
  script_content TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🚢 Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/kahani-ai.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Import Project**
3. Select your GitHub repository
4. Add environment variables:
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

### 3. Configure Supabase

After deployment, update your Supabase project's allowed origins to include your Vercel domain.

---

## 📖 Usage

### Generate a Story

1. Visit `/generate`
2. Select a **Genre** (e.g., Horror, Romance, Thriller)
3. Adjust **Duration** (10-60 minutes)
4. Click **Generate Script**
5. Wait for the AI to generate your story
6. The story is automatically saved to your dashboard

### View Dashboard

1. Visit `/dashboard`
2. See all your previously generated stories
3. **Copy** to clipboard
4. **Download** as TXT file

---

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Charcoal | `#121212` | Primary background |
| Gold | `#D4AF37` | Accents, buttons |
| Off-White | `#F5F5F5` | Text |

### Typography

- **Hind** - Hindi text (Google Fonts)
- **Inter** - UI elements (Google Fonts)

### Theme

- Dark mode by default
- Mystic India inspired design
- Gold accents throughout

---

## 🔧 API Reference

### POST `/api/generate`

Generate a new story.

**Request:**
```json
{
  "genre": "horror",
  "duration": 30
}
```

**Response:** Streaming text response with Hindi story

### GET `/api/stories`

Fetch user's saved stories.

**Headers:**
```
x-user-id: demo-user
```

**Response:**
```json
[
  {
    "id": "uuid",
    "genre": "horror",
    "genre_hindi": "डरावनी",
    "duration": 30,
    "script_content": "...",
    "word_count": 4200,
    "created_at": "2026-03-31T12:00:00Z"
  }
]
```

---

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Groq](https://groq.com/) - Fast AI inference
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Google Fonts](https://fonts.google.com/) - Hind & Inter fonts
