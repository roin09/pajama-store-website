#!/bin/bash
REPOSITORY=/home/ubuntu/moonlight

cd $REPOSITORY

sudo yarn

sudo pm2 start