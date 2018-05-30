#!/bin/bash
source /home/ec2-user/.bash_profile

# Install all packages via yarn
cd /home/ec2-user/restro
yarn install

# Run build steps
cd /home/ec2-user/restro/packages/common
yarn run build

cd /home/ec2-user/restro/packages/server
yarn run build

cd /home/ec2-user/restro/packages/web
yarn run build

# Remove source maps from the build
cd /home/ec2-user/restro/packages/server/build/public
find . -type f -name '*.map' -exec rm {} +

