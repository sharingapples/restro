#!/bin/bash
source /home/ec2-user/.bash_profile

# Stop the app (Ignore error if the app is not registered)
pm2 stop app || true

# Start the app
cd /home/ec2-user/restro/packages/server
pm2 start build/index.js -n app

