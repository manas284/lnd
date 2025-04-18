#!/bin/bash

# Install specific packages first that might cause issues
echo "Installing critical packages first..."
npm install @vitejs/plugin-react @replit/vite-plugin-shadcn-theme-json @replit/vite-plugin-runtime-error-modal

# Install all dependencies including dev dependencies
echo "Installing all dependencies..."
npm install --include=dev 

# Verify react plugin is installed
if [ ! -d "node_modules/@vitejs" ]; then
  echo "Error: @vitejs packages not found, installing again..."
  npm install @vitejs/plugin-react --no-save
fi

# Run the build
echo "Starting build process..."
npm run build

# Output success message
echo "Build completed successfully!"