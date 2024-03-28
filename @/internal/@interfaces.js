import AUX from "../../module/Aux-Main.js"

export class AUXProperties {
    
    constructor({ item, i, root, rootList, itemList }) {
        /** * Forncece propriedades somente leitura sobre o *`item`* atual. */
        this.get = Object.freeze(new ItemGetters(item, itemList))
        
        /**
         * * Fornece os métodos de manipulação *`AUX`* para *`item`* atual.
         * ----
         * @example
         * item.style()
         * item.on()...
         * */
        this.item = Object.freeze(AUX(item))
        /** * Provém métodos de análises sobre o *`item`* e seus próximos (*`pai e/ou filhos`*). */
        this.is = Object.freeze(new IsMethods(item))
        /** * O índice da iteração atual. */
        this.i = i
        /** * Objeto de propriedades do elemento *`alvo`* (elemento da lista de manipulação) da iteração atual. Se *`item`*, o elemento iterado, for o um elemento da lista de manipulação, então este valor passa a ser *`null`*. */
        this.target = root? Object.freeze({
            /** * Lista de manipulação. */
            list: rootList,
            /** * O elemento *`alvo`* da iteração atual presente na *`lista de manipulação`*. */
            current: root,
            /** * Index do elemento *`alvo`* */
            i:i
        }): null
    }
};







class ItemGetters {
    /**
     * 
     * @param {HTMLElement} item 
     * @param {Array} itemList 
     */
    constructor(item, itemList) {
        this.item = item
        this.parent = item.parentNode || null
        this.index = parent? [...this.parent.children].indexOf(item) : null
        this.itemList = itemList || null
        this.id = item.id || null
        this.class = item.className || null
        this.classList = [...item.classList] || null
        this.tagName = item.tagName.toLowerCase()
        this.attrs = [...item.attributes] || null
        this.next = itemList[itemList.indexOf(item) + 1] || null
        this.prev = itemList[itemList.indexOf(item) - 1] || null;
        this.empty = item.childNodes.length <= 0? true : false
        this.text = item.textContent || null
        this.value = item.value || null
        this.checked = item.checked === undefined ? null : item.checked
        this.visible = item.checkVisibility({checkOpacity:true, checkVisibilityCSS: true})
        this.prevSibling = item.previousElementSibling || null
        this.nextSibling = item.nextElementSibling || null
        this.display = getComputedStyle(item).display
        this.layer = getComputedStyle(item).zIndex
        this.position = getComputedStyle(item).position
        this.opacity = getComputedStyle(item).opacity
        this.style = getComputedStyle(item)
        this.rect = item.getBoundingClientRect()
        this.onView = (function() {
            const pos = item.getBoundingClientRect();
            return pos.top >= 0 && pos.bottom <= window.innerHeight? true : false
        })()
    }
}


class IsMethods {
    constructor(item) {
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
