#!/usr/bin/env bash
sudo dnf update -y
sudo dnf install postgresql -y
sudo dnf module enable nodejs:20 -y
sudo dnf install nodejs -y
