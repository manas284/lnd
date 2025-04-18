# Deployment Instructions for Farmley Website

This document provides instructions for deploying the Farmley website to either Vercel or Render platforms.

## Prerequisites
- A GitHub account
- Access to the source code repository
- A Vercel or Render account

## Database Setup
This application requires a PostgreSQL database. Both Vercel and Render offer integrated PostgreSQL database services. When setting up your deployment, make sure to provision a PostgreSQL database and set the `DATABASE_URL` environment variable.

---

## Deploying to Vercel

1. **Push your code to GitHub**:
   - Create a new repository on GitHub
   - Push your code to the repository

2. **Import your project into Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" and select "Project"
   - Import your GitHub repository

3. **Configure the project**:
   - The `vercel.json` file included in the repository already contains the necessary configuration
   - In the "Environment Variables" section, add:
     - `DATABASE_URL`: Your PostgreSQL connection string

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

5. **Access your deployed application**:
   - Once deployment is complete, Vercel will provide a URL for your application
   - You can also configure a custom domain in the Vercel project settings

---

## Deploying to Render

1. **Push your code to GitHub**:
   - Create a new repository on GitHub
   - Push your code to the repository

2. **Create a new Web Service on Render**:
   - Go to [render.com](https://render.com) and sign in
   - Click "New" and select "Blueprint"
   - Connect your GitHub repository
   - Render will use the `render.yaml` file to configure the service

3. **Configure the service**:
   - The `render.yaml` file included in the repository already specifies:
     - The build command: `npm install && npm run build`
     - The start command: `npm run start`
     - A PostgreSQL database

4. **Deploy**:
   - Click "Apply" to create the services specified in the blueprint
   - Render will build and deploy your application and create the required PostgreSQL database

5. **Access your deployed application**:
   - Once deployment is complete, Render will provide a URL for your application
   - You can also configure a custom domain in the Render project settings

---

## Post-Deployment Tasks

After deploying to either platform, you may need to perform the following tasks:

1. **Initialize the database**:
   - The application is configured to automatically seed the database on first run
   - You can verify this by checking the logs after deployment

2. **Check if the application is working correctly**:
   - Visit the deployed URL and verify all features are working
   - Test the product listing, category filtering, and other features

3. **Set up monitoring**:
   - Both Vercel and Render provide basic monitoring
   - Consider setting up additional monitoring tools if needed

---

## Troubleshooting

If you encounter issues after deployment:

1. **Check the logs**:
   - Both Vercel and Render provide detailed logs for your deployments
   - Look for any error messages that might indicate what's wrong

2. **Common issues**:
   - Database connection issues: Verify the `DATABASE_URL` environment variable is set correctly
   - Build failures: Make sure all dependencies are correctly specified in package.json

3. **Rollback if needed**:
   - Both platforms allow you to roll back to previous deployments if something goes wrong