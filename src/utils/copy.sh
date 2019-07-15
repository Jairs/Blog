#!/bin/sh
cd /f/WWW/Blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log