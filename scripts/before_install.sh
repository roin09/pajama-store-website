#!/bin/bash
REPOSITORY=/home/ubuntu/build/server

cd $REPOSITORY
ls -l
sudo apt-get update
sudo apt-get install nodejs-legacy -y
sudo apt-get install npm  -y
sudo npm install pm2 -g