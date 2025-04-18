# Farmley E-commerce Website

An advanced e-commerce platform for Farmley dry fruits, delivering a modern and interactive shopping experience with comprehensive product exploration and user engagement features.

## Stack
- TypeScript (React/Node.js)
- PostgreSQL database
- Drizzle ORM
- Tailwind CSS
- Responsive web design

## Deployment Instructions

### Deploy to Render

#### Automatic Blueprint Deployment
1. Go to [render.com](https://render.com/) and sign up/sign in
2. Click "New" → "Blueprint"
3. Connect your GitHub repo (manas284/lnd)
4. Render will automatically detect the render.yaml file
5. Click "Apply" and it will set up both your web service and PostgreSQL database automatically

#### Manual Deployment
1. **Create PostgreSQL Database**:
   - Go to Render dashboard → "New" → "PostgreSQL"
   - Name: `farmley-db`
   - Database: `farmley`
   - User: `farmley_user`
   - Select "Free" plan
   - After creation, go to "Connect" tab and copy Internal Database URL

2. **Create Web Service**:
   - Go to "New" → "Web Service"
   - Connect GitHub repository (manas284/lnd)
   - Name: `farmley-app`
   - Build Command: `./render-build.sh`
   - Start Command: `npm run start`
   - Add Environment Variables:
     - `DATABASE_URL`: (paste Internal Database URL from step 1)
     - `NODE_ENV`: `production`

3. **Initialize Database** (after deployment):
   - Go to web service in Render dashboard
   - Click on "Shell"
   - Run: `npm run db:push`

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com/) and sign up/sign in
2. Import your GitHub repository
3. Configure:
   - Build Command: `npm install --include=dev && npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`
   - Development Command: `npm run dev`
4. Add Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string (you can use Neon database)
   - `NODE_ENV`: `production`
5. Deploy and visit your site

## Running Locally

```
npm install
npm run dev
```

The application will start on http://localhost:5000.