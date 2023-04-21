const { SerialPort, ReadlineParser  } = require('serialport');
const { ipcRenderer } = require('electron');
const logger = require('../logger');

let serial = {

    list: async () => {
         let ports = await SerialPort.list();
         // await logger.log(ports);
    return ports;
    },

    program_nfc_card: async (serialport, folder_name, mode) => {

        let port = new SerialPort({ path: serialport.path, baudRate: 115200, autoOpen: false });
        let parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

        let write_cmd = "write " + folder_name + " " + mode;
        await port.open(function (err){
            if (err) {
                return false;
            }
        });

        await logger.log("Writing to Serial: " + write_cmd);

        await port.write(write_cmd);

        await parser.on('data', function (data) {
            logger.log("SERIAL: " + data);
            if (data === "OK") {
                logger.log("SERIAL OK, Close port")
                port.close();
                return true; //SUCCESS
            } else if (data === "ERROR"){
                port.close();
                return false;
            }
        });
    return false;
    }
};

module.exports = serial;