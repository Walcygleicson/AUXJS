import __ from "../@/internal/@utils.js";
import { ItemGetters } from "../@/internal/@interfaces.js";

"use strict";
/**
 * @typedef {import("../@/docs/@Aux-Typedef.js").HandlerFunction} HandlerFunction
 * @typedef {import("../@/docs/@Aux-Typedef.js").EventHandlerFunction} EventHandlerFunction
 * @typedef {import("../@/docs/@Aux-Typedef.js").CSSUnit} CSSUnit
 * @typedef {import("../@/docs/@Aux-Typedef.js").StyleProperties} StyleProperties
 * @typedef {import("../@/docs/@Aux-Typedef.js").ChildReference} ChildReference
 * @typedef {import("../@/docs/@Aux-Typedef.js").ElementSelector} ElementSelector
 * @typedef {import("../@/docs/@Aux-Typedef.js").AttributesObject} AttributesObject
 * @typedef {import("../@/docs/@Aux-Typedef.js").CSSDisplayValue} CSSDisplayValue
 * @typedef {import("../@/docs/@Aux-Typedef.js").FormHandlerFunction} FormHandlerFunction
 * @typedef {import("../@/docs/@Aux-Typedef.js").EventListeners} EventListeners
 * @typedef {import("../@/docs/@Aux-Typedef.js").EventOptions} EventOptions
 * @typedef {import("../@/docs/@Aux-Typedef.js").EventType} EventType
 * @typedef {import("../@/docs/@Aux-Typedef.js").SiblingKeys} SiblingKeys
 */


var AUX = (function () {
    const version = "1.0.0";

    const NUMB = 999999999;

    /**Armazena tipos personalisados */
    const t = {
        /**"number, string, HTMLElement, null" */
        IDXREF: "number, string, HTMLElement, null",

        ELREF: "HTMLElement, HTMLSelector, elementList",

        CLASSLIST: "string, array, object",
    };

    //================ FUNÇÕES INTERNAS ==============================================//

    /**Armazena os ouvintes de eventos que foram marcados para serem removidos posteriormente */
    var eventRemoveStack = {};
    /** Responsável por adicionar referências de ouvintes à pilha de remoção de eventos */
    const addToRemoveStack = function ({
        root,
        type,
        handler,
        fn,
        options = {},
    }) {
        // Pilha de remoção de eventos // Adicionar somente se a função possuir nome ou se options.times não for definida.
        if (
            options.removeStack &&
            handler.name &&
            options.times === undefined
        ) {
            //Verificar se uma pilha do tipo já foi adicionado, se não, adicionar
            if (!eventRemoveStack[type]) {
                eventRemoveStack[type] = [];
            }

            // Adicionar referencia ao elemento // Verificar se elemento já não está na lista
            options.isOnStack = (function () {
                for (let i = 0; i < eventRemoveStack[type].length; i++) {
                    if (eventRemoveStack[type][i].target === root) {
                        options.targetId = i; // Informar onde a referencia do elemento está
                        return true;
                    }
                }

                return false;
            })();

            // Se referencia ao elemento já estiver guardado apenas adicionar as referncias aos ouvintes
            if (options.isOnStack) {
                eventRemoveStack[type][options.targetId].list.push({
                    fn: fn,
                    handler: handler,
                });
            } else {
                // Se não criar referencia nova
                eventRemoveStack[type].push({
                    target: root,
                    list: [
                        {
                            fn: fn,
                            handler: handler,
                        },
                    ],
                });
            }
        }
    };

    /**Intera sobre os elementos obtidos
     * @param {(root: HTMLElement)=>void} fn
     */
    const to = function (fn, thisElements) {
        var i = 0;
        if (thisElements.length > 1) {
            while (true) {
                fn(thisElements[i], i++);
                if (i >= thisElements.length) break;
            }
        } else {
            fn(thisElements[0], i);
        }
    };

    //================ MÉTODOS PÚBLICOS ===========================================//
    ///
    ///
    ////// AUX Constructor Lib ////////////////
    /**
     * **AUX.JS**
     *
     * --------
     *  Ler Documentação {@link https://walcygleicson.github.io/AUXDocs/ AUXDocs}
     *
     * --------
     * * Aponta para elementos HTML (ou os obtém) e fornece métodos para manipulação do mesmo.
     *-----
     * @param {ElementReference} selectors
     * * Deve receber uma referência a um ou mais elementos HTML existentes no DOM. Podendo ser:
     * -------
     * > * Uma String que representa um seletor CSS (ou múltiplos seletores separados por vírgula) válido que aponte para um ou mais elementos existentes no DOM.
     *
     * > * Um Array ou Object contendo seletores CSS válidos e/ou elementos HTML para manipulação.
     *
     * > * Um HTMLElement ou NodeList ou HTMLCollection para manipulação.
     * -----
     * * Nota: Qualquer valor que não seja ou não faça nenhum tipo de referência a algum elemento HTML resultará em um erro!
     * @returns {AUX}
     */
    var AUX = function (selectors = window) {
        if (!(this instanceof AUX)) {
            return new AUX(selectors);
        }
        const thisObj = this;
        //Tratar erros de argumento
        const error = __.err("AUX");

        error
            .to(selectors, t.ELREF + ", window")
            .isVoid(selectors, 1)
            .done();

        /** * Retorna um Array contento todos os elementos da lista de elementos obtidos por *`AUX`* @type {Array<HTMLElement>}*/
        this.targets = __.ex(selectors, error);

        /** * Retorna a quantidade de elementos da lista obtida por *`AUX`*. @type {number}*/
        this.length = this.targets.length || null;

        /**
         * * Objeto de propriedades que retornam os valores de todas as propriedades CSS atualizadas de um elemento (o primeiro da lista de manipulação se existir mais de um).
         * @type {CSSStyleDeclaration | null}
         */
        this.getStyle =
            selectors !== window
                ? window.getComputedStyle(this.targets[0])
                : null;

        /** * Fornece métodos que adiciona ou remove elementos da lista de manipulação principal. */
        this.list = {
            /**
             * * Adiciona novos elementos HTML à lista de manipulação.
             * ---------
             * @param {ElementReference} selectors
             * * Deve receber uma referência a um ou mais elementos HTML existentes no DOM. Podendo ser:
             * > -------
             * > * Uma String que representa um seletor CSS (ou múltiplos seletores separados por vírgula) válido que aponte para um ou mais elementos existentes no DOM.
             * > * Um Array ou Object contendo seletores CSS válidos e/ou elementos HTML para manipulação.
             * > * Um HTMLElement ou NodeList ou HTMLCollection para manipulação.
             * -----
             * * Nota: Qualquer valor que não seja ou não faça nenhum tipo de referência a algum elemento HTML resultará em um erro!
             * ---
             */
            add(selectors) {
                var err = __.err("AUX.list.add");
                err.to(selectors, t.ELREF).isVoid(selectors).done();
                thisObj.targets.push(...__.ex(selectors, err));
                err = null;
                return thisObj;
            },

            /**
             * * Remove um ou mais elementos da lista de manipulação. Pode selecionar os elementos alvos da lista através de seus seletores CSS ou seus índices e outros.
             * -----
             * @param {elementListReference} whichElements
             * * Uma referência do elemento ou sua posição (index) na lista de elementos para remoção. Podendo ser:
             *
             * > * Um número de índice ou Array de índices para múltiplas remoções
             *
             * > * Um seletor CSS que aponte para algum elemento da lista ou Array de seletores para múltiplas remoções.
             *
             * > * O elemento existente na lista ou Array de elementos.
             * -----
             * **Alguns exemplos de uso:**
             * @example
             * .remove(1) // Remove o segundo elemento da lista
             * // Ou
             * .remove([0,1]) // Remove o primeiro e o segundo elemento
             * // Ou
             * .remove(".my-div") // Remove os elementos correspondentes ao seletor
             * // Ou
             * .remove([".my-div", "#btn"])
             */
            remove(whichElements) {
                __.err("AUX.list.remove")
                    .to(whichElements, "number, string, array")
                    .done();
                whichElements = __.getElementsOfList(
                    whichElements,
                    thisObj.targets
                );
                thisObj.targets = thisObj.targets.filter((e) => {
                    if (!whichElements.includes(e)) {
                        return e;
                    }
                });

                return thisObj;
            },
        };

        /**
         * * Objeto fornece propriedades somente leitura sobre aspectos do elemento *`alvo`*.
         */
        this.is = Object.freeze({
            /**
             * * Indica se o elemento está em foco.
             */
            get focused() {
                for (let i = 0; i < thisObj.targets.length; i++) {
                    if (thisObj.targets[i] === document.activeElement) {
                        return true;
                    }
                }

                return false;
            },

            /**
             * * Indica se o elemento está visível na tela, levando em consideração sua *`visibilidade`*, *`opacidade`* e *`display`*.
             */
            get visible() {
                for (let i = 0; i < thisObj.targets.length; i++) {
                    if (
                        thisObj.targets[0] !== window &&
                        thisObj.targets[i].checkVisibility({
                            checkOpacity: true,
                            checkVisibilityCSS: true,
                        })
                    ) {
                        return true;
                    }
                }

                return false;
            },

            get checked() {
                for (let i = 0; i < thisObj.targets.length; i++) {
                    if (thisObj.targets[i].checked) {
                        return true;
                    }
                }

                return false;
            },
        });
    };

    /**Objeto de propriedades que imprimem no console informações sobre a biblioteca.*/
    AUX.info = {
        /**Imprime no console a versão da biblioteca. */
        get version() {
            console.group("AUX version:");
            console.log("▷ " + version);
            console.groupEnd();
            return this;
        },
        /**Imprime no console o endereço do repositório.*/
        get lib() {
            console.group("AUX lib:");
            console.log("▷ https://github.com/Walcygleicson/AUXJS");
            console.groupEnd();
            return this;
        },
        /**Imprime no console o endereço da documentação.*/
        get docs() {
            console.group("AUX docs:");
            console.log("▷ " + "https://github.com/Walcygleicson/AUXDocs");
            console.groupEnd();
            return this;
        },
        /**Imprime no console o nome do autor + data de criação da biblioteca. */
        get author() {
            console.group("AUX author:");
            console.log(
                "▷ Walcygleicson M. de Oliveira.",
                "\n ©️ Brasil - 29/Fev/2024"
            );
            console.groupEnd();
            return this;
        },
    };

    //************* EXTENDER BIBLIOTECA ************************

    /////////////////// .text /////////////////////
    /**
     * * Define o contéudo de texto do elemento. Todos os nós filhos deste elemento serão excluídos e substituídos pelo valor fornecido.
     * -----
     * @param {string} text
     * *`(opcional)`*
     * * O conteúdo de texto que será inserido no elemento alvo. Se nenhum argumento for passado todo o conteúdo do elemento alvo será limpo (substituído por uma string vazia).
     * ----
     * @example
     * .text("Click-Me") => <button>Click-me</button>
     */
    AUX.prototype.text = function (text = "") {
        __.err("AUX.text").isWindow(this.targets).done();
        to((root) => {
            root.textContent = text;
        }, this.targets);
        return this;
    };

    ///////// .html //////////////////////////
    /**
     * * Define o contéudo HTML do elemento. Todos os nós filhos deste elemento serão excluídos e substituídos pelo conteúdo fornecido.
     * ----
     * @param {string} stringHTML
     * *`(opcional)`*
     * * O conteúdo HTML que será inserido no elemento alvo. Se nenhum argumento for passado todo o conteúdo HTML do elemento alvo será limpo (substituído por uma string vazia).
     * ----
     * @example
     * .html("<button>Click</button>") => <div><button>Click</button></div>
     */
    AUX.prototype.html = function (stringHTML = "") {
        __.err("AUX.html").isWindow(this.targets).done();
        to((root) => {
            root.innerHTML = stringHTML;
        }, this.targets);
        return this;
    };

    /////////// .style ///////////////////////////
    /**
     * * Define as propriedades de estilo do elemento. O estilo é aplicado inline.
     * ----
     * @param {StyleProperties} styleProps
     * * Um objeto que define as propriedades de estilos CSS e seus valores.
     * * Obs: Usar  **`camelCase`** em nomes compostos de propriedades ao invés de separá-las com "-" (traço, sinal de menos).
     * * Exceção para declarações de variáveis que devem ser escritas da forma tradicional entre aspas `"--bgcolor": "#67cda8"`.
     * @param {CSSUnit} defaultUnit
     * *`(opcional)`*
     * * Define uma unidade de medida padrão (*`px, em, pt, ...`*) quando um *`number`* for passado como valor de medida de uma propriedade CSS. Se nada for passado o padrão é *`"px"`*.
     * * > **Nota:** Essa definição só se aplica a valores do tipo *`number`*, se um número em string for passada sem o sufixo de unidade de mediada CSS nada será aplicado.
     * ----
     * @example
     * Exemplo de uso da unidade CSS padrão.
     *
     * .style({margin: 20}) => "20px" // Padrão "px"
     * .style({margin: 20}, "em") => "20em"
     * .style({margin: "20"}, "em") => "20" // Não se aplica
     * .style({margin: "20em"}) => "20em"
     *
     * Exemplo geral.
     *
     * .style({
     *      padding: "10px"
     *      display: "flex",
     *      flexDirection: "column",
     *      justifyContent: "center",
     *      alignItems: "center"
     *      border: "1px solid #aa98ff",
     *      "--bg-color": "gray"
     * })
     */
    AUX.prototype.style = function (styleProps, defaultUnit = "px") {
        __.err("AUX.style")
            .to(styleProps, "object")
            .isVoid(styleProps)
            .isWindow(this.targets)
            .to(defaultUnit, "number, string", false)
            .done();

        let propName;
        to((root) => {
            Object.keys(styleProps).forEach((prop) => {
                propName = prop
                    .replace(/([a-z])([A-Z])/g, "$1-$2")
                    .toLowerCase();

                root.style.setProperty(
                    propName,
                    __.type(styleProps[prop]) == "number"
                        ? styleProps[prop] + defaultUnit
                        : styleProps[prop]
                );
            });
        }, this.targets);
        propName = null;
        return this;
    };

    /////////////// .console //////////////////
    /**
     * * Imprime no console do navegador os elementos da lista de manipulação principal.
     */
    AUX.prototype.console = function () {
        this.targets.length > 1
            ? (console.group("elementList (Array):"),
              console.log(this.targets),
              console.log(...this.targets))
            : (console.group(
                  this.targets[0] !== window
                      ? this.targets[0].tagName + " Element:"
                      : "Window Object"
              ),
              console.log(...this.targets));
        console.groupEnd();

        return this;
    };

    ///////// .addClass ////////////////////////////
    /**
     * * Adiciona nomes de classe à *`lista de nomes de classe`* do elemento.
     * * Pode definir em qual posição os nomes de classe serão adiciondaos. Se n for definido os nomes serão adicionados ao final da lista de nomes de classe.
     * -----
     * @param {string|Array<string>} classNames
     * * Uma *`string`* que represente um nome de classe ou múltiplos nomes de classe separados por vírgula. Pode receber um Array com strings que representem nomes de classe.
     * ----
     * @param {number} position
     * *`(opcional)`*
     * * Um número que represente a posição (index) em que os nomes serão adicionados na lista de classe.
     * ---
     * @example
     * <div class="div"></div>
     *
     * .addClass("foo") => <div class="div foo"></div>
     * .addClass("foo, bar") => <div class="div foo bar"></div>
     * .addClass(["foo", "bar"]) => <div class="div foo bar"></div>
     * .addClass("foo", 0) => <div class="foo div"></div>
     */
    AUX.prototype.addClass = function (classNames, position = NUMB) {
        __.err("AUX.addClass")
            .to(classNames, "string, array, object")
            .isVoid(classNames)
            .isWindow(this.targets)
            .to(position, "number", false)
            .done();

        //Separar nomes de classe por vírgula se passado uma string
        classNames = __.arr(classNames, true);

        let classList;
        to((e) => {
            classList = [...e.classList];

            //Inserir na posição
            classList.splice(position, 0, ...classNames);

            //Juntar e adicionar classes ao elemento
            classList = classList.join(" ");
            e.setAttribute("class", classList);
        }, this.targets);

        classList = null;
        return this;
    };

    ///////////// .attrs /////////////////////
    /**
     * * Define os atributos do elemento.
     * * Se um elemento já possuir um atributo especificado em *`attributes`* o valor deste será sobrescrito. Se um atributo especificado em *`attributes`* receber um valor *`false`* ou *`null`* este atributo será removido do elemento alvo.
     * ----
     * @param {AttributesObject} attributes
     * * Um objeto que define os atributos e seus valores para os elemetos alvos. Deve receber propriedades cujo a chave seja referente a algum atributo HTML e valor é o valor deste atributo.
     * ----
     * @example
     * .attrs({
     *     id: 'my-id', //Define o id
     *     class: "foo bar", //Define o class
     *     checked: true, //Define o checked
     *     disabled: false, //Remove o disabled,
     *     type: null //Remove o type
     * })
     *
     */
    AUX.prototype.attrs = function (attributes) {
        __.err("AUX.attrs")
            .isWindow(this.targets)
            .to(attributes, "object")
            .isVoid(attributes)
            .done();

        to((root) => {
            Object.keys(attributes).forEach((name) => {
                //Se o valor de uma prop for false ou null remover atributo
                if (attributes[name] === null || attributes[name] === false) {
                    root.removeAttribute(name);
                } else {
                    root.setAttribute(name, attributes[name]);
                }
            });
        }, this.targets);
        return this;
    };

    /////// .appendHTML //////////////////////////
    /**
     * * Insere uma string que representa elementos HTML como sendo nós do tipo HTMLElement.
     * * A string não sobrescreve o contéudo HTML do elemento alvo, mas a converte em um nó do tipo HTMLElement e a insere ao final da lista de elementos filhos (ou em uma posição especificada em *`options.position`*.
     * * Opcionalmente executa uma função *`callback`* para cada HTMLContent.
     * ----
     * @param {string} HTMLString
     * * Uma String que representa um ou mais elementos HTML. Representação de comentários também é suportado.
     * ----
     * @param {HandlerFunction|{amount:number, position: PositionReference, handler: HandlerFunction}} options
     * * *(`Opcional`)*
     * * Pode receber uma função callback para cada HTMLContent ou pode receber um Objeto que recebe as seguintes propriedades:
     *
     * > * **`handler:`** A função callback. Recebe um parâmetro que deve ser desestruturado.
     *
     * > * **`amount:`** Um número que define a quantidade de elementos que serão gerados a partir da string.
     *
     * > * **`position:`** Uma referência que indique a posição em que o elemento gerado será inserido na lista de elementos filhos. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento filho ou o próprio elemento como referência, indica que o novo elemento será inserido antes dele.
     * ---
     * @example
     * .appendHTML("<button>OK</button>")
     * .appendHTML("<button>OK</button>", function(get, i){...})
     * .appendHTML("<button>OK</button>", {amount: 2, position: 0})
     * .appendHTML("<button>OK</button>", {
     *      position: 0,
     *      handler(get, i){...}
     * })
     */
    AUX.prototype.appendHTML = function (HTMLString, options = {}) {
        var err = __.err("AUX.appendHTML");
        err.to(HTMLString, "string")
            .isWindow(this.targets)
            .to(options, "function, object", false)
            .expectObj(
                options,
                {
                    amount: "number",
                    position: t.IDXREF,
                    handler: "function, null",
                },
                2
            )
            .done();

        options = {
            handler: __.type(options) == "function" ? options : options.handler,
            amount: options.amount ?? 1,
            position: options.position ?? null,
        };

        let x = {};
        let cb;
        to((root) => {
            x.childList = [...root.children];

            for (let i = 0; i < options.amount; i++) {
                x.htmlText = __.strHTML(HTMLString);
                options.fragment =
                    x.htmlText.children.length === 1
                        ? x.htmlText.children[0]
                        : x.htmlText;

                //Callback function
                if (options.handler) {
                    cb = new ItemGetters({
                        i: i,
                        item: options.fragment,
                        itemList: [...x.htmlText.children],
                        target: root,
                        targetList: this.targets,
                    });
                    options.handler(cb, i);
                }

                //Obter o elemento filho referência para o insertBefore
                x.nodeRef = __.indexRef(options.position, x.childList);
                root.insertBefore(x.htmlText, x.nodeRef);
            }
        }, this.targets);

        (err = null), (x = null), (cb = null);
        return this;
    };

    ////////////////// .appendChilds ////////////////////////
    /**
     * * Insere novos elementos filhos ao final da lista de nós filhos (ou em uma posição especificada em *`options.position`*) do elemento.
     * * Nota: Se os elementos inseridos forem filhos de outros nós, estes então serão removidos des seus nós pai para serem inseridos no novo pai, já que o mesmo elemento não pode estar em dois lugares distintos na árvore DOM. Para obter resultado semelhante usar *`AUX.appendClones( )`*.
     * * Opcionalmente pode executar uma função *`callback`* para cada elemento filho obtido antes dos mesmos serem inseridos, esperando a execução da função *`done( )`* (obtida no segundo parâmetro desta função) para finalizar a operação.
     * ------
     * @param {ElementReference} selectors
     * * Deve receber os elementos que serão inseridos como filho, podendo obté-los através de uma string que represente um seletor CSS válido (ou múltiplos seletores separados por vírgula), um array de contento seletores ou os elementos, um nodeList ou HTMLCollection ou um HTMLElement.
     *-------
     * @param {{handler: HandlerFunction, position: PositionReference} | HandlerFunction} options
     *
     * *`(opcional)`*
     * * Pode receber uma função de retorno de chamada ou pode receber um Objeto que recebe as seguintes propriedades opcionais:
     *
     * > * **`handler:`** A função callback descrita anteriormente.
     *
     * > * **`position:`** Uma referência que indique a posição em que o elemento obtido será inserido na lista de nós filhos. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento da lista de nós filhos ou o próprio elemento como referência.
     *------
     * @example
     * .appendChilds("#div")
     * .appendChilds("#div", {position: 0})
     * .appendChilds("#div", {position: 0, handler(get, i){...}})
     * .appendChilds("#div", function(get, i){...})
     */
    AUX.prototype.appendChilds = function (selectors, options = {}) {
        let err = __.err("AUX.appendChilds");
        err.to(selectors, t.ELREF)
            .isWindow(this.targets)
            .isVoid(selectors)
            .to(options, "function, object", false)
            .expectObj(
                options,
                {
                    position: t.IDXREF,
                    handler: "function, null",
                },
                2
            )
            .done();

        selectors = __.ex(selectors, err);
        let x = {};

        x.root = this.targets[0];
        x.childList = [...x.root.children];

        options = {
            position: options.position ?? null,
            handler: __.type(options) == "function" ? options : options.handler,
        };

        if (options.handler) {
            var cb;
        }

        // Para cada filho a ser inserido...
        selectors.forEach((child, i) => {
            //Callback function
            if (options.handler) {
                cb = new ItemGetters({
                    i: i,
                    item: child,
                    itemList: selectors,
                    target: x.root,
                    targetList: this.targets,
                });
                options.handler(cb, i);
            }
            //Obter o elemento filho referência para o insertBefore
            x.nodeRef = __.indexRef(options.position, x.childList);
            this.targets[0].insertBefore(child, x.nodeRef);
        });

        (err = null), (x = null), (cb = null);
        return this;
    };

    ///////// .removeChilds //////////
    /**
     * * Remove um ou mais elementos filhos do elemento *`alvo`*. Opcionalmente pode executar uma função *`callback`* para cada filho removido.
     * ----
     * @param {ChildReference} childs
     * * Uma referência de quais filhos da lista de nós filhos remover. Podendo ser:
     * >* A posição (índice) do filho para ser removido ou um array contendo as posições para múltiplas remoções.
     * >* Um seletor CSS que aponte para um nó filho (ou múltiplos seletores separardos por vírgula) para ser removido ou um array contendo os seletores.
     * >* O elemento ou array de elementos.
     * ----
     * @param {HandlerFunction} handler
     * *`(opcional)`*
     * * Executa uma função para cada elemento removido.
     * ----
     * @example
     * .removeChilds(".div") => Remove filhos pelo seletor CSS.
     * .removeChilds(1) => Remove filho pelo índice.
     * .removeChilds([1,2,6]) => Remove múltiplos filhos pelos índices.
     * .removeChilds(".div", function(get, i){...}) => Executa uma função para o filho removido.
     */
    AUX.prototype.removeChilds = function (childs, handler = Function) {
        __.err("AUX.removeChilds")
            .isWindow(this.targets)
            .to(childs, "number, string, array, HTMLElement")
            .to(handler, "function", false)
            .done();
        let e = {
            list: null,
            removed: null,
        };
        to((root) => {
            e.list = __.getElementsOfList(childs, [...root.children]);

            for (let i = 0; i < e.list.length; i++) {
                //Remove e armazena o nó removido
                e.removed = root.removeChild(e.list[i]);

                if (handler !== Function) {
                    handler(
                        new ItemGetters({
                            item: e.removed,
                            i: i,
                            itemList: e.list,
                            target: root,
                            targetList: this.targets,
                        }),
                        i
                    );
                }
            }
        }, this.targets);

        e = null;
        return this;
    };

    ///////// .replaceChilds ////////////
    /**
     * * Substitui um ou mais filhos do elemento pai `(o primeiro da lista de manipulação, se houver mais de um)` pelos novos elementos filhos passados em *`newChilds`*.
     * * Se mais de um filhos forem passados em *`oldChilds`* e a mesma quantidade for passada em *`newChilds`* o filho antigo será removido e em seu lugar será inserido o novo filho correspondente da lista de novos filhos. Os novos filhos que não corresponderem com algum filho antigo será apenas inserido ao final da lista de nós filhos. Mas se faltar, o filho antigo não terá com quem ser substituído e será ignorado da operação.
     * * Opcionalmente pode executar uma função *`callback`* para cada filho que foi substituído com êxito.
     * ----
     * @param {ChildReference} oldChilds
     * * Uma referência de quais filhos existentes na lista de nós filhos serão substituídos. Podendo ser:
     * >* A posição (índice) do filho ou um array contendo as posições para múltiplas substituições.
     * >* Um seletor CSS que aponte para um nó filho (ou múltiplos seletores separardos por vírgula) ou um array contendo os seletores.
     * >* O próprio elemento como referência ou um array de elementos.
     * -------
     * @param {ElementSelector} newChilds
     * * Deve receber os elementos que serão inseridos como novos filhos, podendo obté-los através de uma string que represente um seletor CSS válido (ou múltiplos seletores separados por vírgula), um array de contento seletores ou elementos, um nodeList ou HTMLCollection ou o próprio elemento como referência.
     * ----
     * @param {HandlerFunction} handler
     * *`(opcional)`*
     * * Executa uma função para cada filho que foi substituído (removido) com êxito.
     *
     * @example
     * .replaceChilds(1, "#foo")
     *
     * .replaceChilds([0,2], "#foo, #bar")
     *
     * .replaceChilds(".old-childs", ".new-childs")
     *
     * .replaceChilds(1, "#foo", function(get, i){...})
     */
    AUX.prototype.replaceChilds = function (
        oldChilds,
        newChilds,
        handler = Function
    ) {
        let err = __.err("AUX.replaceChilds");
        err.to(oldChilds, t.ELREF + ", number")
            .isVoid(oldChilds)
            .isWindow(this.targets)
            .to(newChilds, t.ELREF)
            .isVoid(newChilds, 2)
            .to(handler, "function", false)
            .done();

        let x = {};
        x.root = this.targets[0];

        oldChilds = __.getElementsOfList(oldChilds, [...x.root.children]);
        newChilds = __.ex(newChilds, err, 2);

        for (let i = 0; i < newChilds.length; i++) {
            x.old = oldChilds[i] || null;
            x.new = newChilds[i] || null;

            if (x.old) {
                //Exeutar função callback
                if (handler !== Function) {
                    handler(
                        new ItemGetters({
                            i: i,
                            item: x.old,
                            itemList: oldChilds,
                            target: x.root,
                            targetList: this.targets,
                            substitute: x.new,
                        }),
                        i
                    );
                }
                x.root.replaceChild(x.new, x.old);
            }
        }
        (err = null), (x = null);
        return this;
    };

    ////////// .exchangeChilds //////////
    /**
     * * Troca os elementos filhos por outros elementos passados. Os elementos filhos que foram substituídos tomam os lugares deixados pelos substitutos, fazendo uma troca equivalente sem deixar espaços vazios.
     * > * **Nota:** O elemento substituto obrigatoriamente precisa ter um pai para a troca ser possível. Caso um elemento sem pai seha passado este será ignorado e nada acontecerá.
     * > * **Nota:** A quantidade de elementos a serem trocados precisam ser iguais, caso sobre elementos para a troca este será ignorado. Se, por exemplo, três elementos filhos foram selecionados para serem trocados, logo três elementos substitutos devem se passodos.
     * ------
     * @param {ChildReference} childs
     * * Uma referência ao elementos filhos que serão trocados. Podendo ser:
     * >* A posição (índice) do filho ou um array contendo as posições para múltiplas trocas.
     * >* Um seletor CSS que aponte para um nó filho (ou múltiplos seletores separardos por vírgula) ou um array contendo os seletores.
     * >* O próprio elemento como referência ou um array de elementos.
     * @param {ElementSelector} substitutes
     * * Uma referência aos elementos substitutos.
     * ----
     * @example
     * .exchangeChilds(2, ".other")
     * .exchangeChilds([0, 2], ".other1, .other2")
     * .exchangeChilds(".child2", ".other")
     */
    AUX.prototype.exchangeChilds = function (childs, substitutes) {
        let err = __.err("AUX.exchangeChilds");
        err.to(childs, t.ELREF + ", number")
            .isWindow(this.targets)
            .to(substitutes, t.ELREF)
            .done();
        let x = {};
        x.root = this.targets[0];

        childs = __.getElementsOfList(childs, [...x.root.children]);
        substitutes = __.ex(substitutes, err, 2);

        for (let i = 0; i < substitutes.length; i++) {
            x.child = childs[i] || null;
            x.subs = substitutes[i] || null;
            x.subsParent = x.subs.parentElement;

            if (x.child && x.subsParent) {
                x.mask = {
                    child: document.createComment("aux-mask"),
                    subs: document.createComment("aux-mask"),
                };

                //Substituir elementos apontados por comentário para marcar posição.
                x.root.replaceChild(x.mask.child, x.child);
                x.subsParent.replaceChild(x.mask.subs, x.subs);

                // Substituir comentário por elemento
                x.root.replaceChild(x.subs, x.mask.child);
                x.subsParent.replaceChild(x.child, x.mask.subs);
            }
        }

        (err = null), (x = null);
        return this;
    };

    ///++++ NÃO TERMINADO!! +++++///
    /////////// .appendClones //////////////////////
    /**
     * * Clona um elemento HTML e o insere como filho ao final da lista de nós filhos ou em uma posição especificada em `< options.position >`.
     *
     * @param {ElementReference} selectors Um elemento HTML ou Seletor CSS válido que aponte para um elemento existente no DOM para ser clonado.
     * @param {{}} options
     */
    AUX.prototype.appendClones = function (selectors, options = {}) {
        let err = __.err("AUX.appendClones");
        err.to(selectors, t.ELREF)
            .isVoid(selectors)
            .to(options, "function, object", false)
            .expectObj(options, {
                amount: "number",
                position: t.IDXREF,
                handler: "function, null",
            })
            .done();

        x.isDone = false;

        to((root) => {
            x.childList = [...root.children];
            for (let i = 0; i < options.amount; i++) {
                x.clone = element.cloneNode(true);

                //Erro de propriedades inesperada
                // err.expectObj(options, {
                //     amount: "number",
                //     position: t.IDXREF,
                //     handler: "function, null",
                //     root: t.IDXREF,
                // });
                //Função done()
                x.done = () => {
                    //Obter o elemento filho referência para o insertBefore
                    x.nodeRef = __.indexRef(options.position, x.childList);
                    x.isDone = true; //Avisar que esta função foi executada
                    root.insertBefore(x.clone, x.nodeRef);
                };

                //Callback function
                if (options.handler) {
                    options.handler(2, x.done);
                } else {
                    x.done();
                }
            }
        }, this.elements);

        clear(x);
        return this;
    };

    /////// .createChilds /////////////////
    /**
     * * Cria um ou mais elementos filhos para o elemento pai e executa uma função *`callback`* para cada resultado onde se pode adicionar propriedades e conteúdos aos elementos criados.
     * * Só é possível criar um tipo de elemento especificado pelo *`tagName`*, sendo possível apenas gerar múltiplas cópias desta mesma tag especificando a quantidade em *`options.amount`*.
     * ----
     * @param {keyof HTMLElementTagNameMap} tagName
     * * Uma nome de tag.
     * -----
     * @param {HandlerFunction} handler
     * * Uma função para cada filho criado. Recebe um parâmetro que deve ser desestrututado para melhor obtenção das propriedades de manipulação.
     * ----
     * @param {{amount:number, options:PositionReference}} options
     * *`(opcional)`*
     * * Um objeto que deve receber as seguintes opções de propriedades:
     *
     * > * **`amount:`** Um número que define a quantidade de filhos que serão criados a partir do nome de tag fornecido. Se omitido o valor padrão é 1.
     *
     * > * **`position:`** Uma referência que indique a posição em que o filho criado será inserido na lista de elementos filhos. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento filho ou o próprio elemento como referência. Se omitido os filhos serão inseridos ao final da lista de nós filhos.
     * -----
     * @example
     * // Cria um filho input e o insere o final da lista de nós filhos.
     * .createChilds("input", function(get, i){...})
     *
     * // Cria 3 filhos input e os insere na posição 0 (início) da lista de nós filhos.
     * .createChilds("input", function(get, i){
     *      //...
     * }, {amount: 3, position: 0})
     *
     */
    AUX.prototype.createChilds = function (tagName, handler, options = {}) {
        __.err("AUX.createChilds")
            .isWindow(this.targets)
            .to(tagName, "string")
            .to(handler, "function")
            .to(options, "object", false)
            .expectObj(options, { amount: "number", position: t.IDXREF }, 3)
            .done();

        options = {
            amount: options.amount ?? 1,
            position: options.position ?? null,
        };

        let x = {};

        to((root) => {
            x.childList = [...root.children];
            for (let i = 0; i < options.amount; i++) {
                x.created = document.createElement(tagName);
                //Obter o elemento filho referência para o insertBefore
                x.nodeRef = __.indexRef(options.position, x.childList);
                handler(
                    new ItemGetters({
                        item: x.created,
                        i: i,
                        itemList: [x.created],
                        target: root,
                        targetList: this.targets,
                    }),
                    i
                );
                root.insertBefore(x.created, x.nodeRef);
            }
        }, this.targets);

        x = null;
        return this;
    };

    ////////// .toggleChilds /////////////
    AUX.prototype.toggleChilds = function (childElements, elements) {
        let err = __.err("AUX.toggleChilds");
        err.to(childElements, "HTMLElement, array, nodeList, HTMLCollection")
            .to(elements, "HTMLElement, array, nodeList, HTMLCollection")
            .done();

        let x = {
            root: this.targets[0],
        };
        childElements = __.ex(childElements, err);

        elements = __.ex(elements, err, 2);

        to((child, i) => {
            if (elements[i]) {
                if (x.root.contains(elements[i])) {
                    x.root.replaceChild(child, elements[i]);
                } else if (x.root.contains(child)) {
                    x.root.replaceChild(elements[i], child);
                }
            }
        }, childElements);
    };

    //////////////// .for ////////////////////
    /**
     * * Percorre os elementos da lista manipulação e executa uma função de retorno de chamada para cada resultado.
     * -----
     * @param {HandlerFunction} handler
     * * Uma `callback function`.
     * -----
     * @example
     *
     * .for(function(get, i){...})
     */
    AUX.prototype.for = function (handler) {
        __.err("AUX.for").to(handler, "function").done();

        for (let i = 0; i < this.targets.length; i++) {
            handler(
                new ItemGetters({
                    i: i,
                    item: this.targets[i],
                    itemList: this.targets,
                }),
                i
            );
        }

        return this;
    };

    //////// .toggleClass //////////////
    /**
     * * Alterna entre os nomes de classe passados em *`namesA` e *`namesB`** a cada execução do método.
     * * Se nenhum argumento for passado em *`namesB`* ou seu valor for *`null`* alterna entre adicionar e remover os nomes de classe passados em *`namesA`* a cada execução.
     * -----
     * @param {string|Array<string>} namesA
     * * Uma *`string`* que representa um nome de classe ou múltiplos nomes de classe separados por vírgula. Ou um *`array`* contento os nomes de classe.
     * ----
     * @param {string|Array<string>|null} namesB
     * *`(opcional)`*
     * * Uma *`string`* que representa um nome de classe ou múltiplos nomes de classe separados por vírgula. Ou um *`array`* contento os nomes de classe ou *`null`*.
     * ----
     * @example
     * .toggleClass("show")
     * .toggleClass("show", "hidden")
     * .toggleClass(["show", "foo"], "hidden")
     */
    AUX.prototype.toggleClass = function (namesA, namesB = null) {
        __.err("AUX.toggleClass")
            .isWindow(this.targets)
            .to(namesA, t.CLASSLIST)
            .isVoid(namesA)
            .to(namesB, "string, array, object, null", false)
            .isVoid(namesB, 2)
            .done();

        namesA = __.arr(namesA, true);
        namesB = namesB === null ? null : __.arr(namesB, true);
        let has;
        to((root) => {
            //Função temporária
            //Verifica se o nome de classe ou um dos nomes de classe passados já existem no elemento alvo e retorna true.
            has = (names) => {
                for (let name of names) {
                    if (root.classList.contains(name)) {
                        return true;
                    }
                }
                return false;
            };

            if (namesB === null) {
                if (has(namesA)) {
                    root.classList.remove(...namesA);
                } else {
                    root.classList.add(...namesA);
                }
            } else {
                if (has(namesA) && !has(namesB)) {
                    root.classList.remove(...namesA);
                    root.classList.add(...namesB);
                } else if (has(namesB) && !has(namesA)) {
                    root.classList.remove(...namesB);
                    root.classList.add(...namesA);
                } else if (
                    (has(namesA) && has(namesA)) ||
                    (!has(namesA) && !has(namesA))
                ) {
                    root.classList.remove(...namesA);
                    root.classList.add(...namesB);
                }
            }
        }, this.targets);

        has = null;
        return this;
    };

    /////////// .replaceClass ///////////////////
    /**
     * * Remove os nomes de classe passados em *`oldNames`* (nomes de classe existentes do elemento alvo) e adiciona os nomes de classe passados em *`newNames`*.
     *----
     * @param {string|Array<string>} oldNames
     * * Um ou mais nomes de classe já existentes. Uma *`string`* que representa um nome de classe ou múltiplos nomes de classe separados por vírgula. Ou um *`array`* contento os nomes de classe.
     * -----
     * @param {string|Array<string>} newNames
     * * Um ou mais nomes de classe para serem adicionados. Uma *`string`* que representa um nome de classe ou múltiplos nomes de classe separados por vírgula. Ou um *`array`* contento os nomes de classe.
     * ----
     * @example
     * .replaceClass("foo", "bar")
     * .replaceClass("foo, test", "bar, wow")
     * .replaceClass(["foo", "test"], ["bar", "wow"])
     */
    AUX.prototype.replaceClass = function (oldNames, newNames) {
        __.err("AUX.replaceClass")
            .isWindow(this.targets)
            .to(oldNames, t.CLASSLIST)
            .isVoid(oldNames)
            .to(newNames, t.CLASSLIST)
            .isVoid(newNames, 2)
            .done();

        oldNames = __.arr(oldNames, true);
        newNames = __.arr(newNames, true);

        to((root) => {
            root.classList.remove(...oldNames);
            root.classList.add(...newNames);
        }, this.targets);

        return this;
    };

    ///////////// .removeClass /////////////
    /**
     * * Remove um ou mais nomes de classe.
     * -----
     * @param {string|Array<string>} names
     * * Uma *`string`* que representa um nome de classe ou múltiplos nomes de classe separados por vírgula. Ou um *`array`* contento os nomes de classe.
     * -----
     *
     * @example
     * .removeClass("foo")
     * .removeClass("foo, bar")
     * .removeClass(["foo", "bar"])
     */
    AUX.prototype.removeClass = function (names) {
        __.err("AUX.removeClass")
            .isWindow(this.targets)
            .to(names, t.CLASSLIST)
            .isVoid(names)
            .done();

        to((root) => {
            root.classList.remove(...__.arr(names, true));
        }, this.targets);

        return this;
    };

    ////////// .childs /////////////////
    /**
     * * Percorre os elementos que são diretamente filhos do elemento pai e executa uma função de retorno de chamada para cada resultado.
     * -----
     * @param {HandlerFunction} handler
     * * Uma função callback para cada elemento filho iterado.
     * * Recebe um parâmetro que deve ser desestruturado para obter de forma mais limpa as propriedades de manipulação desejadas.
     * -----
     * @example
     * .childs(function(get, i){...})
     */
    AUX.prototype.childs = function (handler) {
        __.err("AUX.childs")
            .isWindow(this.targets)
            .to(handler, "function")
            .done();

        to((root) => {
            for (let i = 0; i < root.children.length; i++) {
                handler(
                    new ItemGetters({
                        i: i,
                        item: root.children[i],
                        itemList: [...root.children],
                        target: root,
                        targetList: this.targets,
                    }),
                    i
                );
            }
        }, this.targets);

        return this;
    };

    ////////////////// .search //////////////
    /**
     * * Busca por elementos filhos da árvore de nós filhos em qualquer profundidade ( a partir do nó pai ) e executa uma função *`callback`* para cada resultado.
     * * Se nenhum elemento filho for encontrado o resultado obtido é *`null`*.
     * ------
     * @param {string|Array<string>} childSelector
     * * Um seletor CSS válido que aponte para algum elemento filho na árvore de descendentes ou múltiplos seletores separados por vírgula. Um *`Array`* ou *`Object`* contendo seletores.
     * -----
     * @param {HandlerFunction} handler
     * * Executa uma função para cada elemento filho obtido.
     * -----
     * @example
     * //Buscar por todos os elementos div class="box" existentes dentro do nó pai.
     * .search("div.box", function(get, i){...})
     */
    AUX.prototype.search = function (childSelector, handler) {
        __.err("AUX.search")
            .isWindow(this.targets)
            .to(childSelector, "string, array, object")
            .to(handler, "function")
            .done();
        let res;
        to((root) => {
            res = [...root.querySelectorAll(childSelector)];
            res.length <= 0 ? (res = [null]) : null;
            for (let i = 0; i < res.length; i++) {
                handler(
                    new ItemGetters({
                        i: i,
                        item: res[i],
                        itemList: res,
                        target: root,
                        targetList: this.targets,
                    })
                );
            }
        }, this.targets);

        res = null;
        return this;
    };

    ////////////////// .toggleDisplay ////////////
    /**
     * * A cada execução alterna entre ocultar e mostrar os elementos definindo o valor da propriedade de estilo *`display`* como *`"none"`* e *`"block"`* ou outro valor especificado no parâmetro opcional *`valueA`*. O estilo é aplicado inline.
     * * Se nenhum argumento for passado nos dois parâmetros a alternância padrão será entre *`"none"`* e *`block`*. Podendo substituir o valor padrão *`block`* por outro valor desejado.
     * * Se um valor for passado no segundo parâmetro a alternância ocorrerá entre os dois valores passados nos dois parâmetros.
     * ----
     * @param {CSSDisplayValue} valueA
     * *`(opcional)`*
     * * Uma string que represente um valor válido da propriedade *`display`*. Este valor substitui o valor padrão *`block`*.
     * ------
     * @param {CSSDisplayValue} valueB
     * *`(opcional)`*
     * * Uma string que represente um valor válido da propriedade *`display`*. Este valor substitui o valor padrão *`none`*.
     * -----
     * @example
     *
     * //Alterna entre display "none" e "block".
     * .toggleDisplay()
     *
     * //Alterna entre display "none" e "flex".
     * .toggleDisplay("flex")
     *
     * //Alterna entre display "flex" e "contents".
     * .toggleDisplay("flex", "contents")
     */
    AUX.prototype.toggleDisplay = function (valueA = "block", valueB = "none") {
        __.err("AUX.toggleDisplay")
            .isWindow(this.targets)
            .to(valueA, "string", false)
            .to(valueB, "string", false)
            .done();

        let display;
        to((root) => {
            display = window.getComputedStyle(root).display;
            // Se o elemento não possui uma propriedade display atribuida inline ou se possui mas não sao nenhum dos valores padrões, verificar visibilidade para alteranar valores
            if (display == "" || (display != valueA && display != valueB)) {
                if (root.checkVisibility()) {
                    root.style.display = valueB;
                } else {
                    root.style.display = valueA;
                }
            } else if (display == valueA) {
                root.style.display = valueB;
            } else if (display == valueB) {
                root.style.display = valueA;
            }
        }, this.targets);

        display = null;
        return this;
    };

    //////////// .forms //////////////////
    /**
     * * Obtém os valores dos campos de entrada (*`input`*, *`textarea`*, etc...) de um ou mais formulários e os organizam em um Objeto passado como parâmetro da função callback em *`handler`*.
     * * Os campos necessariamente precisam possuir um atributo *`name`* para serem processados.
     * * A *`callback function`* passada recebe dois parâmetros:
     * > * *`form`* - O objeto contendo os valores obtidos do formulário.
     * > * *`details`* - Um objeto contendo algumas informações sobre os elementos manipulados.
     * * Nota: Inputs *`type="checkbox"`* recebem um valor boleano que indica se a caixa foi marcada ou não. Inputs *`type="radio"`* recebem o valor *`null`* se a caixa não for marcada ou se foi marcada mas não possui um *`value`*.
     * -----
     * @param {FormHandlerFunction} handler
     * * Executa uma função para os objetos de valores obtido dos formulários.
     * ------
     * @example
     * .forms(function(form, details){...})
     */
    AUX.prototype.forms = function (handler) {
        __.err("AUX.forms")
            .isWindow(this.targets)
            .to(handler, "function")
            .done();
        let x = {};
        to((root) => {
            x.inputList = root.querySelectorAll("*[name]");
            x.form = {};
            x.formList = [];
            for (let i = 0; i < x.inputList.length; i++) {
                x.input = x.inputList[i];
                x.name = x.input.name || null;
                x.value = x.input.value;
                x.value === "" ? (x.value = null) : null;

                //Verificação para casos de radio ou checkbox
                switch (x.input.type) {
                    case "checkbox":
                        x.value = x.inputList[i].checked;
                        break;
                    case "radio":
                        if (x.input.checked) {
                            x.value = x.input.value;
                        } else {
                            x.value = null;
                        }

                        break;
                }

                //Add se a prop n existir ou se o valor for nulo e se houver o atributo name com valor válido.
                if (!x.form[x.name] && x.name) {
                    x.form[x.name] = x.value;
                }

                x.name ? x.formList.push(x.input) : null;
            }

            //Chamar handler se x.form não estiver vazio.
            if (Object.keys(x.form).length > 0) {
                Object.freeze(x.form);
                x.details = Object.freeze({
                    form: root,
                    formList: x.formList,
                });
                handler(x.form, x.details);
            }
        }, this.targets);

        x = null;
        return this;
    };

    ////////////// .cloneTo ///////////////
    /**
     * * Cria um ou mais clones e os insereem como filhos de outros nós passados em *`targets`*.
     * * Opcionalmente pode executar uma função *`callback`* para cada clone gerado.
     * ----
     * @param {ElementReference} targets
     * * Os elementos que receberão os clones gerados.
     * > * Um HTMLElement ou *`array`* de elementos, um nodeList ou HTMLCollection.
     * > * Um seletor CSS válido que aponte para os elementos existente no DOM ou múltiplos seletores separados por vírgula, bem como um *`array`* de seletores.
     * ------
     * @param {{amount: number, position: PositionReference, handler: HandlerFunction} | HandlerFunction} options
     * *`(opcional)`*
     * * Executa função *`callback`* ou recebe objeto com as seguintes propriedades opcionais:
     * -----
     * > * **`handler:`** Uma função de retorno de chamada.
     *
     * > * **`amount:`** Um número que define a quantidade de clones que serão gerados.
     *
     * > * **`position:`** Uma referência que indique a posição em que os clones gerados serão inseridos na lista de elementos filhos dos alvos. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento filho ou o próprio elemento como referência de posição.
     * ---
     * @example
     * // Clona o elemento e o insere na lista de filhos dos elementos que possuem a classe "container"
     * .cloneTo(".container")
     *
     * // Gera 3 clones do elemento e os inserem na posição 0 da lista de filhos de ".container"
     * .cloneTo(".container", {amount: 3, position: 0})
     *
     * // Pode executar um método para cada clone gerado
     * .cloneTo(".container", {amount: 3, handler(get, i){...}})
     *
     * // Apenas executa uma função para cada clone gerado.
     * .cloneTo(".container", function(get, i){...})
     *
     */
    AUX.prototype.cloneTo = function (targets, options = {}) {
        let err = __.err(".cloneTo");
        err.to(targets, t.ELREF)
            .isWindow(this.targets)
            .to(options, "function, object", false)
            .expectObj(
                options,
                {
                    amount: "number",
                    position: t.IDXREF,
                    handler: "function",
                },
                2
            )
            .done();

        options = {
            position: options.position ?? null,
            handler: __.type(options) == "function" ? options : options.handler,
            amount: options.amount ?? 1,
        };
        let x = { clones: [] };

        targets = __.ex(targets, err);

        //Inserir clones
        to((target) => {
            x.clones = [];
            //Gerar clones do alvo
            to((root) => {
                x.clones.push(
                    ...__.mapLoop(options.amount, () => {
                        return root.cloneNode(true);
                    })
                );
            }, this.targets);

            x.childList = [...target.children];
            x.nodeRef = __.indexRef(options.position, x.childList);
            // Para cada destino
            for (let i = 0; i < x.clones.length; i++) {
                x.clone = x.clones[i];

                target.insertBefore(x.clone, x.nodeRef);

                if (options.handler) {
                    options.handler(
                        new ItemGetters({
                            i: i,
                            item: x.clone,
                            itemList: x.clones,
                            target: target,
                            targetList: targets,
                        }),
                        i
                    );
                }
            }
        }, targets);

        (err = null), (x = null);
        return this;
    };

    //////////////// .insertTo ///////////
    /**
     * * Remove o elemento de seu pai atual e o insere como filho de um novo nó pai  passado em *`target`*.
     * * Nota: Se passado mais de um elemento em *`target`* apenas o primeiro elemento da lista receberá os elementos, os demais serão ignorados da operação.
     * * Opcionalmente pode executar uma função *`callback`* para cada elemento.
     * ------
     * @param {string|HTMLElement} target
     * * Um elemento pai para receber os novos elementos. Passe um HTMLElement ou um seletor CSS válido que aponte para um elemento existente no DOM.
     * -----
     * @param {{position: PositionReference, handler: HandlerFunction} | HandlerFunction} options
     * *`(opcional)`*
     * * Executa função *`callback`* ou recebe objeto com as seguintes propriedades opcionais:
     * -----
     * > * **`handler:`** Uma função de retorno de chamada.
     *
     * > * **`position:`** Uma referência que indique a posição em que os elementos serão inseridos na lista de elementos filhos do alvo. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento filho ou o próprio elemento como referência de posição.
     * ----
     * @example
     * //Remove o elemento de seu pai atual e o insere como filho de ".container"
     * .insertTo(".container")
     *
     * // Define a posição na lista de filhos em que os elementos serão inseridos
     * .insertTo(".contaainer", {position: 0})
     *
     * //Executa um método para cada elemento.
     * .insertTo(".container", {position: 0, handler(get, i}){...}})
     *
     * //Executa uma função para cada elemento.
     * .insertTo(".container", function(get, i){...})
     */
    AUX.prototype.insertTo = function (target, options = {}) {
        let err = __.err("AUX.insertTo");
        err.to(target, "string, HTMLElement")
            .isWindow(this.targets)
            .to(options, "object, function", false)
            .expectObj(options, { position: t.IDXREF, handler: "function" }, 2)
            .done();

        target = __.ex(target, err)[0];
        options = {
            position: options.position ?? null,
            handler: __.type(options) == "function" ? options : options.handler,
        };

        let x = {};

        x.childList = [...target.children];
        x.nodeRef = __.indexRef(options.position, x.childList);
        to((root, i) => {
            if (options.handler) {
                options.handler(
                    new ItemGetters({
                        i: i,
                        item: root,
                        itemList: this.targets,
                        target: target,
                        targetList: [target],
                    }),
                    i
                );
            }
            target.insertBefore(root, x.nodeRef);
        }, this.targets);

        (err = null), (x = null);
        return this;
    };

    ///////////// .replace /////////////
    /**
     * * Substitui o elemento na lista de elementos filhos de seu nó pai por um novo elemento passado.
     * * Opcionalmente executa uma função *`callback`* para o elemento que foi substituído (removido).
     * ----
     * @param {ElementSelector} substitutes
     * * Um elemento HTML a substituir o elemento *`alvo`* atual.
     * ----
     * @param {HandlerFunction} handler
     * *`(opcional)`*
     * * Uma função para o elemento substituído.
     * -----
     * @example
     * .replace(".div")
     * .replace(".div", function(get, i){...})
     */
    AUX.prototype.replace = function (substitutes, handler = Function) {
        let err = __.err("AUX.replace");
        err.to(substitutes, t.ELREF).isWindow(this.targets).done();
        substitutes = __.ex(substitutes, err);

        to((root, i) => {
            if (root.parentElement) {
                root.parentElement.replaceChild(substitutes[i], root);
                if (handler !== Function) {
                    handler(
                        new ItemGetters({
                            i: i,
                            item: root,
                            itemList: this.targets,
                            substitute: substitutes[i],
                        }),
                        i
                    );
                }
            }
        }, this.targets);

        err = null;
        return this;
    };

    //////////////// .remove ///////////////////
    /**
     * * Remove o elemento alvo de seu nó pai se houver um.
     * * Opcionalmente executa uma função *`callback`* para o elemento removido.
     * * Se desejar remover o elemento do seu pai atual para o inserir em outro pai recomenda-se *`AUX.insertTo()`* ao invés deste.
     * -----
     * @param {HandlerFunction} handler
     * * Uma função para o elemento removido.
     * ----
     * @example
     *
     * .remove()
     * .remove(function(get, i){...})
     */
    AUX.prototype.remove = function (handler = Function) {
        __.err("AUX.remove")
            .isWindow(this.targets)
            .to(handler, "function")
            .done();

        to((root, i) => {
            if (root.parentElement) {
                if (handler !== Function) {
                    handler(
                        new ItemGetters({
                            i: i,
                            item: root,
                            itemList: this.targets,
                        }),
                        i
                    );
                }

                root.remove();
            }
        }, this.targets);

        return this;
    };

    ///////////// .exchange //////////////////
    /**
     * * Troca os elementos por outros elementos passados. Os elementos que foram substituídos tomam os lugares deixados pelos substitutos, fazendo uma troca equivalente sem deixar espaços vazios.
     * > * **Nota:** O elemento substituto obrigatoriamente precisa ter um pai para a troca ser possível. Caso um elemento sem pai seja passado este será ignorado e nada acontecerá.
     * > * **Nota:** A quantidade de elementos a serem trocados precisam ser iguais, caso sobre elementos para a troca este será ignorado. Se, por exemplo, três elementos foram selecionados para serem trocados, logo três elementos substitutos devem se passodos.
     *----
     * @param {ElementSelector} substitutes
     * * O elemento ou referência ao elemento que trocará de lugar com o elemento principal.
     * ----
     * @example
     * .exchange("#foo")
     * .exchange("#foo, #bar")
     * .exchange(["#foo", "#bar"])
     * .exchange(HTMLElement)
     */
    AUX.prototype.exchange = function (substitutes) {
        let err = __.err("AUX.exchange");
        err.to(substitutes, t.ELREF).done();
        substitutes = __.ex(substitutes, err);
        let x = {};

        to((root, i) => {
            x.parent = root.parentElement;
            x.substParent = substitutes[i]
                ? substitutes[i].parentElement
                : null;

            if (x.substParent && x.parent) {
                x.mask = document.createComment(" aux-mask");
                x.substParent.replaceChild(x.mask, substitutes[i]);
                x.parent.replaceChild(substitutes[i], root);
                x.substParent.replaceChild(root, x.mask);
            }
        }, this.targets);

        (err = null), (x = null);
        return this;
    };

    ///////////// .appendSiblings //////////////////
    AUX.prototype.appendSiblings = function (newSiblings, options = {}) {};

    ///////////// .removeSiblings //////////////////
    AUX.prototype.removeSiblings = function (siblings, handler = Function) {};

    ///////////// .replaceSiblings ////////////////
    AUX.prototype.replaceSiblings = function (
        oldSiblings,
        newSiblings,
        handler = Function
    ) {};

    /////////// .toggleSiblings ////////////////
    AUX.prototype.toggleSiblings = function (siblings, element) {};

    //////////////// .on ////////////////////
    /**
     * * Adiciona um ouvinte de evento ao elemento especificando seu tipo em *`type`* e executa uma função *`callback`* quando o evento for disparado.
     * > * **Nota:** Ouvintes de eventos adicionados através deste método precisam ser adicionados em uma *`pilha de espera de remoção`* para que sejam removidos posteriormente por *`AUX.removeEvent()`* caso contrário o ouvinte não poderá ser removido. Para isso defina *`true`* em *`options.removeStack`* para adicioná-los à pilha de espera. Ouvintes que foram declarados com *`options.times`* também não são adicionados à pilha pois sua remoção já está automaticamente programada.
     * -----
     * @param {EventType} type
     * * Uma string que representa o tipo do evento esperado.
     * -----
     * @param {EventHandlerFunction} handler
     * * Uma função que é executada quando o evento for disparado.
     * ----
     * @param {boolean | EventOptions | {times: number, removeStack: boolean}} options
     * *`(opcional)`*
     * * Um objeto que especifica características sobre os ouvintes de eventos. Se passado, todos os ouvintes declarados receberão esta mesma configuração. Deve receber as seguintes propriedades opcionais:
     *
     * > * **`removeStack:`** (propriedade única da biblioteca) Um boolean que indica se este ouvinte será removido futuramente. Se sim, o ouvinte é adicionado em uma *`pilha de espera de remoção`* e pode ser removido com o método *`AUX.removeEvent()`*. Se a função *`callback`* passada for anônima, mesmo com *`options.removeStack: true`* o ouvinte não poderá ser adicionado à pilha pois precisa possuir uma referência ou no mínimo um nome para a remoção posterior.
     *
     * > * **`times:`** (propriedade única da biblioteca) Um número que indica quantas vezes os ouvintes devem ser invocados após serem adicionados. Após a quantidade máxima de invocação determinada for atingida os ouvintes serão automaticamente removidos. Nota: Estes ouvintes não poderão ser adicionados à *`pilha de espera de remoção`* mesmo com *`options.removeStack`* definido.
     *
     * > * **`capture:`** Um valor booleano que indica que eventos deste tipo serão despachados para o registrado listener antes de serem despachados para qualquer um *`EventTarget`* abaixo dele na árvore DOM. Se não for especificado, o padrão é false.
     *
     * > * **`once:`** Um valor booleano que indica que os ouvintes devem ser invocados no máximo uma vez após ser adicionado. Se true, os ouvintes serão removidos automaticamente quando invocados. Se não for especificado, o padrão é false.
     *
     * > * **`passive:`** Um valor booleano que, se true, indica que a função/método especificada para o ouvinte nunca chamará *`preventDefault()`*. Se um ouvinte passivo chamar *`preventDefault()`*, o agente do usuário não fará nada além de gerar um aviso no console.
     *
     * > * **`signal:`** Um *`AbortSignal`*. O souvintes serão removidos quando o método *`AbortSignal`* do objeto fornecido *`abort()`* for chamado. Se não for especificado, *`AbortSignal`* será associado ao ouvinte.
     * ------
     * * Nota: Consultar documentação de *`.addEventListener`* parâmetro *`options`* para entender melhor o uso.
     * ---
     * @example
     * .on("click", function (get, event, i){...})
     * .on("click", function (get, event, i){...}, {times: 3}) // Dispara o evento somente 3 vezes.
     *
     * const myHandler = function(get, event, i){...}
     * .on("click", myHanlder, {removeStack: true}) // Adiciona o ouvinta em uma pilha de espera de remoção.
     */
    AUX.prototype.on = function (type, handler, options = {}) {
        __.err("AUX.on")
            .to(type, "string")
            .to(handler, "function")
            .to(options, "boolean, object", false)
            .done();

        type = type.toLowerCase();
        if (options.times !== undefined) {
            var timeStack = [];
        }

        let thisEls = this.targets;
        let fn;

        to((root, idx) => {
            fn = function (evt) {
                if (options.times !== undefined && timeStack !== null) {
                    for (let i = 0; i < timeStack.length; i++) {
                        if (timeStack[i].target === this) {
                            timeStack[i].count++;
                            if (timeStack[i].count >= options.times) {
                                // Remover ouvinte ao encerrar options.times
                                this.removeEventListener(type, timeStack[i].fn);

                                // Deletar referencia do contador
                                timeStack.splice(
                                    timeStack.indexOf(timeStack[i]),
                                    1
                                );
                                timeStack.length <= 0
                                    ? (timeStack = null)
                                    : null;
                            }
                            break;
                        }
                    }
                }

                //// Hanlder
                handler(
                    new ItemGetters({
                        i: idx,
                        item: this,
                        itemList: thisEls,
                    }),
                    evt,
                    idx
                );
            };

            // Adicionar um contador para cada elemento
            if (options.times !== undefined) {
                timeStack.push({
                    target: root,
                    count: 0,
                    fn: fn,
                });
            }

            // Adicionar à pilha de remoção.
            addToRemoveStack({
                fn: fn,
                type: type,
                root: root,
                handler: handler,
                options: options,
            });

            root.addEventListener(type, fn, options);
        }, this.targets);

        return this;
    };

    //////////// .events ////////////////////
    /**
     * * Adiciona ao elemento múltiplos ouvintes de eventos declarando-os como métodos de um objeto passado em *`listeners`*.
     * * O evento deve ser passado como um método nomeado com o tipo do evento ou uma propriedade nomeada com o tipo do evento que recebe uma função de valor.
     * * Nota: Não é possível declarar dois eventos de mesmo tipo com o mesmo nome de método ou propriedade a menos que haja diferenciação de letras maísculas e minúsculas entre elas.
     * > * **Nota:** Ouvintes de eventos adicionados através deste método precisam ser adicionados em uma *`pilha de espera de remoção`* para que sejam removidos posteriormente por *`AUX.removeEvent()`* caso contrário o ouvinte não poderá ser removido. Para isso defina *`true`* em *`options.removeStack`* para adicioná-los à pilha de espera. Ouvintes que foram declarados com *`options.times`* também não são adicionados à pilha pois sua remoção já está automaticamente programada.
     * @example
     * .events({
     *      mouseEnter(){...},
     *      mouseenter(){...}
     * })
     * @param {EventListeners} listeners
     * * Um objeto que define os ouvintes de eventos que serão adicionados ao elemento. Cada ouvinte deve ser declarado como um método nomeado como o tipo do evento.
     * -----
     * @param {boolean | EventOptions | {times: number, removeStack: boolean}} options
     * *`(opcional)`*
     * * Um objeto que especifica características sobre os ouvintes de eventos. Se passado, todos os ouvintes declarados receberão esta mesma configuração. Deve receber as seguintes propriedades opcionais:
     *
     * > * **`removeStack:`** (propriedade única da biblioteca) Um boolean que indica se este ouvinte será removido futuramente. Se sim, o ouvinte é adicionado em uma *`pilha de espera de remoção`* e pode ser removido com o método *`AUX.removeEvent()`*. Se a função *`callback`* passada for anônima, mesmo com *`options.removeStack: true`* o ouvinte não poderá ser adicionado à pilha pois precisa possuir uma referência ou no mínimo um nome para a remoção posterior.
     *
     * > * **`times:`** (propriedade única da biblioteca) Um número que indica quantas vezes os ouvintes devem ser invocados após serem adicionados. Após a quantidade máxima de invocação determinada for atingida os ouvintes serão automaticamente removidos. Nota: Estes ouvintes não poderão ser adicionados à *`pilha de espera de remoção`* mesmo com *`options.removeStack`* definido.
     *
     * > * **`capture:`** Um valor booleano que indica que eventos deste tipo serão despachados para o registrado listener antes de serem despachados para qualquer um *`EventTarget`* abaixo dele na árvore DOM. Se não for especificado, o padrão é false.
     *
     * > * **`once:`** Um valor booleano que indica que os ouvintes devem ser invocados no máximo uma vez após ser adicionado. Se true, os ouvintes serão removidos automaticamente quando invocados. Se não for especificado, o padrão é false.
     *
     * > * **`passive:`** Um valor booleano que, se true, indica que a função/método especificada para o ouvinte nunca chamará *`preventDefault()`*. Se um ouvinte passivo chamar *`preventDefault()`*, o agente do usuário não fará nada além de gerar um aviso no console.
     *
     * > * **`signal:`** Um *`AbortSignal`*. O souvintes serão removidos quando o método *`AbortSignal`* do objeto fornecido *`abort()`* for chamado. Se não for especificado, *`AbortSignal`* será associado ao ouvinte.
     * ------
     * * Nota: Consultar documentação de *`.addEventListener`* parâmetro *`options`* para entender melhor o uso.
     * ----
     * @example
     * .events({
     *      click(get, event, i){...},
     *      mouseOver(item, evt){...}
     * })
     *
     * .events({
     *      click(get, event, i){...}
     * }, {times: 3}) // Dispara o evento somente 3 vezes
     *
     * .events({
     *      click(get, event, i){...}
     * }, {removeStack: true}) // Adiciona o ouvinte à uma pilha de espera de remoção.
     */
    AUX.prototype.events = function (listeners, options = {}) {
        __.err("AUX.events")
            .to(listeners, "object")
            .isVoid(listeners)
            .to(options, "object", false)
            .done();
        let evtKeys = Object.keys(listeners);
        // Função ouvinte real
        let fn;
        let x = {};
        let thisEls = this.targets;
        if (options.times !== undefined) {
            var timeList = {};
        }
        to((root, idx) => {
            // Adicionar referência de tempo de expiração para cada elemento.
            if (options.times !== undefined) {
                timeList[idx] = {};
            }

            for (let i = 0; i < evtKeys.length; i++) {
                x.name = evtKeys[i].toLowerCase();

                fn = function (evt) {
                    if (options.times !== undefined) {
                        timeList[idx][evtKeys[i]].count++;
                    }

                    listeners[evtKeys[i]](
                        new ItemGetters({
                            i: idx,
                            item: this,
                            itemList: thisEls,
                        }),
                        evt,
                        idx
                    );

                    if (
                        options.times !== undefined &&
                        timeList[idx][evtKeys[i]].count >= options.times
                    ) {
                        this.removeEventListener(
                            evtKeys[i].toLowerCase(),
                            timeList[idx][evtKeys[i]].fn
                        );

                        // Remover referência do método
                        delete timeList[idx][evtKeys[i]];
                        // Se não houver mais referências de métodos, deletar referência ao root
                        if (Object.keys(timeList[idx]) <= 0) {
                            delete timeList[idx];
                        }
                    }
                };

                // Adicionar referencia aos métodos e contador
                if (options.times !== undefined) {
                    timeList[idx][evtKeys[i]] = {
                        fn: fn,
                        count: 0,
                    };
                }

                // Adicionar ouvinte à pilha de remoção
                addToRemoveStack({
                    type: x.name,
                    fn: fn,
                    handler: listeners[evtKeys[i]],
                    root: root,
                    options: options,
                });

                root.addEventListener(x.name, fn, options);
            }
        }, this.targets);

        x = null;
        return this;
    };

    //////////// .removeEvent /////////////
    /**
     * * Remove um ouvinte de evento previamente registrado e adicionado à *`pilha de espera de remoção`*.
     * > **`Nota:`** Ouvintes de eventos só são removíveis com este método se foram adicionados com *`AUX.on()`* ou *`AUX.events()`*, os mesmos só são removíveis com este método se estiverem na *`pilha de remoção`* previamente definidos nos parâmetros *`options.removeStack`* dos métodos de inserção de eventos.
     * -----
     * @param {EventType} type
     * * Uma *`string`* que representa o tipo do evento a ser removido.
     * ----
     * @param {Function} listenerFunction
     * * Uma referência a um ouvinte de evento ligado ao tipo do evento fornecido. Podendo ser a função que captura o evento, ou uma *`string`* que representa o nome da função.
     * > **`Nota:`** Só é recomendável usar os nomes ao invés da própria função como referência quando a função foi declarada imediatamente no método *`AUX.on()`* (*`funciona apenas com função nomeada`*) ou como um método direto de um objeto em *`AUX.events()`*.
     * ----
     * @param {boolean | {capture: boolean}} options
     * *`(opcional)`*
     * * Um objeto de opções que especifica características sobre o ouvinte de eventos. As opções disponíveis são:
     * > **`capture:`** Um valor booleano que especifica se o ouvinte de evento a ser removido está registrado como ouvinte de captura ou não. Se este parâmetro estiver ausente, o valor padrão *`false´* será assumido.
     * -----
     * @example
     * .removeEvent("click", myClickFunc)
     * .removeEvent("mouseenter", "mouseEnter")
     */
    AUX.prototype.removeEvent = function (
        type,
        listenerFunction,
        options = {}
    ) {
        __.err("AUX.removeEvent")
            .to(type, "string")
            .to(listenerFunction, "function")
            .to(options, "object, boolean", false)
            .expectObj(options, {
                capture: "boolean",
            })
            .done();
        type = type.toLowerCase();
        var evt;

        to((root) => {
            evt = eventRemoveStack[type];
            // Obter referência do tipo do evento e elemento na pilha de remoção de eventos
            if (evt) {
                // Buscar referencia ao elemento root
                for (let ref of evt) {
                    if (ref.target === root) {
                        // Buscar lista de ouvintes
                        for (let list of ref.list) {
                            if (
                                list.handler === listenerFunction ||
                                listenerFunction === list.handler.name
                            ) {
                                // Remoção do ouvinte
                                root.removeEventListener(
                                    type,
                                    list.fn,
                                    options
                                );

                                // //Remover referencia da função do ouvinte
                                ref.list.splice(ref.list.indexOf(list), 1);

                                // Se a lista de referência estiver vazia, deletar referência do elemento.
                                if (ref.list.length <= 0) {
                                    evt.splice(evt.indexOf(ref), 1);
                                }

                                // Se a referência do tipo do evento estiver vazia, deletá-la
                                if (evt.length <= 0) {
                                    delete eventRemoveStack[type];
                                }

                                break;
                            }
                        }

                        break;
                    }
                }
            }
        }, this.targets);
        return this;
    };

    ///////////// .siblings ////////////////////
    /**
     * * Percorre os elementos irmãos e executa uma função *`callback`* para cada resultado.
     * ------
     * @param {SiblingKeys} refKey
     * * Uma chave de refência que indentifica qual ou quais irmão apontar ou um seletor CSS que aponte para um ou mais irmãos existentes na lista de elementos irmãos.
     * * As chaves aceitas são (string ou números):
     * > * *`"next"`* - Aponta para o irmão mais próximo depois dele.
     * > * *`"prev"`* - Aponta para o irmão mais próximo antes dele.
     * > * *`"all-next"`* - Aponta para todos os irmão depois dele.
     * > * *`"all-prev"`* - Aponta para todos os irmão antes dele.
     * > * *`"all"`* - Aponta para todos os irmão ao redor dele.
     * > * Um valor numérico positivo começando em 1 indicando a posição do irmão depois dele a ser obtido ou um valor numérico negativo começando em -1 indicando a posição do irmão anterior a ele a ser obtido. Considere que o elemento principal possui automaticamente a posição 0 na lista de pesquisa, pois toda pesquia começa a partir dele.
     * ------
     * @param {HandlerFunction} handler
     * * Executa uma função para cada irmão obtido.
     * ----
     * @example
     * .siblings("next", function(get, i){...})
     *
     * .siblings(2, function(get, i){...})
     *
     * .siblings(-2, function(get, i){...})
     *
     * .siblings(".foo", function(get, i){...})
     */
    AUX.prototype.siblings = function (refKey, handler) {
        __.err("AUX.siblings")
            .isWindow(this.targets)
            .to(refKey, "string, number")
            .to(handler, "function")
            .done();

        let x = {};
        to((root) => {
            x.res = [];
            x.siblingList = [...root.parentNode.children];
            x.index = x.siblingList.indexOf(root);

            if (__.type(refKey) == "string") {
                //Obter irmão por chaves string
                switch (refKey) {
                    case "next":
                        x.res.push(root.nextElementSibling);
                        break;
                    case "prev":
                        x.res.push(root.previousElementSibling);
                        break;
                    case "all-next":
                        x.res.push(...x.siblingList.slice(x.index + 1));
                        break;
                    case "all-prev":
                        x.res.push(...x.siblingList.slice(0, x.index));
                        break;
                    case "all":
                        x.res.push(...x.siblingList.filter((e) => e !== root));
                        break;
                }

                //Obter irmão por seletor CSS | Verificar se nenhum elemento foi obito por chave string.
                if (x.res.length <= 0) {
                    x.nodes = [...root.parentNode.querySelectorAll(refKey)];
                    x.res.push(...x.nodes.filter((e) => e !== root));
                }
            } else {
                //Obter irmão por chave de posição numérica
                x.getByNumber = x.siblingList[x.index + refKey];
                if (x.getByNumber) {
                    x.res.push(x.getByNumber);
                }
            }

            to((item, i) => {
                handler(
                    new ItemGetters({
                        i: i,
                        item: item || null,
                        itemList: x.res,
                        target: root,
                        targetList: this.targets,
                    }),
                    i
                );
            }, x.res);
        }, this.targets);

        x = null;
        return this;
    };

    ////////// .closest /////////////////////
    /**
     * * Percorre o elemento e seus ancestarias (em direção à raiz do documento) até encontrar um ancestral mais próximo que corresponde ao seletor CSS especificado em *`selectors`* e executa uma função *`callback`* para o resultado. Se nenhum elemento for encontrado o resultado é um *`null`*. Se o seletor passado corresponder ao próprio elemento ele será obtido como resultado.
     * * Nota: A pesquisa termina quando o primeiro resultado for encontrado, logo apenas um elemento ancestral é obtido. Para obter todos os nós acestrais a um elemento usar *`AUX.ancestors`*.
     * ------
     * @param {string} selectors
     * * Um seletor CSS válido para corresponder a algum elemento ancestral.
     * -----
     * @param {HandlerFunction} handler
     * * Executa uma função para o primeiro resultado da busca na árvore de nós ancestrais.
     * -----
     * @example
     * .closest(".parent-2", function(get, i){...})
     */
    AUX.prototype.closest = function (selectors, handler) {
        __.err("AUX.closest")
            .isWindow(this.targets)
            .to(selectors, "string")
            .to(handler, "function")
            .done();

        to((root, i) => {
            handler(
                new ItemGetters({
                    i: i,
                    item: root.closest(selectors),
                    itemList: [root.closest(selectors)],
                    target: root,
                    targetList: this.targets,
                })
            );
        }, this.targets);

        return this;
    };

    //////////// .parent ////////////////
    /**
     * * Executa uma função *`callback`* para o elemento pai do elemento atual. Se um pai não existir ou não form um DOM o resultado é um *`null`*.
     * -----
     * @param {HandlerFunction} handler
     * * Uma função de chamada de retorno caso haja um resultado.
     * -----
     * @example
     * .parent(function(get, i){...})
     */
    AUX.prototype.parent = function (handler) {
        __.err("AUX.parent")
            .isWindow(this.targets)
            .to(handler, "function")
            .done();

        to((root, i) => {
            handler(
                new ItemGetters({
                    i: i,
                    item: root.parentElement || null,
                    itemList: [root.parentElement || null],
                    target: root,
                    targetList: this.targets,
                })
            );
        }, this.targets);

        return this;
    };

    //////////// .ancestors //////////////
    /**
     * * Percorre todos os ancestrais (em direção à raiz do documento), começando pelo elemento pai, e executa uma função *`callback`* para cada ancestral obtido.
     * * Se o elemento não possuir nenhum ancestral (como um pai, avô, etc...) o resultado é *`null`*.
     * ------
     * @param {HandlerFunction} handler
     * * Uma função para cada elemento ancestral ao elemento atual.
     *  ------
     * @example
     * .ancestors(function(get, i){...})
     */
    AUX.prototype.ancestors = function (handler) {
        __.err("AUX.ancestors")
            .isWindow(this.targets)
            .to(handler, "function")
            .done();
        let parent;
        let i = 0;
        to((root) => {
            parent = root;
            while (true) {
                parent = parent.parentElement;
                handler(
                    new ItemGetters({
                        i: i,
                        item: parent,
                        itemList: [parent],
                        target: root,
                        targetList: this.targets,
                    })
                );
                if (!parent) {
                    break;
                }
                i++;
            }
        }, this.targets);

        (parent = null), (i = null);
        return this;
    };

    /////////// .childPath /////////////
    /**
     * * Percorre o ramo de elementos filhos até chegar em um elemento especificado em *`selector`* e, se encontrado, executa uma função *`callback`* para cada elemento do ramo em que a busca passou até chegar nele.
     * * O última elemento do ramo é o elemento encontrado em *`selector`*.
     * > * **Nota** - Se o elemento especificado em *`selector`* não existir ou não fazer parte do ramo de elementos dentro do elemento principal um caminho não pode ser traçado e o resultado obtido é um *`null`*.
     * -------
     * @param {string | HTMLElement} selector
     * * Uma string que represente um seletor CSS que aponte para um único elemento existente dentro do elemento principal ou um elemento HTML existente dentro do mesmo.
     * -----
     * @param {HandlerFunction} handler
     * * Uma função para cada elemento que compõe o caminho até chegar ao destino.
     * -----
     * @example
     * .childPath("#node-10", function(get, i){...})
     */
    AUX.prototype.childPath = function (selector, handler) {
        __.err("AUX.childPath")
            .isWindow(this.targets)
            .to(selector, "string, HTMLElement")
            .to(handler, "function")
            .done();

        let x = {};
        to((root) => {
            x.pathList = [];

            //Verificar se foi passado um seletor ou elemento
            if (__.type(selector) == "string") {
                x.pathList.push(root.querySelector(selector));
            } else {
                x.pathList.push(selector);
            }

            //Obter lista de caminho até o destino
            for (let i = 0; i < x.pathList.length; i++) {
                x.newPath = x.pathList[i];
                if (x.newPath && x.newPath.parentElement !== root) {
                    x.pathList.push(x.newPath.parentElement);
                } else {
                    break;
                }
            }

            //Percorrer lista do fim para o início
            for (let i = 0; i < x.pathList.length; i++) {
                x.res = x.pathList[x.pathList.length - i - 1];
                handler(
                    new ItemGetters({
                        i: i,
                        item: x.res || null,
                        itemList: x.pathList,
                        target: root,
                        targetList: this.targets,
                    })
                );
            }
        }, this.targets);

        x = null;
        return this;
    };

    ///////////// .click ///////////////
    /**
     * * Simula o clique do mouse em um elemento HTML. Se o elemento possuir um ouvinte de evento o mesmo também será disparado.
     * ----
     * @example
     * .click()
     */
    AUX.prototype.click = function () {
        to((root) => {
            root.click();
        }, this.targets);

        return this;
    };

    //////////// .focus ////////////
    /**@typedef {{preventScroll: boolean, focusVisible: boolean}} FocusOptions */
    /**
     * * Define o foco no elemento se ele puder ser focado.
     *-----
     * @param {FocusOptions} options
     * *`(opcional)`*
     * * Um objeto opcional para controlar aspectos do processo de focagem. Pode conter as seguintes propriedades:
     *
     * > * **`preventScroll:`** Um valor booleano que indica se o navegador deve ou não rolar o documento para exibir o elemento recém-focado. Um valor false (*`padrão`*) significa que o navegador rolará o elemento para visualização após focalizá-lo. Se definido como true, nenhuma rolagem ocorrerá.
     *
     * > * **`focusVisible:`** Um valor booleano que deve ser definido *`true`* para forçar a indicação visível de que o elemento está em foco. Por padrão, ou se a propriedade não for true, um navegador ainda poderá fornecer uma indicação visível se determinar que isso melhoraria a acessibilidade para os usuários.
     * -----
     * @example
     * .focus()
     * .focus({ preventScroll: false, focusVisible: true })
     */
    AUX.prototype.focus = function (options = {}) {
        to((root) => {
            root.focus(options);
        }, this.targets);

        return this;
    };

    ////////// .focusOff ///////////
    /**
     * * Remove o foco do teclado do elemento focado.
     * -----
     * @example
     * .focusOff()
     */
    AUX.prototype.focusOff = function () {
        to((root) => {
            root.blur();
        }, this.targets);

        return this;
    };

    // END OF LIB ------------------------------------------------------
    return AUX;
})();


export default AUX;
