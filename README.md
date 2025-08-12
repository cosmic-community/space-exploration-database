# Space Exploration Database

![Space Exploration Preview](https://imgix.cosmicjs.com/290d9db0-77cb-11f0-a051-23c10f41277a-photo-1446776653964-20c1d3a81b06-1755037489099.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive space exploration database showcasing historic and current space missions, astronauts, and celestial bodies. Built with Next.js 15 and powered by Cosmic CMS.

## Features

- 🚀 **Mission Explorer** - Browse historic and current space missions with detailed information
- 👨‍🚀 **Astronaut Profiles** - Comprehensive biographies of space pioneers and current astronauts  
- 🪐 **Celestial Database** - Explore planets, moons, stars, and other cosmic objects
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🔍 **Search & Filter** - Find specific content quickly with advanced filtering
- ⚡ **Fast Performance** - Built with Next.js 15 App Router for optimal speed
- 🎨 **Space-themed UI** - Beautiful cosmic design with stellar imagery

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=685983090c5f30f5a7412536&clone_repository=689bc01fefcf4b47c154db75)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a website dedicated to space exploration

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling and responsive design
- **Cosmic CMS** - Headless content management
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the space exploration bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables by creating a `.env.local` file:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Missions
```typescript
import { cosmic } from '@/lib/cosmic'

const missions = await cosmic.objects
  .find({ type: 'missions' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Astronauts
```typescript
const astronauts = await cosmic.objects
  .find({ type: 'astronauts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Celestial Bodies
```typescript
const celestialBodies = await cosmic.objects
  .find({ type: 'celestial-bodies' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with three main content types:

- **Missions** (`missions`) - Space missions with launch dates, objectives, and crew members
- **Astronauts** (`astronauts`) - Astronaut profiles with biographies and achievements  
- **Celestial Bodies** (`celestial-bodies`) - Planets, moons, stars, and other cosmic objects

Each content type includes rich metadata, images, and detailed descriptions managed through your Cosmic dashboard.

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Connect your GitHub repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically on every push to main

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

1. Connect your repository to Netlify
2. Set your build command to `bun run build`
3. Add environment variables in Netlify's dashboard
4. Deploy your site

Make sure to add your `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables in your deployment platform's settings.

<!-- README_END -->