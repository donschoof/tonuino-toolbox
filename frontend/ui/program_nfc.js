let program_nfc = {
    $btn: null,
    init: () => {

        program_nfc.$btn = $('#btn-program-nfc');

        program_nfc.$btn.click(() => {

            dialog.open({
                title: theapp.folder.folder_name + ' programmieren',
                message: 'Möchtest Du für den Ordner ' + theapp.folder.folder_name + ' eine NFC Karte programmieren?',
                detail: 'Wiedergabemodus kannst du im folgenden Dialog auswählen',
                buttons: ['Nein', 'Ja']
            }, (response) => {

                if(response.answer === 2) {

                }

            });

        });

    }
};

module.exports = program_nfc;