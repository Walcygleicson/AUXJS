import __ from "../@/@internal.js";

/**
 * **AUX.JS**
 * 
 * --------
 * 
 * 
 * @param {} elements 
 * @returns 
 */
export default function dom(elements) {
    elements = __.ex(elements)

    var dom = {
        /**
         * * Imprime no console do navegador os elementos obtidos.
         */
        get console() {
            elements.length > 1
                ? (console.group("elementList (Array):"),console.log(elements),console.log(...elements)) : (console.group(elements[0].tagName + " Element:"), console.log(...elements));
            console.groupEnd();
        }
    }

    /**
     * * Adiciona um ou mais nomes de classe ao elemento alvo.
     * >
     * * Pode definir em qual posição os nomes de classe serão adiciondaos. Se n for definido os nomes serão adicionados ao final da lista de classe.
     * 
     * -----
     * 
     * @param {string|Array<string>} classNames Uma string que represente um nome de classe ou múltiplos nomes de classe separados por vírgula. Pode receber um Array com strings que representem nomes de classe.
     * @param {number} pos Um número que represente a posição (index) em que os nomes serão adicionados na lista de classe.
     */
    dom.addClass = function(classNames, pos){}


    return dom
}
