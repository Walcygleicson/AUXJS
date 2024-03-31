import AUX from "../../module/Aux-Main.js"
import __ from "./@utils.js"

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
        this.item = __.type(item) == 'documentFragment'? Object.freeze(AUX(item.children)) : Object.freeze(AUX(item))
        /** * Provém métodos de análises sobre o *`item`* e seus próximos (*`pai e/ou filhos`*). */
        this.is = Object.freeze(new IsMethods(item))
        /** * O índice da iteração atual. */
        this.i = i
        /** * Objeto de propriedades do elemento *`alvo`* (elemento da lista de manipulação) da iteração atual. Se *`item`*, o elemento iterado, for o um elemento da lista de manipulação, então este valor passa a ser *`null`*. */
        this.target = root
            ? Object.freeze({
                  /** * Lista de manipulação. @type {Array<HTMLElement>} */
                  list: rootList,
                  /** * O elemento *`alvo`* da iteração atual presente na *`lista de manipulação`*. @type {HTMLElement} */
                  current: root,
                  /** * Index do elemento *`alvo`* @type {number} */
                  i: rootList.indexOf(root),
                  /** * Forncece propriedades somente leitura referente ao *`target`* atual. */
                  get: Object.freeze(new ItemGetters(root, rootList)),
              })
            : null;
    }
};

class ItemGetters {
    /**
     * 
     * @param {HTMLElement} item 
     * @param {Array} itemList 
     */
    constructor(item, itemList) {
        /*** Obtém o elemento da iteração atual. @type {HTMLElement}. */
        this.item = item;
        /** * Obtém o elemento pai mais próximo. Se ele não possui um pai o valor é *null* @type {HTMLElement | null}. */
        this.parent = item.parentNode || null;
        
        /** * Obtém o índice do elemento na lista de filhos em que ele está. Se ele não for filho de nenhum elemento o valor é *null* @type {number | null}. */
        this.index = this.parent ? [...this.parent.children].indexOf(item) : null;
        /** * Obtém a lista da familia em que o elemento pertence (`lista de filhos do elemento pai`). Se ele não for filho de nenhum elemento o valor é *null* @type {Array | null}. */
        this.familyList = item.parentElement? [...item.parentElement.children] : null
        this.itemList = itemList || [];
        this.id = item.id || null;
        this.class = item.className || null;
        this.classList = __.type(item) == 'documentFragment'? null : [...item.classList] || null;
        this.tagName = __.type(item) == 'documentFragment'? null : item.tagName.toLowerCase();
        this.attrList = __.type(item) == 'documentFragment'?null: [...item.attributes] || null;
        this.nextItem = __.type(item) == 'documentFragment'? null :itemList[itemList.indexOf(item) + 1] || null;
        this.prevItem = __.type(item) == 'documentFragment'? null : itemList[itemList.indexOf(item) - 1] || null;
        this.empty = item.childNodes.length <= 0 ? true : false;
        this.text = item.textContent || null;
        this.value = item.value || null;
        this.checked = item.checked === undefined ? null : item.checked;
        this.visible = __.type(item) == 'documentFragment'? null : item.checkVisibility({
            checkOpacity: true,
            checkVisibilityCSS: true,
        });
        this.prevSibling = item.previousElementSibling || null;
        this.nextSibling = item.nextElementSibling || null;
        this.display = __.type(item) == 'documentFragment'? null : getComputedStyle(item).display;
        this.layer = __.type(item) == 'documentFragment'? null : getComputedStyle(item).zIndex;
        this.position = __.type(item) == 'documentFragment'? null : getComputedStyle(item).position;
        this.opacity = __.type(item) == 'documentFragment'? null : getComputedStyle(item).opacity;
        this.style = __.type(item) == 'documentFragment'? null : getComputedStyle(item);
        this.rect = __.type(item) == 'documentFragment'? null : item.getBoundingClientRect();
        this.onView = (function () {
            if (__.type(item) !== 'documentFragment') {
                const pos = item.getBoundingClientRect();
                return pos.top >= 0 && pos.bottom <= window.innerHeight
                    ? true
                    : false;
            }

            return null
        })();
    }
}

class IsMethods {
    /**
     * @param {HTMLElement} item 
     */
    constructor(item) {
        this.this = item
        
        this.adjacentTo = function (selector) { }
        this.attrs = function (attributes, mode) { }
        this.rightOf = function (selector) { }
        this.leftOf = function (selector) { }
        this.class = function (classNames, mode) { }
        this.style = function (props, mode) { }
        //Função que testa se um elemento é semelhante a outro
        this.similarTo = function (selector) {}
        
        this.empty = function(selector, mode){} // Verifica se algum filho está vazio
    }
    
    /**
     * * Testa se o elemento é selecionável com um *`seletor CSS`* fornecido.
     * ----
     * @param {string} selector
     * * Um seletor CSS para ser avaliado.
     * ---
     */
    select(selector) {
        __.err("is.select").to(selector, "string").done();
        return this.this.matches(selector);
    }

    /**
     * * Testa se o elemento é filho de outro elemento fornecido.
     * ----
     * @param {string | HTMLElement} selector
     * * Um seletor CSS do elemento pai ou o próprio elemento como referência.
     * ---
     */
    childOf(selector) {
        __.err('is.childOf').to(selector, "string, HTMLElement").done()
        if (__.type(selector) == 'string') {
            selector = document.querySelector(selector)
        }
        return [...selector.children].includes(this.this)
    }

    /**
     * * Testa se o elemento é pai de outro elemento fornecido.
     * ----
     * @param {string | HTMLElement} selector
     * * Um seletor CSS de um elemento filho ou o próprio elemento como referência.
     * ----
     */
    parentOf(selector) {
        
        __.err("is.parentOf").to(selector, "string, HTMLElement").done();
        if (__.type(selector) == "string") {
            selector = document.querySelector(selector);
        }

        while (selector) {
            console.log(selector)
            if (selector.parentElement === this.this) {
                return true
            }
            
            selector = selector.parentElement
        }

        return false
        
    }

    /**
     * * Testa o elemento possui um outro elemento dentro dele.
     * -----
     * @param {*} selector 
     */
    contains(selector) {
        return this.this.querySelector(selector)? true : false
    }
}

