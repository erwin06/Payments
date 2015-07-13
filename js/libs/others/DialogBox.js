var _func;
/**
 * Está clase contiene alertas, confirms
 * Modifica alert, confirm originales de JavaScript
 *
 * Depende de Bootstrap 3 y BlockUi de Jquery
 *
 * Created by Erwin on 24/04/14.
 * Last Update: 2014-06-28
 */
var alert = {
    buttons: {
        ok: ["Ok"],
        aceptar: ["Aceptar"]
    },
    defaultButton: ["Aceptar"],
    /**
     * Setea el boton por defecto que va a aparecer en el mensaje del alerta.
     * Por defecto dice "Aceptar"
     * @param button - Se debe utilizar los botones que estan cargados.
     *                      Por ejemplo: alert.buttons.ok
     *                 - Si se quiere agregar otro texto entonces tiene que ser
     *                   de esta forma ["texto"].
     *                 - Si son mas botones["texto1","texto2"].
     */
    setButtonDefault: function(button) {
        alert.defaultButton = button;
    },
    info: function(message, callback) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';

        alert.show("i", message, alert.defaultButton, function() {
            alert.hide();
            if (callback && typeof callback == 'function')
                callback();
        });
    },
    success: function(message, callback) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';

        alert.show("s", message, alert.defaultButton, function() {
            alert.hide();
            if (callback && typeof callback == 'function')
                callback();
        });
    },
    warn: function(message, callback) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';
        alert.show("w", message, alert.defaultButton, function() {
            alert.hide();
            if (callback && typeof callback == 'function')
                callback();
        });
    },
    error: function(message, callback) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';
        alert.show("e", message, alert.defaultButton, function() {
            alert.hide();
            if (callback && typeof callback == 'function')
                callback();
        });
    },
    show: function(level, message, buttons, callback) {
        var _class = "";
        var _buttons = "";
        var _buttonClass = "";
        if (callback)
            _func = callback;
        else
            _func = function() {
            };

        switch (level) {
            case "i":
                _class = 'alert-info';
                _buttonClass = 'btn-info';
                break;
            case "s":
                _class = 'alert-success';
                _buttonClass = 'btn-success';
                break;
            case "w":
                _class = 'alert-warning';
                _buttonClass = 'btn-warning';
                break;
            case "e":
                _class = 'alert-danger';
                _buttonClass = 'btn-danger';
                break;
        }

        if (buttons) {
            var cButtons = buttons.length;
            _buttons = "<br><br>";
            for (var i = 0; i < cButtons; i++) {
                _buttons += ' <button id="btnAlert' + buttons[i] + '" onclick="_func(\'' + buttons[i] + '\')" class="btn ' + _buttonClass + '">' + buttons[i] + '</button> ';
            }
        }

        $.blockUI({
            message: '<div class="alert ' + _class + '"> ' + message + ' ' +
                    ' ' + _buttons + ' </div>',
            css: {backgroundColor: "transparent", border: 0}
        });
    },
    hide: function() {
        $.unblockUI();
    }

}


var confirm = {
    buttons: {
        ok: "Ok",
        cancel: "Cancel",
        yes: "Yes",
        no: "No",
        accept: "Accept",
        si: "Si",
        cancelar: "Cancelar",
        aceptar: "Aceptar",
        si_no_cancelar: ["Si", "No", "Cancelar"]
    },
    defaultButton: ["Aceptar", "Cancelar"],
    /**
     * Setea el boton por defecto que va a aparecer en el mensaje del alerta.
     * Por defecto dice "OK - Cancel"
     * @param button    - Se debe utilizar los botones que estan cargados.
     *                      Por ejemplo: [confirm.buttons.ok, confirm.buttons.no]
     *                  - Si se quiere agregar otro texto entonces tiene que ser
     *                      de esta forma ["texto"].
     *                  - Si son mas botones["texto1","texto2"].
     * @return {String} - Retorna como parametro de la función de callback el
     *                      nombre del botón que se presionó
     */
    setButtonDefault: function(buttonsArray) {
        confirm.defaultButton = buttonsArray;
    },
    info: function(message, callback, buttons) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';

        if (!buttons)
            buttons = confirm.defaultButton;

        alert.show("i", message, buttons, function(btn) {
            alert.hide();
            if (callback && typeof callback == 'function')
                callback(btn);
        });
    },
    success: function(message, callback, buttons) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';

        if (!buttons)
            buttons = confirm.defaultButton;

        alert.show("s", message, buttons, function(btn) {
            alert.hide();
            if (callback && typeof callback == 'function')
                callback(btn);
        });
    },
    warn: function(message, callback, buttons) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';
        if (!buttons)
            buttons = confirm.defaultButton;
        alert.show("w", message, buttons, function(btn) {
            alert.hide();
            if (callback && typeof callback == 'function')
                callback(btn);
        });
    },
    error: function(message, callback, buttons) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';
        if (!buttons)
            buttons = confirm.defaultButton;
        alert.show("e", message, buttons, function(btn) {
            alert.hide();
            if (callback && typeof callback == 'function')
                callback(btn);
        });
    }

};


var prompt = {
    buttons: {
        ok: "Ok",
        cancel: "Cancel",
        yes: "Yes",
        no: "No",
        accept: "Accept",
        si: "Si",
        cancelar: "Cancelar",
        aceptar: "Aceptar",
        si_no_cancelar: ["Si", "No", "Cancelar"],
        ok_cancel: ["Ok", "Cancel"],
        accept_cancel: ["Accept", "Cancel"],
        aceptar_cancelar: ["Aceptar", "Cancelar"]
    },
    setButtonDefault: function(buttonsArray) {
        prompt.defaultButton = buttonsArray;
    },
    defaultButton: ["Ok", "Cancel"],
    info: function(message, callback, type) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';

        prompt.show('i', message, callback, type);

  },
    show: function(level, message, callback, type) {
        var _class = "";
        var _buttons = "";
        var _buttonClass = "";
        var buttons = prompt.defaultButton;
        if (callback)
            _func = function() {
                var elem = document.getElementById('idPrompt');
                var value;
                if (elem) {
                    value = elem.value;
                    callback(value);
                }
            };
        else
            _func = function() {
            };

        if (!type)
            type = "text";


        switch (level) {
            case "i":
                _class = 'alert-info';
                _buttonClass = 'btn-info';
                break;
            case "s":
                _class = 'alert-success';
                _buttonClass = 'btn-success';
                break;
            case "w":
                _class = 'alert-warning';
                _buttonClass = 'btn-warning';
                break;
            case "w":
                _class = 'alert-danger';
                _buttonClass = 'btn-danger';
                break;
        }

        _buttons += ' <button type="submit" id="btnAlert' + buttons[0] + '"  class="btn ' + _buttonClass + '">' + buttons[0] + '</button> ';
        _buttons += ' <button type="button" id="btnAlert' + buttons[1] + '" onclick="hideAlert()" class="btn ' + _buttonClass + '">' + buttons[1] + '</button> ';


        var mssAux = '<div class="alert ' + _class + '"><form id="formPrompt" onsubmit="_func()"><div class="text-left">' + message +
                '</div><br><input type="' + type + '" class="form-control" id="idPrompt" required><br> ' + _buttons + '</form></div>';

        $.blockUI({
            message: mssAux,
            css: {backgroundColor: "transparent", border: 0}
        });
    }

};


var notification = {
    info: function(message, callback) {
        if (message && typeof message != 'string')
            message = 'Invalid input string';


        showAlert("i", message, null ,callback);
    },
    hide: function() {
        hideAlert();
    }

};

/**
 * Muestra un mensaje en pantalla bloqueando la UI
 * @param level - Nivel de mensaje (INFO, SUCCESS, WARNING, ERROR)
 * @param message - Mensaje a mostrar
 * @param buttons - Arreglo con los botones a mostrar Ejemplo: ['btn1','btn2','btnN']
 * @param callback - Funcion de callback, devuelve el numero del boton precionado (0.. n)
 */
function showAlert(level, message, buttons, callback) {

    var _class = "";
    var _buttons = "";
    var _buttonClass = "";
    if (callback)
        _func = callback;
    else
        _func = function() {
        };

    switch (level) {
        case "i":
            _class = 'alert-info';
            _buttonClass = 'btn-info';
            break;
        case "s":
            _class = 'alert-success';
            _buttonClass = 'btn-success';
            break;
        case "w":
            _class = 'alert-warning';
            _buttonClass = 'btn-warning';
            break;
        case "e":
            _class = 'alert-danger';
            _buttonClass = 'btn-danger';
            break;
    }

    if (buttons) {
        var cButtons = buttons.length;
        _buttons = "<br><br>";
        for (var i = 0; i < cButtons; i++) {
            _buttons += ' <button id="btnAlert' + buttons[i] + '" onclick="_func(\'' + buttons[i] + '\')" class="btn ' + _buttonClass + '">' + buttons[i] + '</button> ';
        }
    }

    $.blockUI({
        message: '<div class="alert ' + _class + '"> ' + message + ' ' +
                ' ' + _buttons + ' </div>',
        css: {backgroundColor: "transparent", border: 0}
    });
}


function hideAlert() {
    $.unblockUI();
}
