import __ from "../@/@internal.js";
import("../@/@docs.js")
"use strict"

const NUMB = 999999999


/**
 * **AUX.JS**
 * 
 * --------
 *  Ler Documentação {@link https://walcygleicson.github.io/AUXDocs/ AUXDocs}
 * 
 * --------
 * * Aponta para elementos HTML (ou os obtém) e fornece métodos para manipulação do mesmo.
 * 
 * @param {ElementReference} elements
 * > * Deve receber qualquer objeto que faça referência ou aponte para um ou mais elementos HTML.
 * > ------------
 * > * Um HTMLElement.
 * > * Uma String que represente um seletor CSS válido que aponte para um elemento existente no DOM.
 * > * Um Array ou Object contendo seletores CSS válidos e/ou elementos HTML.
 * > * Um NodeList ou HTMLCollection.
 * 
 * -----
 * Nota: Qualquer valor que não seja ou não faça nenhum tipo de referência a algum elemento HTML resultará em um erro!
 */
export default function dom(elements) {
    //Tratar erros de argumento
    const error = __.err("dom");
    error
        .to(elements, "HTMLElement, HTMLSelector, elementList")
        .isVoid(elements, 1)
        .done();
    elements = __.ex(elements, error);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/

    function to(fn) {
        if (elements.length > 1) {
            for (let i = 0; i < elements.length; i++) {
                fn(elements[i], i, elements);
            }
        } else {
            fn(elements[0], 0, elements);
        }
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
    var x = {};

    var dom = {};

    ///////////// length ////////////////////
    /**
     * * Retorna a quantidade de elementos obtidos.
     * @type {number}
     */
    dom.length = elements.length;

    /////////////// console //////////////////
    /**
     * * Imprime no console do navegador os elementos obtidos.
     */
    dom.console = function () {
        elements.length > 1
            ? (console.group("elementList (Array):"),
              console.log(elements),
              console.log(...elements))
            : (console.group(elements[0].tagName + " Element:"),
              console.log(...elements));
        console.groupEnd();
    };

    /////////////////// addClass ///////////////

    /**
     * * Adiciona um ou mais nomes de classe ao elemento alvo.
     * >
     * * Pode definir em qual posição os nomes de classe serão adiciondaos. Se n for definido os nomes serão adicionados ao final da lista de classe.
     *
     * -----
     *
     * @param {string|Array<string>} classNames Uma string que represente um nome de classe ou múltiplos nomes de classe separados por vírgula. Pode receber um Array com strings que representem nomes de classe.
     * @param {number} pos (opcional) Um número que represente a posição (index) em que os nomes serão adicionados na lista de classe.
     */
    dom.addClass = function (classNames, pos = NUMB) {
        __.err("dom.addClass")
            .to(classNames, "string, array, object")
            .isVoid(classNames)
            .to(pos, "number", false)
            .done();
        //Separar nomes de classe por vírgula se passado uma string
        classNames = __.arr(classNames, true);

        to((e) => {
            x.classList = [...e.classList];

            //Inserir na posição
            x.classList.splice(pos, 0, ...classNames);

            //Juntar e adicionar classes ao elemento
            x.classList = x.classList.join(" ");
            e.setAttribute("class", x.classList);
            delete x.classList;
        });

        return this;
    };

    ////////////////// appendChilds ////////////////////////

    /**
     * * Insere um ou mais elementos na lista de nós filhos.
     * * Se o elemento inserido for filho de outro nó, este então é removido de seu nó pai e inserido no elemento alvo, senão é apenas inserido no elemento alvo.
     *
     * ------
     * @param {ElementReference} nodes Deve receber os elementos que serão inseridos. Um elemento ou Array|Object de elementos. Um seletor ou Array|Object de seletores. Um NodeList ou HTMLCollection.
     *
     * @param {{handler: _CallbackFunction, position: number}|_CallbackFunction} options
     */

    dom.appendChilds = function (nodes, options = {}) {
        const err = __.err("dom.appendChilds");

        err.to(nodes, "HTMLElement, HTMLSelector, elementList")
            .isVoid(nodes)
            .to(options, "function, object", false)
            .done();

        nodes = __.ex(nodes, err);

        x.pos = options.position !== undefined ? options.position : NUMB
        x.handler = options.handler || (__.type(options) == 'function'? options : null)
        
        //Apenas teste
        x.isDone = false
        ///Lembrar - Validar erro de valor de propriedade options *******>>

        to((parent) => {
            //Buscar por nó de referencia
            switch (__.type(x.pos)) {
                case "number":
                    x.nodeRef = parent.children[x.pos];
                    break;
                case "string":
                    x.nodeRef = parent.querySelector(x.pos);
                    break;
                case "HTMLElement":
                    //Verificar se a referência passada é um elemento filho do nó destino
                    x.nodeRef = x.pos.parentElement == parent ? x.pos : null;
            }

            nodes.forEach((child) => {
                x.done = () => { x.isDone = true; parent.insertBefore(child, x.nodeRef)}
                //Executar se uma callback function for passado
                if (x.handler) {
                    x.handler({}, x.done)
                } else {
                    x.done()
                }
            });

            //Teste
            if (!x.isDone) {
                console.error('Esperado que a função done() seja invocada ao menos uma vez')
            }
        });

        delete x.nodeRef;
        delete x.handler
        delete x.pos
        delete x.done
        return this;
    };

    /**
     * * Insere uma string que representa elementos HTML como sendo nós do tipo HTMLElement.
     * * A string não sobrescreve o contéudo HTML do elemento alvo, mas a converte em um nó do tipo HTMLElement e a insere ao final da lista de elementos filhos (ou em uma posição especificada em `< options.position >`).
     *
     * ----
     * ----
     * @param {string} HTMLText
     * * Uma String que representa um ou mais elementos HTML. Representação de comentários também é suportado.
     * ----
     * @param {Function|{amount:number, position: (number|string|HTMLElement), handler: (source:ElementTools, done:Function)=>void}} options
     * * *(`Opcional`)*
     * * Pode receber uma função callback que é executada antes do elemento gerado ser inserido. Espera a invocação do parâmetro **done( )** para executar a operação.
     * * Pode receber um Objeto que recebe as seguintes propriedades:
     *
     * > * **`handler`** A função callback descrita anteriormente.
     *
     * > * **`amount`** - Um número que define a quantidade de elementos que serão gerados a partir da string.
     *
     * > * **`position`** - Uma referência que indique a posição em que o elemento gerado será inserido na lista de elementos filhos. Pode ser um número de índice, uma string que representa um seletor CSS válido que aponte para algum elemento filho ou o próprio elemento como referência, indica que o novo elemento será inserido antes dele.
     */
    dom.appendHTML = function (HTMLText, options = {}) {
        //Criar um elemento capsula temporário
        x.capsule = document.createElement("div");
        x.capsule.innerHTML = HTMLText;
        console.log(x.capsule);
        console.log(x.capsule.childNodes);
    };

    console.log("box-temp dom.js", x);
    return Object.freeze(dom);
}



