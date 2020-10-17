#!/bin/bash

echo "============================="
echo "Docker build"
echo "============================="


docker build -t nnngrach/anygis_strava_auto_auth .

echo; echo
echo "============================="
echo "Docker push"
echo "============================="

docker push nnngrach/anygis_strava_auto_auth


echo; echo
echo "================================="
echo "Sending DONE!"
echo "================================="
afplay /System/Library/Sounds/Purr.aiff
afplay /System/Library/Sounds/Purr.aiff
afplay /System/Library/Sounds/Purr.aiff
