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
    const error = __.err('dom')
    error.to(elements, 'HTMLElement, HTMLSelector, elementList')
        .isVoid(elements, 1)
        .done()
    elements = __.ex(elements, error)

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
    
    function to(fn) {
        if (elements.length > 1) {
            for (let i = 0; i < elements.length; i++){
                fn(elements[i], i, elements)
            }
        } else {
            fn(elements[0], 0, elements)
        }
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
    var x = {}

    var dom = {}

    ///////////// length ////////////////////
    /**
     * * Retorna a quantidade de elementos obtidos.
     * @type {number}
     */
    dom.length = elements.length
    
    /////////////// console //////////////////
    /**
     * * Imprime no console do navegador os elementos obtidos.
     */
    dom.console = function () {
        elements.length > 1
                ? (console.group("elementList (Array):"),console.log(elements),console.log(...elements)) : (console.group(elements[0].tagName + " Element:"), console.log(...elements));
            console.groupEnd();
    }

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
        __.err('dom.addClass')
            .to(classNames, 'string, array, object')
            .isVoid(classNames)
            .to(pos, 'number', false)
            .done()
        //Separar nomes de classe por vírgula se passado uma string
        classNames = __.arr(classNames, true)
        

        to((e) => {
            x.classList = [...e.classList]
           
            //Inserir na posição
            x.classList.splice(pos, 0, ...classNames)

            //Juntar e adicionar classes ao elemento
            x.classList = x.classList.join(' ')
            e.setAttribute('class', x.classList)
            delete x.classList
        })

        return this
    }

    ////////////////// appendChilds ////////////////////////

    /**
     * * Insere um ou mais elementos na lista de nós filhos.
     * * Se o elemento inserido for filho de outro nó, este então é removido de seu nó pai e inserido no elemento alvo, senão é apenas inserido no elemento alvo.
     * 
     * ------
     * @param {ElementReference} nodes Deve receber os elementos que serão inseridos. Um elemento ou Array|Object de elementos. Um seletor ou Array|Object de seletores. Um NodeList ou HTMLCollection.
     * @param {number} posRef (opcional) Um número que represente a posição (index) em que os elementos filhos serão inseridos. O nó filho que ocupava anteriormente o index especificado é empurrado para frente dando espaço para os novos elementos. Se senhum argumento for passado os elementos serão inseridos ao final da lista de nós filhos.
     * @param {(tools:ElementTools, done: Function)=>void} handler (opcional) Executa uma função para cada elemento passado antes da operação ser concluída. O elemento atual só será inserido no novo elemento pai ao invocar a função **done( )**. Recebe dois parâmetros: **tools** e **done**.
     */
    dom.appendChilds = function (nodes, handler = Function, posRef = NUMB) {
        
        //Reorganizar argumento pulável - Passar uma função passada em posRef para handler
        if (__.type(handler) == 'number' && posRef === NUMB) {
            posRef = handler
            handler = Function
        }

        const err = __.err('dom.appendChilds')
        err.to(nodes, 'HTMLElement, HTMLSelector, elementList')
            .isVoid(nodes)
            .to(handler, 'function', false)
            .to(posRef, 'number, HTMLElement, HTMLSelector', false)
            .done()
        
        nodes = __.ex(nodes, err)

        to((parent) => {
            
            //Buscar por nó de referencia
            switch (__.type(posRef)) {
                case 'number':
                    x.nodeRef = parent.children[posRef]
                    break
                case 'string':
                    x.nodeRef = parent.querySelector(posRef)
                    break
                case 'HTMLElement':
                    x.nodeRef = posRef.parentElement == parent? posRef : null
            }

            nodes.forEach((child) => {
                parent.insertBefore(child, x.nodeRef)
                
            })
        })

        delete x.nodeRef
        return this
    }

    console.log('box-temp dom.js', x)
    return Object.freeze(dom)
}



