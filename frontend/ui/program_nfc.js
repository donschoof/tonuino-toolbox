let program_nfc = {
    $btn: null,
    init: () => {

        program_nfc.$btn = $('#btn-program-nfc');

        program_nfc.$btn.click(() => {

            dialog.open({
                title: 'NFC Karte programmieren',
                message: 'NFC Karte für den Ordner ' + theapp.folder.folder_name + ' programmieren',
                detail: 'Wähle den gewünschten Wiedergabemodus aus',
                program_nfc: true,
                buttons: ['Abbrechen', 'Programmieren']
            }, (response) => {
                if(response.answer === 2) {

                    worker_api.command('serial_program_nfc_card', {
                        data: {
                            serialport: theapp.serialPort,
                            folder: theapp.folder,
                            mode: response.nfc_mode
                        },
                        success: (response) => {
                            theapp.$btn_group_folder_opt.hide();
                        }
                    });

                }

            });

        });

    }
};

module.exports = program_nfc;