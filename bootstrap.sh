#!/bin/bash
cd /home/prodApp/ || exit
sudo npm i
pwd
ls -al
sudo node migrations.js
