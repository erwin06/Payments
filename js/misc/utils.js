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

function contains(ob, sElement){
    if(ob.toString().indexOf(sElement) == -1)
        return false;
    return true
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
_MONTHS.push({number:1,text:'Enero'});
_MONTHS.push({number:2,text:'Febrero'});
_MONTHS.push({number:3,text:'Marzo'});
_MONTHS.push({number:4,text:'Abril'});
_MONTHS.push({number:5,text:'Mayo'});
_MONTHS.push({number:6,text:'Junio'});
_MONTHS.push({number:7,text:'Julio'});
_MONTHS.push({number:8,text:'Agosto'});
_MONTHS.push({number:9,text:'Septiembre'});
_MONTHS.push({number:10,text:'Octubre'});
_MONTHS.push({number:11,text:'Noviembre'});
_MONTHS.push({number:12,text:'Diciembre'});

var _STATUS = [];
_STATUS.push('no status');
_STATUS.push('Pagar');
_STATUS.push('Pagué');
_STATUS.push('Pagué. Me debe');
_STATUS.push('No pagué. Me pagaron');
_STATUS.push('No pagué. No me pagaron');


var log = {

    active: true,

    info: function(message){
        if(!log.active) return;
        try{
            message = JSON.parse(message)
        } catch (e){}
        
        console.info(message)
    },

    error: function(message){
        if(!log.active) return;
        console.error(message)
    }
}