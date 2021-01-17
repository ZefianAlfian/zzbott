#!/usr/bin/bash

apt install curl
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt install nodejs
apt install ffmpeg
apt install imagemagick
apt install webp
npm i -g cwebp
npm i
npm start
echo "[*] All dependencies have been install, please run the command \"npm start\" to immediately start the script"