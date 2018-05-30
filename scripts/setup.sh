#!/bin/bash
source /home/ec2-user/.bash_profile

# First install node
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs

# Install Yarn
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum -y install yarn

# Install pm2
sudo yarn global add pm2
pm2 update
