#!/bin/bash
# Script to fix the file watch limit issue for Next.js development

echo "This script will increase the file watch limit to fix the Turbopack error."
echo "You will need to enter your sudo password."
echo ""
echo "Increasing fs.inotify.max_user_watches to 524288..."

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

echo ""
echo "✓ File watch limit increased successfully!"
echo "You can now run 'npm run dev' to start the development server."
