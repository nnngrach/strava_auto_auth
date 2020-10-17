#!/bin/bash

echo "============================="
echo "Mapshoter auto deploying tool"
echo "============================="


docker build -t nnngrach/mapshoter .

docker pull nnngrach/mapshoter


echo; echo
echo "================================="
echo "Mapshoter auto deploying is DONE!"
echo "================================="
afplay /System/Library/Sounds/Purr.aiff
afplay /System/Library/Sounds/Purr.aiff
afplay /System/Library/Sounds/Purr.aiff
