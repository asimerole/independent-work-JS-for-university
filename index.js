//class Device 
function Device (name){
    this._name = name;
    this._powerOn = false;
}
Device.prototype.on = function (){
    this._powerOn = true;
}
Device.prototype.off = function (){
    this._powerOn = false;
}
Device.prototype.isOn = function(){
    return this._powerOn;
}
function __isValid (value){
    return value >= 0 && value <=100;
}
//class Lamp
function Lamp (name){
    Device.call(this, name);
    this.__bright = 0;
}
Lamp.prototype = Object.create(Device.prototype);
Lamp.prototype.constructor = Lamp;

Lamp.prototype.bright = function (bright){
    if(bright === undefined){
        return this.__bright;
    }else{
        if(__isValid(bright)) {
            this.__bright = bright;
        } else {
            console.log("Invalid value for bright. Min: 0, Max: 100.");
        }
    }
}
//class Conditioner
function Conditioner (name){
    Device.call(this, name);
    this.__temperature = 0;
}
Conditioner.prototype = Object.create(Device.prototype);
Conditioner.prototype.constructor = Conditioner;

Conditioner.prototype.temperature = function (temperature){
    if(temperature === undefined){
        return this.__temperature;
    }else{
        if(temperature >= -25 && temperature <= 50) {
            this.__temperature = temperature;
        } else {
            console.log("Invalid value for temperature. Min: -25, Max: 50.");
        }
    }
}
//class TV
function TV (name){
    Device.call(this, name);
    this.__volume = 0;
}
TV.prototype = Object.create(Device.prototype);
TV.prototype.constructor = TV;

TV.prototype.volume = function (volume){
    if(volume === undefined){
        return this.__volume;
    }else{
        if(__isValid(volume)) {
            this.__volume = volume;
        } else {
            console.log("Invalid value for volume. Min: 0, Max: 100.");
        }
    }
}
//class SmartHouse
function SmartHouse (name){
    this.__name = name;
    this.isOpen = false;
    this.__devices = [];
}
SmartHouse.prototype.addDevice = function (device){
    this.__devices.push(device);
    console.log("Device with name: '" + device._name + "' was added.");
}
SmartHouse.prototype.deleteDevice = function (deviceName){
    var index = this.__devices.findIndex(device => device._name === deviceName);
    if(index != -1){
        this.__devices.splice(index, 1);
        console.log("Device with name: '" + deviceName + "' deleted.");
    } else {
        console.log("Device with name: '" + deviceName + "' not found.");
    }
    
}
SmartHouse.prototype.getDevices = function (){
    var deviceInfo = [];
    for (const device of this.__devices) {
        var status = device.isOn() ? 'enabled' : 'disabled';
        deviceInfo.push(device._name + ' - ' + status);
    }
    for (const device in deviceInfo) {
        console.log(deviceInfo[device]);
    }
}
SmartHouse.prototype.openHouse = function (){
    this.isOpen = true;
}
SmartHouse.prototype.closeHouse = function (){
    this.isOpen = false;
}
SmartHouse.prototype.getDeviceByName = function (name){
    for (var i = 0; i < this.__devices.length; i++) {
        if (this.__devices[i]._name === name) {
            return this.__devices[i];
        }
    }
    console.log("Device with name: '" + name + "' not found.");
}
SmartHouse.prototype.offAllDevices = function (){
    var device = false;
    for (var i = 0; i < this.__devices.length; i++) {
        this.__devices[i]._powerOn = false;
        device = true;
    }
    console.log("All devices were turned off.");
    if(!device){
        console.log("There are no devices in the house.");
    }
}

var sh = new SmartHouse("House1");

sh.addDevice(new Lamp("Lamp1"));
sh.addDevice(new TV("TV1"));

sh.getInfoAboutHouse();

sh.getDevices();
sh.getDeviceByName("Lamp1").on();
sh.getDeviceByName("TV1").on();
sh.getDevices();
sh.getDeviceByName("Lamp1").off();
sh.getDevices();

