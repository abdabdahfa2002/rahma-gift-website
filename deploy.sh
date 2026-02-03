#!/bin/bash

# Set Vercel token
export VERCEL_TOKEN="7PH7SxDnar6CSLOWpGo37Wzv"

# Deploy to Vercel
vercel deploy --prod --yes --token $VERCEL_TOKEN

