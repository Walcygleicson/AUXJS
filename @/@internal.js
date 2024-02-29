

/**
 * @private
 */
const __ = {}

//Armazena valores temporários que podem ser sobreescritos //Evitar criar muitas variáveis
var x = {
    temp: null,
    type: null,
    _box: [], //Armazena valores temporários
    /**Ezvazia a propriedade _box */
    resetBox() {
        if (this._box.length > 0) {
            this._box = []
        }
    },

    /**Adiciona valores a propriedade temporário _box. lembrar de resetar propriedade sempre que n for mais usada*/
    box(value = this._box) {
        if (value != this._box) {
            if (['array', 'nodeList', 'HTMLCollection'].includes(__.type(value))) {
                this._box.push(...value)
            } else {
                this._box.push(value)
            }
        }

        return this._box
    }
}


/**
 * Retorna o tipo real de um objeto 
 * @returns {string} 
 */
__.type = function (obj) {
    
    obj = Object.prototype.toString.call(obj).slice(8, -1);

    obj.includes("HTML") && obj.includes("Element")
        ? (obj = "HTMLElement")
        : null;

    if (obj[0] === obj[0].toUpperCase() && obj[1] !== obj[1].toUpperCase()) {
        obj = obj.charAt(0).toLowerCase() + obj.slice(1);
    }

    return obj;
}

/**
 * Retorna apenas os HTMLElement de um nodeList excluindo os nós de Text e Comment 
 */
__.filterNodeList = function (list) {
    if (__.type(list) == "nodeList") {
        return [...list].filter((e) => {
            if (__.type(e) == "HTMLElement") {
                return e;
            }
        });
    } else {
        return list;
    }
}
////////////////////////////////////////////

/**
 * Extrai elementos e os retona em um array
 * @param {elementRef} els Qualquer referência a um elemento
 * @param {errorRef} err Objecto que trata o erro da função principal
 * @param {number} param O parâmetro do erro
 */
__.ex = function (els, err, param) {
    //Jogar string dentro de array
    __.type(els) == 'string' ? els = [els] : null

    x.type = __.type(els)


    //Para elemento único
    if (x.type == 'HTMLElement') {
        return [els]
    
    //Para elementList
    } else if (['nodeList', 'HTMLCollection'].includes(x.type)) {
        return [...__.filterNodeList(els)]

    //Para array e object
    } else if (['array', 'object'].includes(x.type)) {
        els = x.type == 'object' ? Object.values(els) : els

        x.resetBox()

        //Extrair elementos de array ou object
        els.forEach((e) => {
            x.type = __.type(e)
            if (x.type == 'HTMLElement') {
                x.box(e)

            //Obter elemento pelo seletor
            } else if (x.type == 'string') {
                x.temp = [...document.querySelectorAll(e)]
                //Verificar se elemento foi econtrado com o seletor atual
                if (x.temp.length <= 0) {
                    console.warn('Nenhum elemento encontrado com o seletor ', e)
                } else {
                    x.box(x.temp)
                }
            }
        })

        els = x.box()

        //Resetar propriedades temporárias
        x.resetBox()
        x.temp = null
        x.type = null
        return [...new Set(els)]
    }

}

/////////////////////////////////////////////////////

/**
 * Espalha valores em um array e o retorna
 */
__.arr = function (obj) {

    //Para valores tipo primitivo
    if (!["array", "object", "nodeList", "HTMLCollection"].includes(__.type(obj))) {
        return [obj];
    
    //Para listas
    } else if (["array", "nodeList", "HTMLCollection"].includes(__.type(obj))) {
        return [...obj];
    
    //Para objects
    } else if (__.type(x) == "object") {
        return Object.values(obj)
    }
}




export default __
