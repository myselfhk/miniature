# Miniature (2026)

Awwwards-level premium creative house website.

## Tech Stack

- Next.js 15+ (App Router, Server Actions)
- TailwindCSS
- Framer Motion (Shared Layout, Light Field)
- Supabase (Postgres, Auth, Storage)
- shadcn/ui (Admin)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Supabase Setup:**
   - Create a new Supabase project.
   - Run the contents of `supabase/schema.sql` in the Supabase SQL Editor.
   - Create a public storage bucket named `uploads`.
   - Create a public storage bucket named `og` (optional).

3. **Environment Variables:**
   Copy `.env.example` to `.env.local` and fill in:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   REVALIDATE_SECRET=random_secret_string
   ADMIN_EMAIL_ALLOWLIST=your_email@example.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run Locally:**
   ```bash
   npm run dev
   ```

## Admin & CMS

Access the admin panel at `/admin`.

### Features

- **Pages:** Manage landing pages (Home, About, People) with a block-based editor.
- **Posts:** Editorial blog content.
- **Case Studies:** Detailed project deep-dives with metrics and galleries.
- **Inbox:** View consultant applications from the "People" page.

### Block Editor

The admin uses a "no-code" style block editor supporting:

- Rich text (Headings, Paragraphs, Quotes)
- Media (Images with captions)
- Layout (Dividers, Callouts)
- Components (CTAs, Metrics Grids, Work Cards, Pricing Cards, FAQ Lists)
- Drag-and-drop reordering

## "People of Miniature"

The site includes a `/people` page for recruiting a consultant network.

- Public page: `/people`
- Application form: `/people/join`
- Admin inbox: `/admin/applications`

## Deployment

- Set `NEXT_PUBLIC_SITE_URL` to your production domain.
- Ensure `REVALIDATE_SECRET` matches in Vercel/Netlify env vars.
