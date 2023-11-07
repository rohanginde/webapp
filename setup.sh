#!/bin/bash

 

# Update package lists

sudo apt-get update

 

# Install Node.js and npm

sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

 

# Install unzip

sudo DEBIAN_FRONTEND=noninteractive apt install -y unzip


cd /opt

# Unzip the WebAppRenamed file to the WebApp directory


sudo unzip /tmp/webapp.zip -d csye6225


sudo groupadd csye6225

sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225



