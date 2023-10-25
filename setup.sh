#!/bin/bash

 

# Update package lists

sudo apt-get update

 

# Install Node.js and npm

sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

 

# Install unzip

sudo DEBIAN_FRONTEND=noninteractive apt install -y unzip



# Unzip the WebAppRenamed file to the WebApp directory

sudo unzip WebAppRenamed -d WebApp
 


sudo groupadd csye6225

sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

sudo chown csye6225:csye6225 /home/admin/WebApp

sudo chmod 750 /home/admin/WebApp



