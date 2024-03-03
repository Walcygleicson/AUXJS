
/**
 * @typedef {Selector|ElementList} ElementReference
 */

/**
 * @typedef {string} Selector Uma *String* que representa um seletor *CSS* válido que aponte para um ou mais elementos existentes no *DOM*.
 */


/**
 * @typedef {Array<Selector|HTMLElement>|NodeList|HTMLCollection} ElementList Uma lista de elementos HTML e/ou Seletores válidos. Pode ser um Array, um Object, um NodeList ou um HTMLCollection.
 */

/**
 * @callback _CallbackFunction
 * @param {ElementTools} source 555
 * @param {Function} done 555555
 */

/////////// INTERFACE ELEMENT TOOLS /////////////////////////

/**
 * @typedef {object} ElementTools Object de fun
 * @property {HTMLElement} item O elemento HTML alvo da operação atual.
 * @property {number} i O index do elemento HTML atual (item) na lista de elementos alvos da operação atual (elementos fornecido em **dom()**).
 * @property {GetterProperties} get Um Objeto que provém de propriedades somente leitura que fornecem informações sobre a operação atual e o elemento alvo.
 * @property {DOMDefinerMethods} def Um Objeto que provém métodos que podem ser aplicados sobre o elemento alvo da operação atual.
 */


//////////// INTERFACE GETTER PROPERTIES ///////////////////////
/**
 * @typedef {object} GetterProperties
 * @property {HTMLElement} item O elemento HTML alvo da operação atual.
 * @property {number} index O index do elemento HTML atual (item) na lista de elementos em que ele pertence. Não confundir com a propriedade "i" que fornece o index do elemento atual na operação, ou seja o index dos elementos fornecidos em **dom()**. Se a operação estiver tratando os filhos dos elementos fornecidos a propriedade index fornecerá o índice do filho do elemento raiz
 * @property {HTMLElement} root Forcene o elemento raiz (pai) se o elemento tratado (item) for fuilho deste ou sua origem for este.
 * @property {Array<HTMLElement>} rootList Fornece um Array contendo todos os elementos raiz referente ao item atual. Se o item atual for um elemento raiz então o valor é null
 * @property {Array<HTMLElement>} itemList Fornece um Array contento todos os elementos alvos da operação atual (item)
 * @property {HTMLElement} parent O elemento pai do item atual.
 * @property {string} id O valor do atributo id do item atual.
 * @property {Array<string>} classList Lista de classes do item atual.
 * @property {boolean} visible Um valor boolean que indica se o item está visível ou não.
 * @property {HTMLElement|null} prev Fornece o elemento anterior ao item atual na lista de elementos em que ele pertence.
 * @property {HTMLElement|null} next Fornece o elemento após o item atual na lista de elementos em que ele pertence.
 * @property {HTMLElement|null} nextSibling Fornece o elemento irmão sucessor ao item atual.
 * @property {HTMLElement|null} prevSibling Fornece o elemento irmão antecessor ao item atual.
 * @property {string} tagName O nome de tag do item atual.
 * @property {object} attrs Um objeto literal contendo as propriedades e valores presente no item atual.
 */

///////////// INTERFACE DOM DEFINER METHODS ///////////////////////

/**
 * @typedef {object} DOMDefinerMethods
 * @property {(attributesObj:object)=>void} attrs Define as propriedades do item. Se uma propriedade definida já existir no item o seu valor é sobrescrito.
 * 
 * ------
 * * **attributesObj** - Um object cujo as propriedades definem um atributo e o valor.
 * 
 * @property {(txt: string)=>void} text Define o contéudo de texto do item. Se um conteúdo de texto já existir no item então este é totalmente sobrescrito.
 * 
 * ----
 * * **txt** - Uma string que representa o contéudo de texto.
 * 
 * @property {} 
 */
