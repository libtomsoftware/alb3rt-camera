#!/bin/sh
MP4Box -add ./videos/temp/$1.h264 ./videos/$1.mp4
rm ./videos/temp/$1.h264
echo $1 removed