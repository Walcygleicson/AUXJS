import __ from "../@/@internal.js";
import("../@/@docs.js")
"use strict"





function dom(elements) {





    dom.toggleStyles = function (styleProps) {};

    dom.createStyle = function (CSSRules) {};

    dom.setCSS = function (selector, styleProps) {};

    dom.toggleCSS = function (selector, styleProps) {};


    dom.on = function (eventName, handler, useCapture) {};

    dom.addEvents = function (eventsObject) {};

    dom.removeEvents = function (eventName, func) {};

    dom.mouseInOut = function (handler) {};

    dom.focusInOut = function (handler) {};


    dom.toggleChilds = function (childsA, childsB) {};
    dom.toggle = function (elementB) {};
    dom.replace = function (newElement) {};
    dom.replaceChilds = function (newChilds, oldChilds) {};
    dom.click = function () {};
    dom.focus = function (options) {};

    dom.insertTo = function (targets, position) {};
    dom.cloneTo = function (targets, options) {};

    dom.toView = function () {};

    dom.createAnim = function (animProps, mode) {};

    dom.addAnim = function (animName, config) {};
    dom.setVar = function (varName, value) {};
    dom.removeVar = function (varName) {};
    dom.toggleVar = function (varNameA, varNameB) {};
    dom.mediaQuery = function (media, styleProps) {};

    console.log("box-temp dom.js", x);
    return Object.freeze(dom);
}





var AUX = (function () {
    const version = "1.0.0";

    const NUMB = 999999999;
    /**Armazena propriedades de valores temporários.
     * >
     * **Limpar as propriedades não mais usadas com *`clear( )`***
     */
    var x = {};
    /**Armazena tipos personalisados */
    const t = {
        /**"number, string, HTMLElement, null" */
        IDXREF: "number, string, HTMLElement, null",

        ELREF: "HTMLElement, HTMLSelector, elementList",

        CLASSLIST: "string, array, object",
    };

    /**Armazena os ouvintes de eventos que foram marcados para serem removidos posteriormente */
    var eventRemoveStack = {};

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
    var AUX = function (selectors) {
        if (!(this instanceof AUX)) {
            return new AUX(selectors);
        }
        //Tratar erros de argumento
        const error = __.err("AUX");
        error.to(selectors, t.ELREF).isVoid(selectors, 1).done();

        /** * Retorna um Array contento todos os elementos da lista de elementos obtidos por *`AUX`* @type {Array<HTMLElement>}*/
        this.elements = __.ex(selectors, error);
        const elements = this.elements;
        /** * Retorna a quantidade de elementos da lista obtida por *`AUX`*. @type {number}*/
        this.length = this.elements.length;

        /**
         * * Objeto de propriedades que retornam os valores de todas as propriedades CSS atualizadas de um elemento (o primeiro da lista de manipulação se existir mais de um).
         * @type {CSSStyleDeclaration}
         */
        this.getStyle = window.getComputedStyle(this.elements[0]);

        /** * Objeto de métodos que inserem templates genéricos*/
        this.insert = {
            /**
             * * Cria uma tabela genérica sem estilos.
             *
             * @param {optionsObject} options
             */
            table(options = {}) {
                options = {
                    position: options.position ?? null,
                    handler:
                        __.type(options) == "function"
                            ? options
                            : options.handler,
                    amount: options.amount ?? 1,
                    rows: options.rows ?? 5,
                    cols: options.cols ?? 5,
                    defaultStyle: options.defaultStyle ?? true,
                };

                to((root) => {
                    x.childList = [...root.children];
                    x.nodeRef = __.indexRef(options.position, x.childList);
                    x.th = __.mapLoop(
                        options.cols,
                        (n) => `<th>Title ${n}</th>`
                    ).join("");
                    x.cols = __.mapLoop(options.cols, () => "<td></td>").join(
                        ""
                    );
                    x.rows = __.mapLoop(
                        options.rows,
                        () => `<tr>${x.cols}</tr>`
                    ).join("");
                    for (let i = 0; i < options.amount; i++) {
                        x.table = __.strHTML(`
                    <table class="aux-table">
                        <caption>Table Title Here!</caption>
                        <thead>
                            <tr>
                                ${x.th}
                            </tr>
                        </thead>
                        <tbody>
                            ${x.rows}
                        </tbody>
                    </table>
                    `);

                        root.insertBefore(x.table, x.nodeRef);

                        if (options.handler) {
                            options.handler(x.table);
                        }
                    }
                }, elements);
                clear(x);
                return this;
            },
        };
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

    //####### FUNÇÕES INTERNAS ########//
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

    /**Remove propriedades de um object */
    const clear = function (obj) {
        Object.keys(obj).forEach((prop) => {
            delete obj[prop];
        });
    };
    //############### END #################//

    //@ EXTENDER BIBLIOTECA ************************

    /////////////////// .text /////////////////////
    /**
     * * Define o contéudo de texto dos elementos. Todos os nós filhos destes elementos serão excluídos e substituídos pelo texto.
     * -----
     * @param {*} text
     * * `(opcional)` - O conteúdo de texto que será inserido no elemento alvo. Se nenhum argumento for passado todo o conteúdo do elemento alvo será limpo (substituído por uma string vazia).
     * ---
     */
    AUX.prototype.text = function (text = "") {
        to((root) => {
            root.textContent = text;
        }, this.elements);
        return this;
    };

    ///////// .html //////////////////////////
    /**
     * * Define o contéudo HTML dos elementos. Todos os nós filhos destes elementos serão excluídos e substituídos pelo conteúdo passado.
     * ----
     * @param {string} stringHTML
     * * O conteúdo HTML que será inserido no elemento alvo. Se nenhum argumento for passado todo o conteúdo HTML do elemento alvo será limpo (substituído por uma string vazia).
     * ---
     */
    AUX.prototype.html = function (stringHTML = "") {
        to((root) => {
            root.innerHTML = stringHTML;
        }, this.elements);
        return this;
    };

    /////////// .style ///////////////////////////
    /**
     * * Define as propriedades de estilo dos elementos. O estilo é aplicado inline.
     * ----
     * @param {StyleProperties} styleProps
     * * Um objeto que define as propriedades de estilos CSS e seus valores.
     * * Obs: Usar  **`camelCase`** em nomes compostos de propriedades ao invés de separá-las com "-" (traço, sinal de menos).
     * * Exceção para declarações de variáveis que devem ser escritas da forma tradicional entre aspas `"--bgcolor": "#67cda8"`.
     * ----
     * @example
     * .style({
     *      display: "flex",
     *      flexDirection: "column",
     *      justifyContent: "center",
     *      alignItems: "center"
     *      border: "1px solid #aa98ff",
     *      "--bg-color": "gray"
     * })
     */
    AUX.prototype.style = function (styleProps) {
        to((root) => {
            Object.keys(styleProps).forEach((prop) => {
                root.style.setProperty(prop, styleProps[prop]);
            });
        }, this.elements);

        return this;
    };

    /////////////// .console //////////////////
    /**
     * * Imprime no console do navegador os elementos obtidos por *`AUX`*.
     */
    AUX.prototype.console = function () {
        this.elements.length > 1
            ? (console.group("elementList (Array):"),
              console.log(this.elements),
              console.log(...this.elements))
            : (console.group(this.elements[0].tagName + " Element:"),
              console.log(...this.elements));
        console.groupEnd();

        return this;
    };

    //////////// .add ////////////
    /**
     * * Adiciona novos elementos HTML à lista de elementos obtidos por *`AUX` para manipulação.*
     * ---------
     * @param {ElementReference} selectors
     * * Deve receber uma referência a um ou mais elementos HTML existentes no DOM. Podendo ser:
     * > -------
     * > * Uma String que representa um seletor CSS (ou múltiplos seletores separados por vírgula) válido que aponte para um ou mais elementos existentes no DOM.
     * > * Um Array ou Object contendo seletores CSS válidos e/ou elementos HTML para manipulação.
     * > * Um HTMLElement ou NodeList ou HTMLCollection para manipulação.
     * -----
     * * Nota: Qualquer valor que não seja ou não faça nenhum tipo de referência a algum elemento HTML resultará em um erro!
     */
    AUX.prototype.add = function (selectors) {
        var err = __.err(".add");
        err.to(selectors, t.ELREF).isVoid(selectors).done();
        this.elements.push(...__.ex(selectors, err));
        err = null;
        return this;
    };

    /////////// .remove /////////
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
    AUX.prototype.remove = function (whichElements) {
        whichElements = __.getElementsOfList(whichElements, this.elements);
        this.elements = this.elements.filter((e) => {
            if (!whichElements.includes(e)) {
                return e;
            }
        });

        return this;
    };

    ///////// .addClass ////////////////////////////
    /**
     * * Adiciona um ou mais nomes de classe aos elementos da lista de manipulação.
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
     * .addClass("foo")
     * .addClass("foo, bar")
     * .addClass(["foo", "bar", "etc"])
     * .addClass(".foo", 1)
     */
    AUX.prototype.addClass = function (classNames, position = NUMB) {
        __.err(".addClass")
            .to(classNames, "string, array, object")
            .isVoid(classNames)
            .to(position, "number", false)
            .done();

        //Separar nomes de classe por vírgula se passado uma string
        classNames = __.arr(classNames, true);

        to((e) => {
            x.classList = [...e.classList];

            //Inserir na posição
            x.classList.splice(position, 0, ...classNames);

            //Juntar e adicionar classes ao elemento
            x.classList = x.classList.join(" ");
            e.setAttribute("class", x.classList);
        }, this.elements);

        clear(x);
        return this;
    };

    ///////////// .attrs /////////////////////
    /**
     * * Define os atributos dos elementos da lista de manipulação.
     * * Se um elemento já possuir um atributo especificado em *`attributes`* o valor deste será sobrescrito. Se um atributo especificado em *`attributes`* receber um valor *`false`* ou *`null`* este atributo será removido do elemento alvo.
     * ----
     * @param {attributesObject} attributes
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
        __.err(".attrs").to(attributes, "object").done();

        to((root) => {
            Object.keys(attributes).forEach((name) => {
                //Se o valor de uma prop for false ou null remover atributo
                if (attributes[name] === null || attributes[name] === false) {
                    root.removeAttribute(name);
                } else {
                    root.setAttribute(name, attributes[name]);
                }
            });
        }, this.elements);
        return this;
    };

    /////// .appendHTML //////////////////////////
    /**
     * * Insere uma string que representa elementos HTML como sendo nós do tipo HTMLElement.
     * * A string não sobrescreve o contéudo HTML do elemento alvo, mas a converte em um nó do tipo HTMLElement e a insere ao final da lista de elementos filhos (ou em uma posição especificada em *`options.position`*.
     * ----
     * @param {string} HTMLText
     * * Uma String que representa um ou mais elementos HTML. Representação de comentários também é suportado.
     * ----
     * @param {Function|{amount:number, position: PositionReference, handler: (source:ElementTools, done:Function)=>void}} options
     * * *(`Opcional`)*
     * * Pode receber uma função callback que é executada antes do elemento gerado ser inserido. Espera a invocação do parâmetro **done( )** para executar a operação. Ou pode receber um Objeto que recebe as seguintes propriedades:
     *
     * > * **`handler:`** A função callback descrita anteriormente.
     *
     * > * **`amount:`** Um número que define a quantidade de elementos que serão gerados a partir da string.
     *
     * > * **`position:`** Uma referência que indique a posição em que o elemento gerado será inserido na lista de elementos filhos. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento filho ou o próprio elemento como referência, indica que o novo elemento será inserido antes dele.
     */
    AUX.prototype.appendHTML = function (HTMLText, options = {}) {
        var err = __.err("dom.appendHTML");
        err.to(HTMLText, "string")
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

        x.isDone = false;
        options = {
            handler: __.type(options) == "function" ? options : options.handler,
            amount: options.amount ?? 1,
            position: options.position ?? null,
        };

        to((root) => {
            x.childList = [...root.children];

            for (let i = 0; i < options.amount; i++) {
                x.htmlText = __.strHTML(HTMLText);

                //Função done()
                x.done = () => {
                    //Obter o elemento filho referência para o insertBefore
                    x.nodeRef = __.indexRef(options.position, x.childList);
                    x.isDone = true; //Avisar que esta função foi executada
                    root.insertBefore(x.htmlText, x.nodeRef);
                };

                //Callback function
                if (options.handler) {
                    options.handler(2, x.done);
                } else {
                    x.done();
                }
            }
        }, this.elements);

        if (!x.isDone) {
            err.notDone(x.isDone);
        }

        clear(x);
        err = null;
        return this;
    };

    ////////////////// .appendChilds ////////////////////////
    /**
     * * Insere novos elementos filhos ao final da lista de nós filhos (ou em uma posição especificada em *`options.position`*) do primeiro elemento pai da lista de manipulação principal.
     * * Nota: Se os elementos inseridos forem filhos de outros nós, estes então serão removidos des seus nós pai para serem inseridos no novo pai, já que o mesmo elemento não pode estar em dois lugares distintos na árvore DOM. Para obter resultado semelhante usar *`AUX.appendClones( )`*.
     * * Opcionalmente pode executar uma função *`callback`* para cada elemento filho obtido antes dos mesmos serem inseridos, esperando a execução da função *`done( )`* (obtida no segundo parâmetro desta função) para finalizar a operação.
     * ------
     * @param {ElementReference} selectors
     * * Deve receber os elementos que serão inseridos como filho, podendo obté-los através de uma string que represente um seletor CSS válido (ou múltiplos seletores separados por vírgula), um array de contento seletores ou os elementos, um nodeList ou HTMLCollection ou um HTMLElement.
     *-------
     * @param {{handler: _CallbackFunction, position: PositionReference}|_CallbackFunction} options
     *
     * *`(opcional)`*
     * * Pode receber uma função de retorno de chamada ou pode receber um Objeto que recebe as seguintes propriedades opcionais:
     *
     * > * **`handler:`** A função callback descrita anteriormente.
     *
     * > * **`position:`** Uma referência que indique a posição em que o elemento obtido será inserido na lista de nós filhos. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento da lista de nós filhos ou o próprio elemento como referência.
     *------
     * @example
     * // Insere diretamente ao final da lista de nós filhos
     * .appendChilds("#div")
     *
     * // Insere na posição 0 (início) da lista de nós filhos
     * .appendChilds("#div", {position: 0})
     *
     * // Executa uma função para o elemento. Espera a execução de done() para ser inserido
     * .appendChilds("#div", {position: 0, handler({get, def}, done){
     *      // Seu código
     *      done()
     * }})
     *
     * // Executa uma função, mas sem o uso das options
     * .appendChilds("#div", ({get, def}, done)=>{
     *      //Seu código
     *      done()
     * })
     */
    AUX.prototype.appendChilds = function (selectors, options = {}) {
        let err = __.err(".appendChilds");
        err.to(selectors, t.ELREF)
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

        x.isDone = false; //Indica se a função done foi executada
        x.root = this.elements[0];
        x.childList = [...x.root.children];

        options = {
            position: options.position ?? null,
            handler: __.type(options) == "function" ? options : options.handler,
        };

        // Para cada filho a ser inserido...
        selectors.forEach((child) => {
            //Função done()
            x.done = () => {
                //Obter o elemento filho referência para o insertBefore
                x.nodeRef = __.indexRef(options.position, x.childList);
                x.isDone = true; //Avisar que esta função foi executada
                this.elements[0].insertBefore(child, x.nodeRef);
            };

            //Callback function
            if (options.handler) {
                options.handler(2, x.done);
            } else {
                x.done();
            }
        });

        //Lançar erro se done() não for executada
        err.notDone(x.isDone, 2);

        clear(x);
        err = null;
        return this;
    };

    ///////// .removeChilds //////////
    /**
     * * Remove um ou mais elementos filhos de cada elemento pai da lista de manipulação. Opcionalmente pode executar uma função *`callback`* para cada filho removido.
     * ----
     * @param {PositionReference} childReference
     * * Uma referência de quais filhos da lista de nós filhos remover. Podendo ser:
     * >* A posição (índice) do filho para ser removido ou um array contendo as posições para múltiplas remoções.
     * >* Um seletor CSS que aponte para um nó filho (ou múltiplos seletores separardos por vírgula) para ser removido ou um array contendo os seletores.
     * >* O elemento ou array de elementos.
     * ----
     * @param {_CallbackFunction} handler
     * *`(opcional)`*
     * * Executa uma função para cada elemento removido.
     * ----
     */
    AUX.prototype.removeChilds = function (childReference, handler = Function) {
        to((root) => {
            x.list = __.getElementsOfList(childReference, [...root.children]);

            for (let i = 0; i < x.list.length; i++) {
                //Remove e armazena o nó removido
                x.removed = root.removeChild(x.list[i]);

                if (handler !== Function) {
                    handler(x.removed);
                }
            }
        }, this.elements);

        clear(x);
        return this;
    };

    ///////// .replaceChilds ////////////
    /**
     * * Substitui um ou mais filhos do elemento pai `(o primeiro da lista de manipulação, se houver mais de um)` pelos novos elementos filhos passados em *`newChilds`*.
     * * Se mais de um filhos forem passados em *`oldChilds`* e a mesma quantidade for passada em *`newChilds`* o filho antigo será removido e em seu lugar será inserido o novo filho correspondente da lista de novos filhos. Os novos filhos que não corresponderem com algum filho antigo será apenas inserido ao final da lista de nós filhos. Mas se faltar, o filho antigo não terá com quem ser substituído e será ignorado da operação.
     * * Opcionalmente pode executar uma função *`callback`* para cada filho que foi substituído com êxito.
     * ----
     * @param {elementListReference} oldChilds
     * * Uma referência de quais filhos existentes na lista de nós filhos serão substituídos. Podendo ser:
     * >* A posição (índice) do filho ou um array contendo as posições para múltiplas substituições.
     * >* Um seletor CSS que aponte para um nó filho (ou múltiplos seletores separardos por vírgula) ou um array contendo os seletores.
     * >* O próprio elemento como referência ou um array de elementos.
     * -------
     * @param {ElementReference} newChilds
     * * Deve receber os elementos que serão inseridos como novos filhos, podendo obté-los através de uma string que represente um seletor CSS válido (ou múltiplos seletores separados por vírgula), um array de contento seletores ou elementos, um nodeList ou HTMLCollection ou o próprio elemento como referência.
     * ----
     * @param {_CallbackFunction} handler
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
     * .replaceChilds(1, "#foo", function({item, get, def, is}){
     *      // Seu código...
     * })
     */
    AUX.prototype.replaceChilds = function (
        oldChilds,
        newChilds,
        handler = Function
    ) {
        let err = __.err(".replaceChilds");
        err.to(oldChilds, t.ELREF + ", number")
            .isVoid(oldChilds)
            .to(newChilds, t.ELREF)
            .isVoid(newChilds, 2)
            .to(handler, "function", false)
            .done();

        x.root = this.elements[0];

        oldChilds = __.getElementsOfList(oldChilds, [...x.root.children]);
        newChilds = __.ex(newChilds, err, 2);

        for (let i = 0; i < newChilds.length; i++) {
            x.old = oldChilds[i] || null;
            x.new = newChilds[i] || null;

            if (x.old) {
                x.root.replaceChild(x.new, x.old);

                //Exeutar função callback
                if (handler !== Function) {
                    handler(x.old);
                }
            } else {
                //Adicionar filho que sobrar ao final da lista de nós filhos
                x.root.appendChild(x.new);
            }
        }

        clear(x);
        err = null;
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
        let err = __.err(".appendClones");
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
     * * Cria um ou mais elementos filhos para cada elemento pai da lista de manipulação e executa uma função *`callback`* para cada resultado onde se pode adicionar propriedades e conteúdos aos elementos criados.
     * * Só é possível criar um tipo de elemento especificado pelo *`tagName`*, sendo possível apenas gerar múltiplas cópias desta mesma tag especificando a quantidade em *`options.amount`*.
     * ----
     * @param {string} tagName
     * * Uma nome de tag.
     * -----
     * @param {Function} handler
     * * Uma função para cada filho criado. Recebe um parâmetro que deve ser desestrututado para melhor obtenção das propriedades de manipulação.
     * ----
     * @param {{amount:number,options:PositionReference}} options
     * *`(opcional)`*
     * * Um objeto que deve receber as seguintes opções de propriedades:
     *
     * > * **`amount:`** Um número que define a quantidade de filhos que serão criados a partir do nome de tag fornecido. Se omitido o valor padrão é 1.
     *
     * > * **`position:`** Uma referência que indique a posição em que o filho criado será inserido na lista de elementos filhos. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento filho ou o próprio elemento como referência. Se omitido os filhos serão inseridos ao final da lista de nós filhos.
     * -----
     * @example
     * // Cria um filho input e o insere o final da lista de nós filhos.
     * .createChilds("input", function({item, i, get, def, is}){
     *      // Se código
     * })
     *
     * // Cria 3 filhos input e os insere na posição 0 (início) da lista de nós filhos.
     * .createChilds("input", function({item, i, get, def, is}){
     *      // Se código
     * }, {amount: 3, position: 0})
     *
     */
    AUX.prototype.createChilds = function (tagName, handler, options = {}) {
        __.err(".createChilds")
            .to(tagName, "string")
            .to(handler, "function")
            .to(options, "object", false)
            .expectObj(options, { amount: "number", position: t.IDXREF }, 3)
            .done();

        options = {
            amount: options.amount ?? 1,
            position: options.position ?? null,
        };

        to((root) => {
            x.childList = [...root.children];
            for (let i = 0; i < options.amount; i++) {
                x.created = document.createElement(tagName);
                //Obter o elemento filho referência para o insertBefore
                x.nodeRef = __.indexRef(options.position, x.childList);
                handler(x.created);
                root.insertBefore(x.created, x.nodeRef);
            }
        }, this.elements);

        clear(x);
        return this;
    };

    //////////////// .for ////////////////////
    /**
     * * Percorre os elementos da lista manipulação e executa uma função de chamada de retorno para cada resultado.
     * -----
     * @param {Function} handler
     * * Uma `callback function`.
     * -----
     */
    AUX.prototype.for = function (handler) {
        for (let i = 0; i < this.elements.length; i++) {
            handler(this.elements[i]);
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
     */
    AUX.prototype.toggleClass = function (namesA, namesB = null) {
        __.err(".toggleClass")
            .to(namesA, t.CLASSLIST)
            .isVoid(namesA)
            .to(namesB, "string, array, object, null", false)
            .isVoid(namesB, 2)
            .done();

        namesA = __.arr(namesA, true);
        namesB = namesB === null ? null : __.arr(namesB, true);

        to((root) => {
            //Função temporária
            //Verifica se o nome de classe ou um dos nomes de classe passados já existem no elemento alvo e retorna true.
            x.has = (names) => {
                for (let name of names) {
                    if (root.classList.contains(name)) {
                        return true;
                    }
                }
                return false;
            };

            if (namesB === null) {
                if (x.has(namesA)) {
                    root.classList.remove(...namesA);
                } else {
                    root.classList.add(...namesA);
                }
            } else {
                if (x.has(namesA) && !x.has(namesB)) {
                    root.classList.remove(...namesA);
                    root.classList.add(...namesB);
                } else if (x.has(namesB) && !x.has(namesA)) {
                    root.classList.remove(...namesB);
                    root.classList.add(...namesA);
                } else if (
                    (x.has(namesA) && x.has(namesA)) ||
                    (!x.has(namesA) && !x.has(namesA))
                ) {
                    root.classList.remove(...namesA);
                    root.classList.add(...namesB);
                }
            }
        }, this.elements);

        clear(x);
        return this;
    };

    /////////// .replaceClass ///////////////////
    /**
     * * Remove os nomes de classe passados em *`oldNames`* (nomes de classe existentes no elemento alvo) e adiciona os nomes de classe passados em *`newNames`*.
     *----
     * @param {string|Array<string>} oldNames
     * * Um ou mais nomes de classe já existentes. Uma *`string`* que representa um nome de classe ou múltiplos nomes de classe separados por vírgula. Ou um *`array`* contento os nomes de classe.
     * -----
     * @param {string|Array<string>} newNames
     * * Um ou mais nomes de classe para serem adicionados. Uma *`string`* que representa um nome de classe ou múltiplos nomes de classe separados por vírgula. Ou um *`array`* contento os nomes de classe.
     * ----
     */

    AUX.prototype.replaceClass = function (oldNames, newNames) {
        __.err(".replaceClass")
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
        }, this.elements);

        return this;
    };

    ///////////// .removeClass /////////////
    /**
     * * Remove um ou mais nomes de classe.
     * -----
     * @param {string|Array<string>} names
     * * Uma *`string`* que representa um nome de classe ou múltiplos nomes de classe separados por vírgula. Ou um *`array`* contento os nomes de classe.
     * -----
     */
    AUX.prototype.removeClass = function (names) {
        __.err(".removeClass").to(names, t.CLASSLIST).isVoid(names).done();

        to((root) => {
            root.classList.remove(...__.arr(names, true));
        }, this.elements);

        return this;
    };

    ////////// .childs /////////////////
    /**
     * * Percorre os elementos que são diretamente filhos dos elementos pai e executa uma função de chamada de retorno para cada resultado.
     * -----
     * @param {Function} handler
     * * Uma função callback para cada elemento filho iterado.
     * * Recebe um parâmetro que deve ser desestruturado para obter de forma mais limpa as propriedades de manipulação desejadas.
     * -----
     * @example
     * .forChilds(({item, get, def, is})=>{
     *      // Se código...
     * })
     */
    AUX.prototype.childs = function (handler) {
        __.err(".childs").to(handler, "function").done();

        to((root) => {
            for (let i = 0; i < root.children.length; i++) {
                handler(root.children[i]);
            }
        }, this.elements);

        return this;
    };

    ////////////////// .search //////////////
    /**
     * * Busca por elementos filhos da árvore de nós filhos em qualquer profundidade ( a partir do nó pai ) e executa uma função *`callback`* para cada resultado.
     * ------
     * @param {string|Array<string>} childSelector
     * * Um seletor CSS válido que aponte para algum elemento filho na árvore de descendentes ou múltiplos seletores separados por vírgula. Um *`Array`* ou *`Object`* contendo seletores.
     * -----
     * @param {_CallbackFunction} handler
     * * Executa uma função para cada elemento filho obtido.
     * -----
     * @example
     * //Buscar por todos os elementos div class="box" existentes dentro do nó pai.
     * .search("div.box", function({item, get, def, is}){
     *      // Seu código
     * })
     */
    AUX.prototype.search = function (childSelector, handler) {
        __.err(".search")
            .to(childSelector, "string, array, object")
            .to(handler, "function")
            .done();

        to((root) => {
            x.res = root.querySelectorAll(childSelector);
            for (let i = 0; i < x.res.length; i++) {
                handler(x.res[i]);
            }
        }, this.elements);

        clear(x);
        return this;
    };

    ////////////////// .toggleDisplay ////////////
    /**
     * * A cada execução alterna entre ocultar e mostrar os elementos definindo o valor da propriedade de estilo *`display`* como *`"none"`* e *`"block"`* ou outro valor especificado no parâmetro opcional *`valueA`*. O estilo é aplicado inline.
     * * Se nenhum argumento for passado nos dois parâmetros a alternância padrão será entre *`"none"`* e *`block`*. Podendo substituir o valor padrão *`block`* por outro valor desejado.
     * * Se um valor for passado no segundo parâmetro a alternância ocorrerá entre os dois valores passados nos dois parâmetros.
     * ----
     * @param {DisplayValue} valueA
     * *`(opcional)`*
     * * Uma string que represente um valor válido da propriedade *`display`*. Este valor substitui o valor padrão *`block`*.
     * ------
     * @param {DisplayValue} valueB
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
        __.err(".toggleDisplay")
            .to(valueA, "string", false)
            .to(valueB, "string", false)
            .done();

        to((root) => {
            x.display = window.getComputedStyle(root).display;
            // Se o elemento não possui uma propriedade display atribuida inline ou se possui mas não sao nenhum dos valores padrões, verificar visibilidade para alteranar valores
            if (
                x.display == "" ||
                (x.display != valueA && x.display != valueB)
            ) {
                if (root.checkVisibility()) {
                    root.style.display = valueB;
                } else {
                    root.style.display = valueA;
                }
            } else if (x.display == valueA) {
                root.style.display = valueB;
            } else if (x.display == valueB) {
                root.style.display = valueA;
            }
        }, this.elements);
        clear(x);
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
     * @param {(form: object, details: {form: HTMLElement, formList: Array<HTMLElement>})=>void} handler
     * * Executa uma função para os objetos de valores obtido dos formulários.
     * ------
     * @example
     * .forms(function(form, details){
     *      // Seu código
     * })
     */
    AUX.prototype.forms = function (handler) {
        __.err(".forms").to(handler, "function").done();
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
        }, this.elements);

        clear(x);
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
     * @param {{amount: number, position: PositionReference, handler: _CallbackFunction}} options
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
     * .cloneTo(".container", {amount: 3, handler({item, get, def}){}})
     *
     * // Apenas executa uma função para cada clone gerado.
     * .cloneTo(".container", function({item, get, def}){})
     *
     */
    AUX.prototype.cloneTo = function (targets, options = {}) {
        let err = __.err(".cloneTo");
        err.to(targets, t.ELREF)
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

        targets = __.ex(targets, err);
        x.clones = [];

        //Gerar clones
        to((root) => {
            x.clones.push(
                ...__.mapLoop(options.amount, (i) => root.cloneNode(true))
            );
        }, this.elements);

        //Inserir clones no alvos.
        to((target) => {
            x.childList = [...target.children];
            x.nodeRef = __.indexRef(options.position, x.childList);
            // Para cada destino
            for (let i = 0; i < x.clones.length; i++) {
                x.clone = x.clones[i];
                target.insertBefore(x.clone, x.nodeRef);

                if (options.handler) {
                    options.handler(x.clone);
                }
            }
        }, targets);

        clear(x);
        err = null;
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
     * @param {{position: PositionReference, handler: _CallbackFunction}} options
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
     * .insertTo(".container", {position: 0, handler({item, get, def}){}})
     *
     * //Executa uma função para cada elemento.
     * .insertTo(".container", function({item, get, def}){})
     */
    AUX.prototype.insertTo = function (target, options = {}) {
        let err = __.err(".insertTo");
        err.to(target, "string, HTMLElement")
            .to(options, "object, function", false)
            .expectObj(options, { position: t.IDXREF, handler: "function" }, 2)
            .done();

        target = __.ex(target, err)[0];
        options = {
            position: options.position ?? null,
            handler: __.type(options) == "function" ? options : options.handler,
        };

        x.childList = [...target.children];
        x.nodeRef = __.indexRef(options.position, x.childList);
        to((root) => {
            target.insertBefore(root, x.nodeRef);

            if (options.handler) {
                options.handler(root);
            }
        }, this.elements);

        err = null;
        clear(x);
        return this;
    };

    ///////////// .replace /////////// NÃO INICIADO
    //AUX.prototype.replace = function(newElements){}

    ////////// .createForms //////////////
    /**
     * * Cria formulários genéricos e os inserem no elemento.
     * * Opcionalmente executa uma função *`callback`* para cada formulário criado onde se pode polir melhor a estrutura base.
     * ------
     * @param {object} inputTypes
     * * Um objeto de propriedades que definem o label e o tipo dos campos *`input`*. O nome dado à propriedade deve ser um título *`label`* enquanto seu valor deve ser o tipo do input.
     * -----
     * @param {{amount: number, position: PositionReference, handler: _CallbackFunction}} options
     */
    AUX.prototype.createForms = function (inputTypes, options = {}) {
        options = {
            position: options.position ?? null,
            handler: __.type(options) == "function" ? options : options.handler,
            amount: options.amount ?? 1,
        };

        to((root) => {
            x.childList = [...root.children];
            x.nodeRef = __.indexRef(options.position, x.childList);
            for (let i = 0; i < options.amount; i++) {
                x.form = __.strHTML(
                    `
                <form action="" class="aux-form">
                    <h1 class="form-title">Title Here</h1>
                    <p class="form-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <div class="input-container">
                        ${Object.keys(inputTypes)
                            .map((name) => {
                                return `
                            <div class="${name}-container">
                                <label for="${name}">${__.capitalize(
                                    name
                                )}</label>
                                <input type="${
                                    inputTypes[name]
                                }" id="${name}" name="${name}" required>
                                <p class="warn-msg"><!-- Mostrar mensagem de aviso --></p>
                            </div>`;
                            })
                            .join("")}
                            
                        
                        <div class="checkbox-container">
                            <input type="checkbox" name="remember-pass" id="remember-pass">
                            <label for="remember-pass">Remember password?</label>
                        </div>
                    </div>
                    <button type="submit" class="submit-btn">Submit</button>
                </form>
                `
                ).querySelector(".aux-form");

                root.insertBefore(x.form, x.nodeRef);

                if (options.handler) {
                    options.handler(x.form);
                }
            }
        }, this.elements);

        clear(x);
        return this;
    };

    ////////// .createTables //////////////////
    /**
     * @typedef {object} optionsObject
     * @property {_CallbackFunction} handler Executa a função para cada resultado obtido.
     * @property {number} rows Um número que indique a quantidade de linhas que a tebela deve possuir.
     * @property {number} cols Um número que indique a quantidade de colunas que a tebela deve possuir.
     * @property {PositionReference} position
     * @property {number} amount
     */

    //////////////// .on ////////////////////
    /**
     * * Adiciona um ouvinte de evento ao elemento especificando seu tipo em *`type`* e executa uma função *`callback`* quando o evento for disparado.
     * > * **Nota:** Ouvintes de eventos adicionados através deste método precisam ser adicionados em uma pilha de espera de remoção para poderem ser removidos posteriormente por *`AUX.removeEvents()`* caso contrário o ouvinte não poderá ser removido. Para isso defina *`true`* em *`options.removeStack`* para adicioná-los à pilha de espera.
     * > * É possível remover ouvintes que foram declarados com funçao anônima ou *`arrow functions`* definindo um nome único em *`options.removeStack`*, este nome será usado em *`AUX.removeEvents()`* como referência para a remoção.
     * -----
     * @param {EventType} type
     * * Uma string que representa o tipo do evento esperado.
     * -----
     * @param {_CallbackFunction} handler
     * * Uma função que é executada quando o evento for disparado.
     * ----
     * @param {boolean | EventOptions | {times: number}} options
     * *`(opcional)`*
     * * Um objeto que especifica características sobre os ouvintes de eventos. Se passado, todos os ouvintes declarados receberão esta mesma configuração. Deve receber as seguintes propriedades opcionais:
     *
     * > * **`removeStack:`** (propriedade única da biblioteca) .
     *
     * > * **`times:`** (propriedade única da biblioteca) Um número que indica quantas vezes os ouvintes devem ser invocados após serem adicionados. Após a quantidade máxima de invocação determinada for atingida os ouvintes serão automaticamente removidos. Nota: Estes ouvintes não poderão ser removidos com *`.removeEvents()`*.
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
     */
    AUX.prototype.on = function (type, handler, options = {}) {
        __.err(".on")
            .to(type, "string")
            .to(handler, "function")
            .to(options, "boolean, object", false)
            .done();

        var fn;
        if (options.times) {
            fn = function (evt) {
                options.times--;
                handler(options.evtTarget, evt);
                if (options.times === 0) {
                    options.evtTarget.removeEventListener(type, fn);
                }
            };
        }

        if (options.removeStack) {
            
            //Verificar se uma pilha do tipo já foi adicionado, se não, adicionar
            if (!eventRemoveStack[type]) {eventRemoveStack[type] = []}

            ///
            
        }

        console.log(eventRemoveStack)

        to((root) => {
            if (options.times) {
                root.addEventListener(type, fn, options);
                options.evtTarget = root;
            } else {
                root.addEventListener(
                    type,
                    handler.bind(handler, root),
                    options
                );
            }
        }, this.elements);

        return this;
    };

    //////////// .events ////////////////////
    /**
     * * Adiciona ao elemento múltiplos ouvintes de eventos declarando-os como métodos de um objeto passado em *`listeners`*.
     * * O evento deve ser passado como um método nomeado com o tipo do evento ou uma propriedade nomeada com o tipo do evento que recebe uma função de valor.
     * * Nota: Não é possível declarar dois eventos de mesmo tipo com o mesmo nome de método ou propriedade a menos que haja diferenciação de letras maísculas e minúsculas entre elas.
     * @example
     * .events({
     *      mouseEnter(){},
     *      mouseenter(){}
     * })
     * @param {EventListeners} listeners
     * * Um objeto que define os ouvintes de eventos que serão adicionados ao elemento. Cada ouvinte deve ser declarado como um método nomeado como o tipo do evento.
     * -----
     * @param {{capture: boolean, once: boolean, passive: boolean, signal: AbortSignal}} options
     * *`(opcional)`*
     * * Um objeto que especifica características sobre os ouvintes de eventos. Se passado, todos os ouvintes declarados receberão esta mesma configuração. Deve receber as seguintes propriedades opcionais:
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
     *
     * @example
     * .events({
     *      click(item, evt){...},
     *      mouseOver(item, evt){...}
     * })
     *
     * //Uso do parâmetro options
     * .events({
     *      click(item, evt){...}
     * }, {once: true})
     */
    AUX.prototype.events = function (listeners, options = {}) {
        x.evt = Object.keys(listeners);
        to((root) => {
            for (let i = 0; i < x.evt.length; i++) {
                x.name = x.evt[i];
                x.method = listeners[x.name];
                x.name = x.name.toLowerCase();
                root.addEventListener(
                    x.name,
                    x.method.bind(null, root),
                    options
                );
            }
        }, this.elements);
        clear(x);
        return this;
    };

    ///////////// .siblings ////////////////////
    /**
     * * Aponta para um ou mais elementos irmão e executa uma função *`callback`* para cada resultado obtido.
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
     * @param {_CallbackFunction} handler
     * * Executa uma função para cada irmão obtido.
     * ----
     * @example
     * .siblings("next", function(){...})
     * 
     * .siblings(2, function(){...})
     * 
     * .siblings(-2, function(){...})
     * 
     * .siblings(".foo", function(){...})
     */
    AUX.prototype.siblings = function (refKey, handler) {
        __.err('.siblings').to(refKey, "string, number").to(handler, "function").done()

        to((root) => {
            x.res = []
            x.siblingList = [...root.parentNode.children]
            x.index = x.siblingList.indexOf(root)

            if (__.type(refKey) == 'string') {
                //Obter irmão por chaves string
                switch (refKey) {
                    case "next":
                        x.res.push(root.nextElementSibling)
                        break
                    case "prev":
                        x.res.push(root.previousElementSibling)
                        break
                    case "all-next":
                        x.res.push(...x.siblingList.slice(x.index + 1))
                        break
                    case "all-prev":
                        x.res.push(...x.siblingList.slice(0, x.index))
                        break
                    case "all":
                        x.res.push(...x.siblingList.filter(e=> e !== root))
                        break
        
                }

                //Obter irmão por seletor CSS | Verificar se nenhum elemento foi obito por chave string.
                if (x.res.length <= 0) {
                    x.nodes = [...root.parentNode.querySelectorAll(refKey)]
                    x.res.push(...x.nodes.filter(e=> e !== root));
                }
                
            } else {
                //Obter irmão por chave de posição numérica
                x.getByNumber = x.siblingList[x.index + refKey]
                if(x.getByNumber){x.res.push(x.getByNumber)}
            }

            to((item) => {
                handler(item)
            }, x.res)
            
        }, this.elements)
        clear(x)
        return this
    }

    ////////// .closest /////////////////////
    /**
     * * Percorre o elemento e seus ancestarias (em direção à raiz do documento) até encontrar um ancestral mais próximo que corresponde ao seletor CSS especificado em *`selectors`* e executa uma função *`callback`* para o resultado. Se nenhum resultado for obtido nenhuma operação ocorre. Se o seletor passado corresponder ao próprio elemento ele será obtido como resultado.
     * * Nota: A pesquisa termina quando o primeiro resultado for encontrado, logo apenas um elemento ancestral é obtido. Para obter todos os nós acestrais a um elemento usar *`AUX.ancestors`*.
     * ------
     * @param {string} selectors
     * * Um seletor CSS válido para corresponder a algum elemento ancestral.
     * -----
     * @param {_CallbackFunction} handler
     * * Executa uma função para o primeiro resultado da busca na árvore de nós ancestrais.
     * -----
     * @example
     * .closest(".parent-2", function(){...})
     */
    AUX.prototype.closest = function (selectors, handler) {
        __.err(".closest").to(selectors, "string").to(handler, "function").done()
        to((root) => {
            x.res = root.closest(selectors)
            if (x.res) {
                handler(x.res)
            }
        }, this.elements)
        clear(x)
        return this
    }

    //////////// .parent ////////////////
    /**
     * * Executa uma função *`callback`* para o elemento pai do elemento atual. Se um pai não existir ou não form um DOM nenhuma operação ocorre.
     * -----
     * @param {_CallbackFunction} handler
     * * Uma função de chamada de retorno caso haja um resultado.
     * -----
     * @example
     * .parent(function(){...})
     */
    AUX.prototype.parent = function (handler) {
        __.err('.parent').to(handler, 'function').done()
        to((root) => {
            x.parent = root.parentElement
            if (x.parent) {
                handler(x.parent) 
            }
            
        }, this.elements)

        clear(x)
        return this
    }

    //////////// .ancestors //////////////
    /**
     * * Percorre todos os ancestrais (em direção à raiz do documento), começando pelo elemento pai, e executa uma função *`callback`* para cada ancestral obtido.
     * * Se o elemento não possuir nenhum ancestral (como um pai, avô, etc...) nenhuma operação será executada.
     * ------
     * @param {_CallbackFunction} handler
     * * Uma função para cada elemento ancestral ao elemento atual.
     *  ------
     * @example
     * .ancestors(function(){...})
     */
    AUX.prototype.ancestors = function (handler) {
       __.err('.ancestors').to(handler, "function").done()
        to((root) => {
            x.parent = root
            while (true) {
                x.parent = x.parent.parentElement
                if (!x.parent) { break }
                handler(x.parent)
            }
        }, this.elements)
        clear(x)
        return this
    }
    
    /////////// .childPath /////////////
    /**
     * * Percorre o ramo de elementos filhos até chegar em um elemento especificado em *`selector`* e, se encontrado, executa uma função *`callback`* para cada elemento do ramo em que a busca passou até chegar nele.
     * * O última elemento do ramo é o elemento encontrado em *`selector`*.
     * > * **Nota** - Se o elemento especificado em *`selector`* não existir ou não fazer parte do ramo de elementos dentro do elemento principal um caminho não pode ser traçado e nenhuma operação é executada.
     * -------
     * @param {string | HTMLElement} selector
     * * Uma string que represente um seletor CSS que aponte para um único elemento existente dentro do elemento principal ou um elemento HTML existente dentro do mesmo.
     * -----
     * @param {_CallbackFunction} handler
     * * Uma função para cada elemento que compõe o caminho até chegar ao destino.
     * -----
     * @example
     * .childPath("#node-10", function(){...})
     */
    AUX.prototype.childPath = function (selector, handler) {
        __.err(".childPath").to(selector, "string, HTMLElement").to(handler, "function").done()
        to((root) => {
            x.pathList = []

            //Verificar se foi passado um seletor ou elemento
            if (__.type(selector) == 'string') {
                x.pathList.push(root.querySelector(selector))
            } else { x.pathList.push(selector) }
            
            //Obter lista de caminho até o destino
            for (let i = 0; i < x.pathList.length; i++){
                x.newPath = x.pathList[i]
                if (x.newPath /*&& x.newPath.parentElement !== root*/) {
                    x.pathList.push(x.newPath.parentElement)
                } else {break}
            }

            //Percorrer lista do fim para o início
            for (let i = 0; i < x.pathList.length; i++){
                x.res = x.pathList[(x.pathList.length - i) - 1]
                if (x.res) {
                    handler(x.res)
                }
            }
            
        }, this.elements)

        clear(x)
        return this
    }

    // END OF LIB ------------------------------------------------------
    return AUX;
})();


export default AUX



