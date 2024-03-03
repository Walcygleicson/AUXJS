
/**
 * @interface AUXCallbackSources
 */
export class AUXCallbackSources {
    /**
     * @param {string} type
     * > * "dom" para elementos
     * > * "evt" para eventos
     * > * "obj" para outros objetos como Object, Array, Number, String
     * 
     * @param {Object} infos Informações particulares da iteração atual
     * @param {HTMLElement} infos.item O item da interação atual
     * @param {number} infos.i O index do root da iteração atual
     * @param {HTMLElement} infos.root O eleemnto root da interação atual
     * @param {Array} infos.rootList Lista de roots
     * @param {PointerEvent} infos.event PointerEvent de uma evento
     */

    constructor(type, {item, i, root, rootList, event}) {
        this.get = new GetterProperties(item, type)
        this.def = new DefinerMethods(item, type)
        this.item = item
        this.i = 0
        this.event = event
    }
};


/**
 * @memberof AUXCallbackSources
 */
class GetterProperties {
    constructor(item, type) {
        this.item = item
        this.done = function done() { console.log('DONE()') }
        
    }
}


class DefinerMethods {
    constructor(target, type) {
        this.attrs = function(attrs){console.log(target)}
        this.done = function done() {
            console.log("DONE()");
        };
    }
}


const delBase = {
    dom: ['event'],
    obj: [],
    evt: []
}

function deleteNotUsed(type, _this) {
    switch (type) {
        
        case 'dom':

    }
}