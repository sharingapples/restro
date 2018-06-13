#!/bin/bash

# Install ntp (Network time server)
sudo apt-get install -y ntp

# Install nodejs
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install git
sudo apt-get install -y git

# Copy the ssh private and public key in


# Clone the repo
git clone git@github.com:sharingapples/restro

# Configure the config.json file


# Copy the systemd service file
sudo cp restro-printer.service /lib/systemd/system/

# Configure systemd
sudo systemctl daemon-reload
sudo systemctl enable restro-printer

# Make the system readonly and reboot
curl -sL https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/read-only-fs.sh | sudo -E bash -
