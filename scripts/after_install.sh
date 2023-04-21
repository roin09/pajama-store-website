#!/bin/bash
REPOSITORY1=/home/ubuntu/build

REPOSITORY2=/home/ubuntu/build/client

REPOSITORY3=/home/ubuntu/build/server

cd $REPOSITORY1
sudo npm install

cd $REPOSITORY2
sudo npm install

cd $REPOSITORY3
sudo rm -rf node_modules
sudo npm install
sudo pm2 kill
