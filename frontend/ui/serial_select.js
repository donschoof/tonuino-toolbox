let serial_select = {

    $select: null,
    $dropdown: null,
    $list: null,
    $value: null,
    $serial_refresh: null,
    $serial_refresh_icon: null,

    init: (callback) => {

        serial_select.$select = $('#serial-select');
        serial_select.$dropdown = $('#serial-dropdown');
        serial_select.$list = serial_select.$dropdown.find('.list-group');
        serial_select.$value = serial_select.$select.find('.display-value');
        serial_select.$serial_refresh = $('#serial-refresh');
        serial_select.$serial_refresh_icon = serial_select.$serial_refresh.find('.icon');

        serial_select.initEvents();
        serial_select.initSerialPorts({
            autoselect: true,
            callback: callback
        });

    },

    reload: () => {
        serial_select.initSerialPorts();
    },

    initSerialPorts: (options) => {

        options = $.extend({}, {
            autoselect: false,
            callback: null
        }, options);

        serial_select.$list.empty();

        serial_select.$serial_refresh_icon.addClass('fa-spin');

        worker_api.command('list_serial_ports', {
            success: async (serialPorts) => {

                await helper.asyncForEach(serialPorts, async (serialPort) => {

                    let $li = $(`
                        <li class="list-group-item ports">
                          <span class="icon icon-drive icon-text"></span> ` + serialPort.path + `</strong>
                        </li>
                    `);

                    $li.click((ev) => {
                        serial_select.$dropdown.hide();
                        serial_select.setPort(serialPort);

                        theapp.setSerialPort(serialPort);
                        theapp.reload();
                    });

                    serial_select.$list.append($li);
                });

                /*
                 * If we only have one Port, we assume that its the right one
                 */
                let $li_ports = serial_select.$list.find('.ports');
                if (options.autoselect && $li_ports.length > 0) {
                    $li_ports.first().trigger('click');
                }
                if (options.callback) {
                    options.callback(serialPorts);
                }

                /*
                 * mini lade animation stoppen
                 */
                setTimeout(() => {
                    serial_select.$serial_refresh_icon.removeClass('fa-spin');
                }, 800);
            }
        });

    },

    setPort: (serialPort) => {
        serial_select.$value.text(serialPort.path);
    },

    initEvents: () => {

        serial_select.$serial_refresh.click(() => {
            serial_select.initSerialPorts();
        });


    }

};

module.exports = serial_select;