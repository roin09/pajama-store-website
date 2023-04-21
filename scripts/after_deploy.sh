#!/bin/bash
REPOSITORY=/home/ubuntu/build/server

cd $REPOSITORY

sudo yarn

sudo pm2 start app.js