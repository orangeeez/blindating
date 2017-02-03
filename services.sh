#!/bin/bash
nohup dotnet run > /dev/null 2>&1 &
node /blindating/webrtc/peerserver.js &