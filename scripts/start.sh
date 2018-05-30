#!/bin/bash
source /home/ec2-user/.bash_profile

cd /home/ec2-user/restro/packages/server
pm2 start build/index.js -n app

