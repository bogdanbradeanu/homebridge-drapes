const PACKAGE_JSON = require('./package.json');
let Service, Characteristic;
const request = require('request');
const url = require('url');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory(PACKAGE_JSON.name, "HttpDrapes", HttpDrapes);
};

function HttpDrapes(log, config) {
    this.log = log;
    this.config = config;
}

HttpDrapes.prototype = {
    getRequestBaseUrl: function() {
        return 'http://' + this.config['ip'] + '/';
    },

    getServices: function () {
        let informationService = new Service.AccessoryInformation();
        informationService
            .setCharacteristic(Characteristic.Manufacturer, "Limebear HTTP")
            .setCharacteristic(Characteristic.Model, "1.0")
            .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

        let switchService = new Service.Switch("My Switch");
        switchService
            .getCharacteristic(Characteristic.On)
            .on('get', this.getSwitchOnCharacteristic.bind(this))
            .on('set', this.setSwitchOnCharacteristic.bind(this));

        this.informationService = informationService;
        this.switchService = switchService;
        return [informationService, switchService];
    },

    identify: function(next) {
        this.log('Identify requested!');
        request({
                url: this.getRequestBaseUrl() + '/identify',
                method: 'GET',
                headers: {'Content-type': 'application/json'},
                json: true
            },
            (error, response, body) => {
                if (error) {
                    this.log(error.message);
                    return next(error);
                }
                return next(null, body.statusCode);
            });
    },

    getSwitchOnCharacteristic: function (next) {
        request({
                url: this.getRequestBaseUrl() + '/status',
                method: 'GET',
                headers: {'Content-type': 'application/json'},
                json: true
            },
            (error, response, body) => {
                if (error) {
                    this.log(error.message);
                    return next(error);
                }
                this.log('STATUS: ' + response.statusCode ? 'on' : 'off');
                return next(null, body.statusCode);
            });
    },

    setSwitchOnCharacteristic: function (on, next) {
        request({
                url: this.getRequestBaseUrl() + '/set',
                body: {"targetState": on},
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                json: true
            },
            (error, response) => {
                if (error) {
                    this.log(error.message);
                    return next(error);
                }
                this.log('STATUS: ' + response.statusCode ? 'on' : 'off');
                return next();
            });
    }
};
