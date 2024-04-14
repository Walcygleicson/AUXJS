import AUX from "../../module/Aux-Main.js"
import __ from "./@utils.js"

/**
 * @typedef {ItemGetters} ItemGetters
 */
export class ItemGetters {
    constructor({ item, itemList, i, target, targetList, substitute, options}) {
        /**
         * * Obtém o elemento que está sendo operado na iteração atual.
         * @type {HTMLElement | window | DocumentFragment}
         */
        this.item = item;

        /**
         * * Obtém o índice do *`item`* atual na lista de itens da operação.
         * > Nota: O índice fornecido não é o índice do *`item`* no DOM. Para obter a posição deste na árvore DOM acessar *`index`* propriedade.
         *
         * @type {number}
         */
        this.i = i;

        /**
         * * Fornece os métodos *`AUX`* para o *`item`* atual.
         */
        this.set = item
            ? __.type(item) == "documentFragment"
                ? Object.freeze(AUX(item.children))
                : Object.freeze(AUX(item))
            : null;

        /**
         * * Obtém o *`elemento alvo`* da operação atual.
         * > * Nota: Se estiver operando sobre estes elementos o valor é *`null`* pois o elemento alvo passa a ser o *`item`*.
         * > * *`target`*, *`targetList`* e *`targetI`* só são obtidos quando estiver operando sobre outros elementos onde este é o alvo final, ou seja, quando a operação for sobre os filhos, pai, irmãos ou outros elementos externos onde este será o destino final da operação seja ela qual for.
         *
         * @type {HTMLElement | window | DocumentFragment}
         */
        this.target = target || null;

        /**
         * * Obtém a lista de *`elementos alvos`* da operação atual.
         * @type {Array<HTMLElement>}
         */
        this.targetList = targetList || null;

        /**
         * * Obtém o índice do *`elemento alvo`* da operação atual na lista de elementos alvos em que ele estiver.
         *
         * @type {number | null}
         */
        this.targetI = target ? targetList.indexOf(target) : null;

        /**
         * * Obtém a lista de itens do processo atual.
         * @type {Array<HTMLElement>}
         */
        this.itemList = itemList || [];

        /**
         * * Obtém o próximo *`item`* da lista de itens do processo atual.
         * @type {HTMLElement | null}
         */
        this.nextItem =
            __.type(item) == "documentFragment" || item === window
                ? null
                : itemList[itemList.indexOf(item) + 1] || null;

        /**
         * * Obtém o *`item`* anterior da lista de itens do processo atual.
         * @type {HTMLElement | null}
         */
        this.prevItem =
            __.type(item) == "documentFragment" || item === window
                ? null
                : itemList[itemList.indexOf(item) - 1] || null;
        /**
         * * Obtém um elemento que ocupou o lugar de *`item`* na lista de elementos filhos se uma operação de trocar ou substituir elementos foi feita.
         * @type {HTMLElement | null}
         */
        this.substitute =
            __.type(item) == "documentFragent" || item === window
                ? null
                : substitute || null;
        
        this.options = options
    }

    /** * Obtém o objeto *`DOMRect`* do *`item`* atual. */
    get rect() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : this.item.getBoundingClientRect();
    }

    /** * Obtém o valor da propriedade computada *`display`* do *`item`* atual. */
    get display() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : getComputedStyle(this.item).display;
    }

    /**
     * * Obtém o elemento irmão sucessor do *`item`* atual.
     */
    get nextSibling() {
        return this.item.nextElementSibling || null;
    }

    /**
     * * Obtém o elemento irmão antecessor do *`item`* atual.
     */
    get prevSibling() {
        return this.item.previousElementSibling || null;
    }

    /**
     * * Retorna o elemento pai no *`item`* atual.
     */
    get parent() {
        return this.item.parentElement || null;
    }

    /**
     * * Indica se o *`item`* atual está visível na tela, levando em consideração sua *`visibilidade`*, *`opacidade`* e *`display`*.
     */
    get isVisible() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : this.item.checkVisibility({
                  checkOpacity: true,
                  checkVisibilityCSS: true,
              });
    }

    /**
     * * Indica se o *`item`* atual está vazio (*`sem elementos filhos ou conteúdo de texto`*)
     */
    get isEmpty() {
        return this.item !== window
            ? this.item.children.length <= 0 && this.item.innerText == ""
                ? true
                : false
            : null;
    }

    /**
     * * Obtém o valor da opacidade (*`CSS opacity`*) do *`item`* atual.
     */
    get opacity() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : getComputedStyle(this.item).opacity;
    }

    /**
     * * Obtém um *`objeto`* de propriedades de estilos CSS computados do *`item`* atual.
     */
    get style() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : getComputedStyle(this.item);
    }

    /**
     * * Obtém a camada (*`z-index`*) do *`item`* atual.
     */
    get layer() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : getComputedStyle(this.item).zIndex;
    }

    /** * Obtém o valor do atributo HTML *`checked`* do *`item`* atual. */
    get checked() {
        return this.item.checked === undefined ? null : this.item.checked;
    }

    /** * Obtém o valor do atributo HTML *`selected`* do *`item`* atual. */
    get selected() {
        return this.item.selected === undefined ? null : this.item.selected;
    }

    /** * Obtém o *`value`* atributo do *`item`* atual. */
    get value() {
        return this.item.value || null;
    }

    /**
     * * Obtém o conteúdo de texto do *`item`* atual.
     */
    get text() {
        return this.item.textContent || null;
    }

    /**
     * * Obtém os atributos do *`item`* atual.
     */
    get attrs() {
        if (__.type(this.item) != "documentFragment" || this.item !== window) {
            return this.item.attributes;
        }

        return null;
    }

    /**
     * * Indica se o *`item`* atual está dentro da janela ao rolar.
     */
    get isOnView() {
        if (__.type(this.item) !== "documentFragment" && this.item !== window) {
            const pos = this.item.getBoundingClientRect();
            return pos.top >= 0 && pos.bottom <= window.innerHeight
                ? true
                : false;
        }

        return null;
    }

    /**
     * * Obtém uma lista de nomes da classe do *`item`* atual.
     */
    get classList() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : [...this.item.classList] || null;
    }

    /**
     * * Obtém o nome de tag do *`item`* atual.
     */
    get tag() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : this.item.tagName.toLowerCase();
    }

    /**
     * * Obtém o valor do *`id`* atributo do *`item`* atual.
     */
    get id() {
        return this.item.id || null;
    }

    /**
     * * Obtém uma lista de irmãos  do *`item`* atual, incluindo ele mesmo.
     */
    get family() {
        return this.item.parentElement
            ? [...this.item.parentElement.children]
            : null;
    }

    /**
     * * Obtém o índice do *`item atual`* na lista de elementos filhos em que ele estiver.
     */
    get index() {
        return this.item.parentElement
            ? [...this.item.parentElement.children].indexOf(this.item)
            : null;
    }

    /**
     * * Obtém a quantidade de filhos que o *`item`* atual possui.
     */
    get childLength() {
        return __.type(this.item) == "documentFragment" || this.item === window
            ? null
            : this.item.children.length;
    }

    /**
     * * Obtém a quantidade de filhos que o elemento *`target`* atual possui.
     */
    get targetChildLength() {
        return this.target ? this.target.children.length : null;
    }

    /**
     * Indica se o *`item`* atual está com foco.
     */
    get focused() {
        return this.item === document.activeElement;
    }

    /**
     * * Obtém a lista de elementos diretamente filhos do *`item`*.
     */
    get childs() {
        return this.item === window ? null : [...this.item.children];
    }

    /**
     * * Obtém o primeiro elemento filho da lista de elementos filhos de *`item`*.
     * @returns {HTMLElement}
     */
    get firstChild() {
        return this.item === window ? null : this.item.firstElementChild;
    }

    /**
     * * Obtém o último elemento filho da lista de elementos filhos de *`item`*.
     * @returns {HTMLElement}
     */
    get lastChild() {
        return this.item === window ? null : this.item.lastElementChild;
    }

    get width() {
        return this.set.get().width
    }
    
}



