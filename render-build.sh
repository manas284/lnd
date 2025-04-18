#!/bin/bash

# Install all dependencies including dev dependencies
npm install --include=dev 

# Run the build
npm run build

# Output success message
echo "Build completed successfully!"