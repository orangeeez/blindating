#!/bin/bash
nohup dotnet run -- docker-local > /dev/null 2>&1 &
node /blindating/webrtc/peerserver.js &