#!/bin/sh

### SERVER CONFIG WILL BE INJECTED HERE ###

display_title() {
	echo "\033[33m> \033[1m" $1 "\033[0m"
}

display_title "Configure time zone"
sudo dpkg-reconfigure tzdata

display_title "Expand root file system"
wget $URL"expand_rootfs.sh"
sudo sh expand_rootfs.sh
rm expand_rootfs.sh

display_title "Enable auto login"
wget $URL"autologin.sh"
sudo sh autologin.sh enable

wget $URL"apt.sh"

wget $URL"install-client.sh"

wget $URL"boot.sh"

sh boot.sh enable
sh boot.sh next "sh apt.sh"

rm $0
sudo reboot
