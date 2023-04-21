#!/bin/bash
# Stop all servers and start the server
REPOSITORY=/home/ubuntu/build/server

cd $REPOSITORY
sudo pm2 stop all
sudo pm2 start app.js