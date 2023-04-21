#!/bin/bash
# Stop all servers and start the server
REPOSITORY=/home/ubuntu/build/server

cd $REPOSITORY
pm2 stop all
pm2 start app.js