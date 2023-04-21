#!/bin/bash
REPOSITORY=/home/ubuntu/build/server
cd $REPOSITORY

sudo rm -rf node_modules
sudo npm install
sudo pm2 kill
