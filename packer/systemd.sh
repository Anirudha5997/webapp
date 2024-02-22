#!/bin/bash
sudo groupadd csye6225
sudo useradd -m -s /usr/sbin/nologin -g csye6225 csye6225
sudo chown -R csye6225:csye6225 /tmp/
sudo mv -f /tmp/csye6225.service /etc/systemd/system/csye6225.service