#!/bin/bash
REPOSITORY=/home/ubuntu/moonlight/server

cd $REPOSITORY

sudo yarn

sudo pm2 start app.js