//class Device 
function Device (name){
    this._name = name;
    this._powerOn = false;
}
Device.prototype.on = function (){
    this._powerOn = true;
    console.log("Device with name'" + this._name + "' is now on.");
}
Device.prototype.off = function (){
    this._powerOn = false;
    console.log("Device with name'" + this._name + "' is now off.");
}
Device.prototype.powerIsOn = function(){
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
    } else {
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
    } else {
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
    } else {
        if(__isValid(volume)) {
            this.__volume = volume;
        } else {
            console.log("Invalid value for volume. Min: 0, Max: 100.");
        }
    }
}
//Control system
function __ControlSystem (name, smartHouse){
    this.__name = name;
    this.__isOn = false;
    this.__smartHouse = smartHouse;
    this.__controlDevices = [];
}
__ControlSystem.prototype.turnOn = function (){
    this.__isOn = true;
    console.log("Control System '" + this.__name + "' is now on.");
}

__ControlSystem.prototype.turnOff = function (){ 
    this.__isOn = false;
    this.turnOffAllSystems();
    console.log("Control System '" + this.__name + "' is now off.");
}
__ControlSystem.prototype.addAlarmSystem = function (name){
    var alarmSystem = new __AlarmSystem(name, this);
    this.__controlDevices.push(alarmSystem);
    console.log("Alarm System with name: '" + alarmSystem.__name + "' was added in your control system: '" + this.__name + "'.");;
    return alarmSystem;
}
__ControlSystem.prototype.displayControlSystems = function (){
    var alarmSystemInfo = [];
    for (const alarmSystem of this.__controlDevices) {
        var status = alarmSystem.__isOn ? 'enabled' : 'disabled';
        alarmSystemInfo.push(alarmSystem.__name + ' - ' + status);
    }
    for (const alarmSystem in alarmSystemInfo) {
        console.log(alarmSystemInfo[alarmSystem]);
    }
}
__ControlSystem.prototype.__findControlDevice = function (name){
    for (var i = 0; i < this.__controlDevices.length; i++) {
        if (this.__controlDevices[i].__name === name) {
            return this.__controlDevices[i];
        }
    }
    return null;
}
__ControlSystem.prototype.turnOffAlarmSystem = function (name){
    var alarmSystem = this.__findControlDevice(name);
    if (alarmSystem) {
        alarmSystem.__turnOff();
    } else {
        console.log("Alarm System with name '" + name + "' not found.");
    }
}

__ControlSystem.prototype.turnOnAlarmSystem = function (name){
    var alarmSystem = this.__findControlDevice(name);
    if (alarmSystem) {
        alarmSystem.__turnOn();
    } else {
        console.log("Alarm System with name '" + name + "' not found.");
    }
}
function __checkSystems (__controlDevices, status){
    var system = false;
    for (var i = 0; i < __controlDevices.length; i++) {
        __controlDevices[i].__isOn = status;
        system = true;
    }
    return system;
}
__ControlSystem.prototype.turnOffAllSystems = function (){
    var system = false;
    var status = false;
    system = __checkSystems (this.__controlDevices, status);
    console.log("All systems were turned off.");
    if(!system){
        console.log("There are no systems in the Control System.");
    }
}
__ControlSystem.prototype.turnOnAllSystems = function (){
    var system = false;
    var status = true;
    system = __checkSystems (this.__controlDevices, status);
    console.log("All systems were turned on.");
    if(!system){
        console.log("There are no systems in the Control System.");
    }
}
//Alarm System
function __AlarmSystem (name, controlSystem){
    this.__name = name;
    this.__isOn = false;
    this.__controlSystem = controlSystem;
}
__AlarmSystem.prototype.__turnOn = function (){
    if (this.__controlSystem.__isOn) {
        this.__isOn = true;
        console.log("Alarm System '" + this.__name + "' is now on.");
    } else {
        console.log("Cannot turn on the Alarm System '" + this.__name + "'. The Control System is not on.");
    }
}
__AlarmSystem.prototype.__turnOff = function (){
    this.__isOn = false;
    console.log("Alarm System '" + this.__name + "' is now off.");
}
__AlarmSystem.prototype.__isOn = function (){
    return this.__isOn;
}
//class SmartHouse
function SmartHouse (name){
    this.__name = name;
    this.__isOpen = false;
    this.__devices = [];
    this.__controlSystems = []
    this.__controlSystem = false;
    
}
SmartHouse.prototype.name = function (name){
    if(name === undefined){
        return this.__name;
    } else {
        this.__name = name;
    }
}
SmartHouse.prototype.addControlSystem = function (name){
    if(!this.__controlSystem){
        var controlSystem = new __ControlSystem(name, this);
        this.__controlSystems.push(controlSystem);
        console.log("Сontrol System with name: '" + controlSystem.__name + "' was added in your house.");
        this.__controlSystem = true;
        return controlSystem;
    } else {
        console.log("The control system is already in the house.");
    }
}
SmartHouse.prototype.getControlSystemByName = function (name){
    for (var i = 0; i < this.__controlSystems.length; i++) {
        if (this.__controlSystems[i].__name === name) {
            return this.__controlSystems[i];
        }
    }
    console.log("Control System with name: '" + name + "' not found.");
}
SmartHouse.prototype.deleteControlSystem = function (name){
    var controlSystemName = this.getControlSystemByName(name).__name;
    if(this.__controlSystem && controlSystemName === name){
        delete this.__controlSystem;
        this.__controlSystem = false;
        console.log("Control system '" + name + "' has been deleted from the house.");
    } else {
        console.log("Control system with name '" + name + "' not found in the house.");
    }
}
SmartHouse.prototype.addDevice = function (device){
    for (var i = 0; i < this.__devices.length; i++) {
        if (this.__devices[i]._name === device._name) {
            console.log("Device with name: '" + device._name + "' is already in the house.");
            return;
        }
    }
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
SmartHouse.prototype.displayDevices = function (){
    var deviceInfo = [];
    for (const device of this.__devices) {
        var status = device.powerIsOn() ? 'enabled' : 'disabled';
        deviceInfo.push(device._name + ' - ' + status);
    }
    for (const device in deviceInfo) {
        console.log(deviceInfo[device]);
    }
}
SmartHouse.prototype.openHouse = function (){
    this.__isOpen = true;
    console.log("House '" + this.__name + "' is now open.");
}
SmartHouse.prototype.closeHouse = function (){
    this.__isOpen = false;
    console.log("House '" + this.__name + "' is now close.");
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
        console.log("There are no devices in the Smart House.");
    }
}

var sh = new SmartHouse("house1");
sh.addDevice(new Lamp("Lamp1"));
sh.addDevice(new TV("TV1"));
sh.addDevice(new Lamp("Lamp2"));
sh.getDeviceByName("Lamp1");
sh.addControlSystem("Control1");
sh.getControlSystemByName("Control1").addAlarmSystem("Alarm1");
sh.getControlSystemByName("Control1").addAlarmSystem("Alarm2");
sh.getControlSystemByName("Control1").addAlarmSystem("Alarm3");
sh.getControlSystemByName("Control1").displayControlSystems();
sh.getControlSystemByName("Control1").turnOn();
sh.getControlSystemByName("Control1").turnOnAllSystems();
sh.getControlSystemByName("Control1").displayControlSystems();
sh.getControlSystemByName("Control1").turnOffAllSystems();
sh.getControlSystemByName("Control1").displayControlSystems();







