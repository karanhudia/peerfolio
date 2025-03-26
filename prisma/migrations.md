# Database Migration Plan

This document outlines the database migration strategy for the PeerFolio application.

## Initial Setup

To set up the database for the first time:

```bash
# Generate migration files
npx prisma migrate dev --name init

# Apply migrations to the database
npx prisma migrate deploy
```

## Migration Process

When schema changes are made:

1. Update the schema in `prisma/schema.prisma`
2. Generate a new migration:
   ```bash
   npx prisma migrate dev --name [descriptive-name]
   ```
3. Review the generated migration file in `prisma/migrations/`
4. Apply the migration to the development database:
   ```bash
   npx prisma migrate deploy
   ```

## Production Deployment

For production deployment:

1. Backup the production database
2. Apply migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Verify the application functionality after migration

## Schema Changes Roadmap

Future schema changes that will be needed:

1. **User Profile Enhancements**
   - Add additional profile fields (bio, professional title, etc.)
   - Add social media links

2. **Review System Improvements**
   - Add category-specific ratings
   - Add helpfulness votes for reviews

3. **Notifications System**
   - Create notifications table
   - Add notification preferences

4. **Analytics**
   - Add tracking for review views
   - Add statistics table for caching aggregated data

## Rollback Strategy

In case of migration issues:

1. Restore database from backup
2. Fix migration issue
3. Re-apply corrected migration

For development environments, you can reset the database if needed:
```bash
npx prisma migrate reset
```
**Warning**: This will delete all data in the development database.

## Data Seeding

For development and testing, seed the database with sample data:

```bash
npx prisma db seed
```

The seed script is defined in `package.json` and implemented in `prisma/seed.ts`. 