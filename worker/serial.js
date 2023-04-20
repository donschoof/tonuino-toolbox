const { SerialPort } = require('serialport');
const { ipcRenderer } = require('electron');
const logger = require('../logger');

let serial = {

    list: async () => {
         let ports = await SerialPort.list();
         await logger.log(ports);
    return ports;
    }
};

module.exports = serial;