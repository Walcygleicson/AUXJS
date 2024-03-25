
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

        deleteNotUsed(type, this)
    }
};


/**
 * @memberof AUXCallbackSources
 */
class GetterProperties {
    constructor(item, type) {
        this.item = item
        this.step = null
        this.type = null
        this.index = null
        this.root = null
        this.rootList = null
        this.itemList = null
        this.parent = null
        this.id = null
        this.class = null
        this.classList = null
        this.tagName = null
        this.attrs = null
        this.next = null
        this.prev = null
        this.childLength = null
        this.empty = null
        this.childList = null
        this.text = null
        this.event = null
        this.value = null
        this.trigger = null
    }
}


class DefinerMethods {
    constructor(target, type) {
        this.attrs = function(attrs){console.log(target)}
    }
}


class IsMethods {
    constructor(target, type) {
        this.selector = function (selector) { }
        this.childOf = function (selector) { }
        this.parentOf = function (selector) { }
        this.adjacentTo = function (selector) { }
        this.attrs = function (attributes, mode) { }
        this.rightOf = function (selector) { }
        this.leftOf = function (selector) { }
        this.class = function (classNames, mode) { }
        this.style = function (props, mode) { }
        this.tag = function (tagNames, mode) { }
        this.minChilds = function (num) { }
        this.maxChilds = function (num) { }
        this.empty = function(selector, mode){} // Verifica se algum filho está vazio
    }
}


////////////////////////////////////////////////////////
const base = {
    dom: [],
    obj: [],
    evt: ['event']
}

function deleteNotUsed(type, _this) {
    
    if (type !== 'dom') {
        
    }
}