#!/bin/bash
sudo mv -f /etc/google-cloud-ops-agent/config.yaml /etc/google-cloud-ops-agent/config.yaml.bak
sudo mv -f /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo cat /etc/google-cloud-ops-agent/config.yaml
cd /var/log/ || exit
sudo mkdir webappLogs
ln -s /home/prodApp/webapp.log /var/log/webapp/webapp.log
sudo systemctl restart google-cloud-ops-agent
