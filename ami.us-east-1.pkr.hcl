packer {

  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}


variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
}

variable "aws_profile" {
  type    = string
  default = "dev"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-06427c16a0121cce8"
}

variable "ami_users" {
  type    = list(string)
  default = ["303561834123", "067566139146"]
}

source "amazon-ebs" "debian" {
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  region          = "${var.aws_region}"
  ami_description = "AMI for CSYE 6225"

  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"
  ami_users     = "${var.ami_users}"
  profile       = "${var.aws_profile}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.debian"]

  provisioner "file" {

    source      = "webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {

    source      = "nodeapp.service"
    destination = "~/"
  }


  provisioner "shell" {
    scripts = ["./setup.sh"]

  }

  provisioner "shell" {
    scripts = ["./automatic-start.sh"]

  }

  provisioner "shell" {
    scripts = ["./install-cloudwatch.sh"]

  }


  post-processor "manifest" {
    output = "manifest.json"
  }

}