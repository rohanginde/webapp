#!/bin/bash





# systemctl daemon-reload
# sudo systemctl enable nodeapp
# sudo systemctl start nodeapp
# sudo systemctl restart nodeapp


sudo cp /home/admin/nodeapp.service /lib/systemd/system/nodeapp.service



systemctl daemon-reload
sudo systemctl enable nodeapp
sudo systemctl start nodeapp

sudo systemctl restart nodeapp


