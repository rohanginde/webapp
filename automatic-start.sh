#!/bin/bash

cd WebApp || exit

sudo cp nodeapp.service /lib/systemd/system/app.service

systemctl daemon-reload
sudo systemctl enable nodeapp
sudo systemctl start nodeapp
sudo systemctl restart nodeapp
