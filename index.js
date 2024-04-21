function __isValidName(name) {
  if (typeof name !== 'string') {
    console.log('Name must be a string!');
    return false;
  }
  return true;
}
// <-- Object Device -->
function Device(name) {
  if (!__isValidName()) {
    return;
  }
  this._name = name;
  this._powerOn = false;
}

// <-- Device functions -->
Device.prototype.on = function () {
  this._powerOn = true;
  console.log('Device with name "' + this._name + '" is now on.');
};
Device.prototype.off = function () {
  this._powerOn = false;
  console.log('Device with name "' + this._name + '" is now off.');
};
Device.prototype.powerIsOn = function () {
  return this._powerOn;
};
function __isValid(value) {
  return value >= 0 && value <= 100;
}

// <-- Object Lamp -->
function Lamp(name) {
  if (!__isValidName()) {
    return;
  }
  Device.call(this, name);
  this.__bright = 0;
}
Lamp.prototype = Object.create(Device.prototype);
Lamp.prototype.constructor = Lamp;

// <-- Lamp functions -->
Lamp.prototype.bright = function (bright) {
  if (bright === undefined) {
    return this.__bright;
  } else {
    if (__isValid(bright)) {
      this.__bright = bright;
    } else {
      console.log('Invalid value for bright. Min: 0, Max: 100.');
    }
  }
};

// <-- Object Conditioner -->
function Conditioner(name) {
  if (!__isValidName()) {
    return;
  }
  Device.call(this, name);
  this.__temperature = 0;
}
Conditioner.prototype = Object.create(Device.prototype);
Conditioner.prototype.constructor = Conditioner;

// <-- Conditioner functions -->
Conditioner.prototype.temperature = function (temperature) {
  if (temperature === undefined) {
    return this.__temperature;
  } else {
    if (temperature >= -25 && temperature <= 50) {
      this.__temperature = temperature;
    } else {
      console.log('Invalid value for temperature. Min: -25, Max: 50.');
    }
  }
};

// <-- Object TV -->
function TV(name) {
  if (!__isValidName()) {
    return;
  }
  Device.call(this, name);
  this.__volume = 0;
}
TV.prototype = Object.create(Device.prototype);
TV.prototype.constructor = TV;

// <-- TV functions -->
TV.prototype.volume = function (volume) {
  if (volume === undefined) {
    return this.__volume;
  } else {
    if (__isValid(volume)) {
      this.__volume = volume;
    } else {
      console.log('Invalid value for volume. Min: 0, Max: 100.');
    }
  }
};

// <-- Object Control system -->
function __ControlSystem(name, smartHouse) {
  this.__name = name;
  this.__isOn = false;
  this.__smartHouse = smartHouse;
  this.__controlDevices = [];
}
// <-- Control system functions -->
__ControlSystem.prototype.turnOn = function () {
  this.__isOn = true;
  console.log("Control System '" + this.__name + "' is now on.");
};

__ControlSystem.prototype.turnOff = function () {
  this.__isOn = false;
  this.turnOffAllSystems();
  console.log("Control System '" + this.__name + "' is now off.");
};
__ControlSystem.prototype.displayControlSystems = function () {
  var alarmSystemInfo = [];
  console.log('List of alarm systems:');
  for (var i = 0; i < this.__controlDevices.length; i++) {
    var alarmSystem = this.__controlDevices[i];
    var status = alarmSystem.__isOn ? 'enabled' : 'disabled';
    alarmSystemInfo.push(alarmSystem.__name + ' - ' + status);
  }
  for (var j = 0; j < alarmSystemInfo.length; j++) {
    console.log(alarmSystemInfo[j]);
  }
  if (alarmSystemInfo.length === 0) {
    console.log('No alarm systems.');
  }
};

// <-- Control system functions to use Alarm System -->
__ControlSystem.prototype.addAlarmSystem = function (name) {
  var alarmSystem = new __AlarmSystem(name, this);
  this.__controlDevices.push(alarmSystem);
  console.log(
    "Alarm System with name: '" +
      alarmSystem.__name +
      "' was added in your control system: '" +
      this.__name +
      "'."
  );
  return alarmSystem;
};
__ControlSystem.prototype.__findControlDevice = function (name) {
  for (var i = 0; i < this.__controlDevices.length; i++) {
    if (this.__controlDevices[i].__name === name) {
      return this.__controlDevices[i];
    }
  }
  return null;
};
__ControlSystem.prototype.turnOffAlarmSystem = function (name) {
  var alarmSystem = this.__findControlDevice(name);
  if (alarmSystem) {
    alarmSystem.__turnOff();
  } else {
    console.log('Alarm System with name "' + name + '" not found.');
  }
};

__ControlSystem.prototype.turnOnAlarmSystem = function (name) {
  var alarmSystem = this.__findControlDevice(name);
  if (alarmSystem) {
    alarmSystem.__turnOn();
  } else {
    console.log('Alarm System with name "' + name + '" not found.');
  }
};
function __checkSystems(__controlDevices, status) {
  var system = false;
  for (var i = 0; i < __controlDevices.length; i++) {
    __controlDevices[i].__isOn = status;
    system = true;
  }
  return system;
}
__ControlSystem.prototype.turnOffAllSystems = function () {
  var system = false;
  var status = false;
  system = __checkSystems(this.__controlDevices, status);
  console.log('All systems were turned off.');
  if (!system) {
    console.log('There are no systems in the Control System.');
  }
};
__ControlSystem.prototype.turnOnAllSystems = function () {
  var system = false;
  var status = true;
  system = __checkSystems(this.__controlDevices, status);
  console.log('All systems were turned on.');
  if (!system) {
    console.log('There are no systems in the Control System.');
  }
};

// <-- Object Alarm System -->
function __AlarmSystem(name, controlSystem) {
  this.__name = name;
  this.__isOn = false;
  this.__controlSystem = controlSystem;
}
// <-- Alarm System functions -->
__AlarmSystem.prototype.__turnOn = function () {
  if (this.__controlSystem.__isOn) {
    this.__isOn = true;
    console.log('Alarm System "' + this.__name + '" is now on.');
  } else {
    console.log(
      'Cannot turn on the Alarm System "' +
        this.__name +
        '". The Control System is not on.'
    );
  }
};
__AlarmSystem.prototype.__turnOff = function () {
  this.__isOn = false;
  console.log('Alarm System "' + this.__name + '" is now off.');
};
__AlarmSystem.prototype.__isOn = function () {
  return this.__isOn;
};

// <-- Object SmartHouse -->
function SmartHouse(name) {
  this.__name = name;
  this.__isOpen = false;
  this.__devices = [];
  this.__controlSystems = [];
  this.__controlSystem = false;
}

// <-- SmartHouse functions -->
SmartHouse.prototype.name = function (name) {
  if (name === undefined) {
    return this.__name;
  } else {
    this.__name = name;
  }
};
SmartHouse.prototype.openHouse = function () {
  this.__isOpen = true;
  console.log('House "' + this.__name + '" is now open.');
};
SmartHouse.prototype.closeHouse = function () {
  this.__isOpen = false;
  console.log('House "' + this.__name + '" is now close.');
};

// <-- SmartHouse functions to use Control System -->
SmartHouse.prototype.addControlSystem = function (name) {
  if (!this.__controlSystem) {
    var controlSystem = new __ControlSystem(name, this);
    this.__controlSystems.push(controlSystem);
    console.log(
      'Control System with name: "' +
        controlSystem.__name +
        '" was added in your house.'
    );
    this.__controlSystem = true;
    return controlSystem;
  } else {
    console.log('The control system is already in the house.');
  }
};
SmartHouse.prototype.getControlSystemByName = function (name) {
  for (var i = 0; i < this.__controlSystems.length; i++) {
    if (this.__controlSystems[i].__name === name) {
      return this.__controlSystems[i];
    }
  }
  console.log('Control System with name: "' + name + '" not found.');
};
SmartHouse.prototype.deleteControlSystem = function (name) {
  var controlSystemName = this.getControlSystemByName(name).__name;
  if (this.__controlSystem && controlSystemName === name) {
    delete this.__controlSystem;
    this.__controlSystem = false;
    console.log(
      'Control system "' + name + '" has been deleted from the house.'
    );
  } else {
    console.log(
      'Control system with name "' + name + '" not found in the house.'
    );
  }
};

// <-- SmartHouse functions to use Device -->
SmartHouse.prototype.addDevice = function (device) {
  for (var i = 0; i < this.__devices.length; i++) {
    if (this.__devices[i]._name === device._name) {
      console.log(
        'Device with name: "' + device._name + '" is already in the house.'
      );
      return;
    }
  }
  if (device._name !== undefined) {
    this.__devices.push(device);
    console.log('Device with name: "' + device._name + '" was added.');
  } else {
    return;
  }
};
SmartHouse.prototype.deleteDevice = function (deviceName) {
  var index = this.__devices.findIndex(function (device) {
    return device._name === deviceName;
  });
  if (index != -1) {
    this.__devices.splice(index, 1);
    console.log('Device with name: "' + deviceName + '" deleted.');
  } else {
    console.log('Device with name: "' + deviceName + '" not found.');
  }
};
SmartHouse.prototype.displayDevices = function () {
  var deviceInfo = [];
  for (var i = 0; i < this.__devices.length; i++) {
    var device = this.__devices[i];
    var status = device.powerIsOn() ? 'enabled' : 'disabled';
    deviceInfo.push(device._name + ' - ' + status);
  }
  for (var j = 0; j < deviceInfo.length; j++) {
    console.log(deviceInfo[j]);
  }
  if (deviceInfo.length === 0) {
    console.log('No devices.');
  }
};
SmartHouse.prototype.getDeviceByName = function (name) {
  for (var i = 0; i < this.__devices.length; i++) {
    if (this.__devices[i]._name === name) {
      return this.__devices[i];
    }
  }
  console.log('Device with name: "' + name + '" not found.');
};
SmartHouse.prototype.offAllDevices = function () {
  var device = false;
  for (var i = 0; i < this.__devices.length; i++) {
    this.__devices[i]._powerOn = false;
    device = true;
  }
  console.log('All devices were turned off.');
  if (!device) {
    console.log('There are no devices in the Smart House.');
  }
};

// <-- A function that displays all information about house -->
SmartHouse.prototype.displayInfoAboutHouse = function () {
  console.log('Information about the house is processed.');
  var self = this;

  function displayHouseInfo() {
    console.log('------------------------------------------');
    console.log('House name: "' + self.name() + '".');
    console.log('Open: ' + self.__isOpen);
    console.log('Control System: ' + self.__controlSystem);
    console.log('------------------------------------------');

    setTimeout(displayDevicesInfo, 2000);
  }

  function displayDevicesInfo() {
    console.log('Devices:');
    self.displayDevices();
    setTimeout(displayControlSystemsInfo, 2000);
  }

  function displayControlSystemsInfo() {
    console.log('------------------------------------------');
    for (var i = 0; i < self.__controlSystems.length; i++) {
      var controlSystem = self.__controlSystems[i];
      console.log('\nControl System name: ' + controlSystem.__name);
      controlSystem.displayControlSystems();
    }
    console.log('------------------------------------------');

    console.log('All house information is displayed.');
  }

  setTimeout(displayHouseInfo, 2000);
};

var sh = new SmartHouse('house1');

sh.addControlSystem('Control1');
sh.addDevice(new Lamp());
sh.getControlSystemByName('Control1').addAlarmSystem('Alarm1');
sh.getControlSystemByName('Control1').displayControlSystems();
// sh.addDevice(new Lamp('Lamp2'));
// sh.addDevice(new Lamp('Lamp3'));
// sh.getDeviceByName('Lamp3').on();
// sh.getDeviceByName('Lamp2').on();
// sh.displayDevices();
// sh.deleteDevice('Lamp');
// sh.displayInfoAboutHouse();
