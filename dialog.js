const { ipcRenderer } = require('electron');

$(document).ready(() => {

    let answer = 0;
    let nfc_mode = null;

    let $buttons = $('footer .toolbar-actions button');
    let $nfc_mode_select = $('#program_nfc');

    $buttons.click((ev) => {
        let $btn = $(ev.currentTarget);
        answer = $btn.data('answer');
        nfc_mode = $nfc_mode_select.val();

        ipcRenderer.send('answer-from-dialog', {
            answer: answer,
            nfc_mode: nfc_mode
        });

    });

    ipcRenderer.on('open-dialog', (event, args) => {

        $buttons.hide();

        console.log(args);

        if(args.title) {
            $('#title, title').text(args.title);
        }

        if(args.message) {
            $('#message').text(args.message);
        }

        if(args.detail) {
            $('#detail').text(args.detail);
        }

        if(args.program_nfc) {
            $('#program_nfc').show();
        }

        if(args.buttons) {
            let i = 0;
            args.buttons.forEach((btn) => {

                $('#button_' + i).show().text(btn);
                i++;

            });
        }
    });
});