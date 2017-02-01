#!/bin/sh

sh boot.sh disable

yes | sudo apt-get update
env DEBIAN_FRONTEND=noninteractive APT_LISTCHANGES_FRONTEND=none sudo apt-get upgrade -y -o Dpkg::Options::='--force-confdef' -o Dpkg::Options::='--force-confold'

sudo apt-get install -y tmux

sh boot.sh enable
sh boot.sh next "sh install-client.sh"

rm $0
sudo reboot
