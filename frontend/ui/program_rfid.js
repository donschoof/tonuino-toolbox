const { dialog } = require("electron");

let program_rfid = {
    $btn: null,
    init: () => {

        program_rfid.$btn = $('#btn-program-rfid');

        program_rfid.$btn.click(() => {

            dialog.open({
                title: theapp.folder.folder_name + ' programmieren',
                message: 'Möchtest du für den Ordner eine RFID-Karte beschreiben?',
                detail: 'Möchtest Du für den Ordner ' + theapp.folder.folder_name + ' eine RFID Karte programmieren?',
                buttons: ['Nein', 'Ja']
            }, (response) => {

                if(response.answer === 2) {

                }

            });

        });

    }
};

module.exports = program_rfid;