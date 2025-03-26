# Deployment Guide for PeerFolio

This guide explains how to deploy PeerFolio to Vercel using Neon PostgreSQL as the database.

## Prerequisites

- A [Vercel](https://vercel.com) account
- A [Neon](https://neon.tech) account for PostgreSQL database
- Your project code in a GitHub repository

## Next.js Configuration for Deployment

PeerFolio uses a custom `next.config.js` specifically optimized for deployment:

```js
// next.config.js
const nextConfig = {
  typescript: {
    // Bypass TypeScript errors during build for deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bypass ESLint errors during build for deployment
    ignoreDuringBuilds: true,
  },
  // Optimize for serverless deployment
  output: 'standalone',
  
  // External packages that should not be bundled
  serverExternalPackages: ['@prisma/client', '@neondatabase/serverless'],
}
```

This configuration:
- Bypasses TypeScript and ESLint errors during build to ensure deployment even with non-critical issues
- Uses the `standalone` output mode, which is optimized for serverless environments
- Specifies Prisma and Neon database packages as external dependencies for better compatibility

## Prisma with Neon Database

PeerFolio uses Prisma with the Neon PostgreSQL adapter. The Prisma schema has the `driverAdapters` preview feature enabled to work with Neon's serverless driver:

```prisma
// prisma/schema.prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions", "driverAdapters"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
  extensions = [pgcrypto]
}
```

## Step 1: Set Up Neon PostgreSQL Database

1. Sign up or log in to [Neon](https://neon.tech)
2. Create a new project
3. Create a new database named `peerfolio`
4. Copy your database connection strings (`DATABASE_URL` and `DIRECT_URL`) for the next steps

## Step 2: Configure Environment Variables

Ensure the following environment variables are set in your Vercel project:

```
# Database
DATABASE_URL=postgresql://user:password@neon-database-url/peerfolio
DIRECT_URL=postgresql://user:password@neon-database-url/peerfolio?sslmode=require

# NextAuth
NEXTAUTH_URL=https://your-production-url.vercel.app
NEXTAUTH_SECRET=your-secret-key

# App settings
NEXT_PUBLIC_APP_URL=https://your-production-url.vercel.app
```

Replace the placeholder values with your actual credentials.

### About Database URLs

- `DATABASE_URL`: The pooled connection URL for your Neon database. This connection is optimized for concurrent access.
- `DIRECT_URL`: The direct connection URL used by Prisma for migrations and other database operations.

## Step 3: Deploy to Vercel

1. Push your code to GitHub if you haven't already
2. Log in to [Vercel](https://vercel.com)
3. Click "Add New" > "Project"
4. Select your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js
   - Build Command: (Use the default)
   - Install Command: (Use the default)
   - Output Directory: (Use the default)
6. Add the environment variables listed in Step 2
7. Click "Deploy"

## Step 4: Run Database Migrations

After deployment, you need to run Prisma migrations on your production database:

```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Log in to Vercel
vercel login

# Run migrations via Vercel CLI
vercel run npx prisma migrate deploy
```

## Step 5: Seed Production Database (Optional)

If you want to seed your production database with initial data:

```bash
vercel run npx prisma db seed
```

## Troubleshooting

### Database Connectivity Issues

- Ensure your database connection strings are correctly formatted
- Check that your database user has appropriate permissions
- Verify that SSL mode is enabled for the connection

### TypeScript Build Errors

This project uses a `next.config.js` that bypasses TypeScript errors during build. While this allows deployment with type errors, it's recommended to fix these errors for production-grade applications.

### Prisma Client Generation

If you encounter Prisma client issues, you may need to regenerate it:

```bash
vercel run npx prisma generate
```

## Updating Your Deployment

After making changes to your code:

1. Push changes to your GitHub repository
2. Vercel will automatically build and deploy the updates
3. If you've made schema changes, run migrations again:
   ```bash
   vercel run npx prisma migrate deploy
   ```

## Monitoring

Monitor your application's performance and errors using Vercel's built-in analytics and logging tools. 

## Testing Your Build Locally

Before deploying to Vercel, you can test your build locally to ensure everything works as expected:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

This will build the application with the production configuration and start the server locally. If the build succeeds without errors, it's likely to deploy successfully to Vercel.

### Common Build Issues

1. **Database Connection**: If you see database errors during the build, check that your local `.env` file has valid `DATABASE_URL` and `DIRECT_URL` values.

2. **Prisma Client Generation**: Ensure the Prisma client is generated with the correct configuration:
   ```bash
   npx prisma generate
   ```

3. **Missing Node Modules**: If you encounter missing module errors, try reinstalling dependencies:
   ```bash
   npm ci
   ```

The deployed application will use the environment variables set in the Vercel dashboard, not your local `.env` file. 