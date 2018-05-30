#!/bin/bash
source /home/ec2-user/.bash_profile

# Kill all node applications
pm2 stop app || true
