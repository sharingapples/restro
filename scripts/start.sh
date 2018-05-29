#!/bin/bash
source /home/ec2-user/.bash_profile

cd /home/ec2-user/restro/packages/server
node build/index.js &

