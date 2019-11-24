# homebridge-drapes
Homebridge drapes
`/usr/local/lib/node_module`

`git clone ...`

`npm i`

# Raspberry pi
install node for armv6

# install mDNS on raspberry PI
`sudo apt-get install avahi-daemon`

Next, you want to install the client side name service support for mDNS:

`sudo apt-get install libnss-mdns`

Make sure that the /etc/nsswitch.conf contains this line:

`hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4`

`reboot`

`ping drapes.local`

Also could add it to /etc/hosts


# Added homebridge config.json
`cp config.json to /var/lib/homebridge`


# Start with boot
https://github.com/nfarina/homebridge/wiki/Install-Homebridge-on-Raspbian
