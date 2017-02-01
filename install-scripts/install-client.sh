#!/bin/sh

### SERVER CONFIG WILL BE INJECTED HERE ###

displayTitle(){
	echo "\033[33m> \033[1m" $1 "\033[0m"
}

yesOrNo() {
    local message
    local default
    if [ "$2" = "y" ]; then
      message="$1 [Y/n]"
      default="yes";
    elif [ "$2" = "n" ]; then
      message="$1 [y/N]"
      default="no";
    else
      message="$1 [y/n]"
      default="";
    fi

    local yesNoAnswer=""
    while [ -n $yesNoAnswer ]; do
        read -p "$message " yesNoAnswer
        case $yesNoAnswer in
            [yY]|[yY][eE][sS])
                echo 'yes'
                exit
            ;;
            [nN]|[nN][oO])
                echo 'no'
                exit
            ;;
            '')
                if [ "$default" != "" ]; then
                    echo "$default"
                    exit
                fi
            ;;
        esac
    done
}

##
# Config
##
. ./config.sh

DISPLAY=$(
ps -u $(id -u) -o pid= | \
    while read pid; do
        cat /proc/$pid/environ 2>/dev/null | tr '\0' '\n' | grep '^DISPLAY=:'
    done | grep -o ':[0-9]*' | sort -u
)
​
armVersion=$(cat /proc/cpuinfo | grep -om 1 'v[0-9]\+l')

sh boot.sh disable

##
# Disable blank screen
##
displayTitle 'Disable blank screen'

sudo sed -i 's/^BLANK_TIME=.*$/BLANK_TIME=0/g' /etc/kbd/config
sudo sed -i 's/^POWERDOWN_TIME=.*$/POWERDOWN_TIME=0/g' /etc/kbd/config
sudo /etc/init.d/kbd restart


##
# Install dependencies
##
displayTitle 'Install dependencies'

# xorg: to use X
# git: to clone repo
# unclutter: hide the mouse cursor
# xdotool: emulate keyboard key
# supervisor: keep node client alive
# livestreamer: display videos from internet
# omxplayer: display videos
sudo apt-get install -y xorg git unclutter xdotool supervisor xinit openbox livestreamer omxplayer

##
# Install raspi2png
# Screenshot tool working with Livestreamer and Omxplayer
##
sudo apt-get install -y libpng12-dev
git clone https://github.com/AndrewFromMelbourne/raspi2png.git
cd raspi2png
make
sudo mv raspi2png /usr/bin/
cd $HOME
rm -rf raspi2png

##
# Install Chromium
##
displayTitle 'Install Chromium'

# youtube-dl for video support
echo y | ginstall-ytdl
sudo apt-get install -y chromium-browser


##
# Configure supervisor
##
displayTitle 'Configure supervisord'

echo '
[program:openbox]
command=xinit /usr/bin/openbox-session
autorestart=true
redirect_stderr=true
stdout_logfile='$HOME'/logs/openbox.log
user=root
' | sudo tee /etc/supervisor/conf.d/openbox.conf
​

##
# Allow any user to start X
##
displayTitle 'Allow any user to start X'

sudo sed -i 's/^allowed_users=.*$/allowed_users=anybody/g' /etc/X11/Xwrapper.config


##
# Install Nodejs
##
displayTitle "Install Nodejs"

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

##
# Setup raspberry node client
##
displayTitle "Setup raspberry node client"

cd $HOME
mkdir $HOME/logs

sudo npm install -g raspberry-client
sudo rpi-cli install --host="${SERVER_HOSTNAME}" --port="${SERVER_PORT}" --userId="${USER_ID}"

# openbox started event
echo 'NODE_ENV="production" rpi-cli display openbox-started' | sudo tee /etc/xdg/openbox/autostart

##
# Install libcec
##
displayTitle "Install libcec"

sudo apt-get install -y cmake liblockdev1-dev libudev-dev libxrandr-dev python-dev swig
​
cd
git clone https://github.com/Pulse-Eight/platform.git
mkdir platform/build
cd platform/build
cmake ..
make
sudo make install
​
cd
git clone https://github.com/Pulse-Eight/libcec.git
mkdir libcec/build
cd libcec/build
cmake -DRPI_INCLUDE_DIR=/opt/vc/include -DRPI_LIB_DIR=/opt/vc/lib ..
make -j4
sudo make install
sudo ldconfig
​
cd
rm -rf libcec platform


##
# Remove install scripts
##
displayTitle "Remove install scripts"

sh autologin.sh disable
rm autologin.sh

rm boot.sh
rm config.sh

rm $0
sudo reboot
