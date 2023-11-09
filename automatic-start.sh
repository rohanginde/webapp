#!/bin/bash


sudo cp /opt/csye6225/nodeapp.service /lib/systemd/system/nodeapp.service


sudo systemctl daemon-reload
sudo systemctl enable nodeapp
sudo systemctl start nodeapp

sudo systemctl restart nodeapp

