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

`pint drapes.local`


# Adding this repo:
```
git pull into /home/pi/node_modules/
cd homebridge-drapes
npm i
```

# Added homebridge config.json
```
{
 "bridge": {
    "name": "Homebridge",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },
  "description": "This is an example configuration file with one fake accessory and one fake platform. You can use this as a template for creating your own configuration file containing devices you actually own.",
  "accessories": [
     {
         "accessory": "HttpDrapes",
         "name": "Drapes",
         "service": "Switch",
         "getUrl": "http://drapes.local/api/status",
         "postUrl": "http://drapes.local/api/set"
      }
  ],
  "platforms": []
}
```

# Start with boot
https://github.com/nfarina/homebridge/wiki/Install-Homebridge-on-Raspbian
