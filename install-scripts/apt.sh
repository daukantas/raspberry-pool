#!/bin/sh

sh boot.sh disable

yes | sudo apt-get update
env DEBIAN_FRONTEND=noninteractive APT_LISTCHANGES_FRONTEND=none sudo apt-get upgrade -y -o Dpkg::Options::='--force-confdef' -o Dpkg::Options::='--force-confold'

# unattended-upgrades: automatically install updates
sudo apt-get install -y tmux unattended-upgrades

sh boot.sh enable
sh boot.sh next "sh install-client.sh"

rm $0
sudo reboot
