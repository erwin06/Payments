function existsVar(a) {
    if (!a || a == null || a == undefined || a == "null" || a == "undefined")
        return false;
    else
        return true;
}

function hideModal() {
    $('.modal').modal('hide');
}

function server_error(){
    alert.error("Error al conectar con el servidor.");
}

function getMonthName(index){
    return _MONTHS[index - 1];
}

/**
 * Reemplaza un texto en todos los lugares que encuentre
 *
 * @param {String} text string donde se debe buscar el patron
 * @param {String} search patron a buscar
 * @param {String} newstring no se que es
 * @return: {String} Texto con el patron reemplazado en todos lados.
 */
function replaceAll(text, search, newstring ){
    while (text.toString().indexOf(search) != -1)
        text = text.toString().replace(search,newstring);
    return text;
}

var _MONTHS = [];
_MONTHS.push('Enero');
_MONTHS.push('Febrero');
_MONTHS.push('Marzo');
_MONTHS.push('Abril');
_MONTHS.push('Mayo');
_MONTHS.push('Junio');
_MONTHS.push('Julio');
_MONTHS.push('Agosto');
_MONTHS.push('Septiembre');
_MONTHS.push('Octubre');
_MONTHS.push('Noviembre');
_MONTHS.push('Diciembre');

var _STATUS = [];
_STATUS.push('no status');
_STATUS.push('Pagar');
_STATUS.push('Pagué');
_STATUS.push('Pagué. Me debe');
_STATUS.push('No pagué. Me pagaron');
_STATUS.push('No pagué. No me pagaron');