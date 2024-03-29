

/**
 * @private
 */
const __ = {}

//Armazena valores temporários que podem ser sobreescritos ou deletados //Evitar criar muitas variáveis
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
            if (value instanceof Array
                || value instanceof NodeList
                || value instanceof HTMLCollection) {
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
    if (list instanceof NodeList) {
        return [...list].filter((e) => {
            if (e instanceof HTMLElement) {
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
__.ex = function (els, err, param=1) {
    //Jogar string dentro de array
    __.type(els) == 'string' ? els = [els] : null

    x.type = __.type(els)


    //Para elemento único
    if (els instanceof HTMLElement) {
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
            if (e instanceof HTMLElement) {
                x.box(e)

            //Obter elemento pelo seletor
            } else {


                //Testar erro de DOMExeption seletor inválido
                err.invalidSelector(() => {
                    x.temp = [...document.querySelectorAll(e)]  
                }, e, param)


                //Verificar se elemento foi econtrado com o seletor atual
                if (x.temp.length <= 0 && err) {
                    err.notFound(null, e, param)
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
 * Espalha valores em um array e o retorna.
 * @param {boolean} commaSplit Se true separa uma string por vígula e retorna as partes em array.
 */
__.arr = function (obj, commaSplit=false ) {

    //Para valores tipo primitivo
    if (!["array", "object", "nodeList", "HTMLCollection"].includes(__.type(obj))) {
        if (__.type(obj) == 'string' && commaSplit) {
            return obj.split(/\s*,\s*/g);
        }
        return [obj];
    
    //Para listas
    } else if (["array", "nodeList", "HTMLCollection"].includes(__.type(obj))) {
        return [...obj];
    
    //Para objects
    } else if (__.type(x) == "object") {
        return Object.values(obj)
    }
}

///////////////////////////////////////////////

/**
 * Trata e lança erros de uma função.
 *  @param {Function} thisName O nome da função
 */
__.err = function (thisName) {
    !thisName? thisName = 'function?' : null
    var fn = {}

    //////////////////////////////////////////
    var arg = {
        list: [],
        len: 0,
        requiredLen: null,
        fn: thisName
    }
    ///////////////// métodos ///////////////


    /**
     * * Obtém informações do parâmetro para tratamento dos erros.
     * 
     * @param {argument} argValue O valor passado como argumento do parametro
     * @param {"string" | "function" | "array" | "number" | "object" | "HTMLElement" | "HTMLCollection" | "comment" | "text" | "nodeList" | "document" | "null" | "undefined" | "elementList" | "HTMLSelector" | "bigInt" | "symbol" | "number, string" | "function, null" | "number, string, array" | "array, object"} types Uma strig que representa um tipo de valor que o parametro deve receber, múltiplos tipos devem ser separados por vírgula
     * @param {boolean} required Define se o parametro é obrigatório. O padrão é **true**.
     */
    fn.to = function (argValue, types, required = true) {
        types = __.arr(types, true)
        arg.len++
        required? arg.requiredLen++ : null

        x.infos = {
            value: argValue,
            types: types,
            required: required,
            subTypes: null,
            passedType: __.type(argValue),
            param: arg.list.length + 1
        }

        //Tratar types e subTypes
        if (types.includes('HTMLSelector') || types.includes('elementList')) {
            x.infos.types = types.join(',')
                .replaceAll('HTMLSelector', 'string')
                .replaceAll('elementList', 'array,object,nodeList,HTMLCollection')
                .split(',')
            
            x.infos.types = [... new Set(x.infos.types)]
            x.infos.subTypes = types
        }

        arg.list.push(x.infos)
        delete x.infos
        return this
    }
    //-------------->

    /**
     * Testa os erros dos parâmetros passados e se houver, monta e lança o erro no terminal.
     */
    fn.done = function () {
        
        arg.list.forEach((e) => {
            try {
                //Testar erro de parâmetro obrigatório
                if (e.value === undefined && e.required) {
                    ERR.mount({
                        errMsg: 'required',
                        errTarget: e,
                        errArg: arg,
                        errName: 'Parâmetro Obrigatório',
                    })
                }

                //Testar erro de tipo
                if (!e.types.includes(e.passedType)) {
                    ERR.mount({
                        errMsg: 'type',
                        errTarget: e,
                        errArg: arg,
                        errName: "Tipo Inválido",
                        
                    })
                }
                
            } catch (err) {
                ERR.launch(err)
            }
        })

    }
    //------------------>


     /**
     * * Lança um erro se o value analizado for um array ou object vazio.
     * 
     * @param {*} value O valor a ser analisado
     * @param {number} param O objeto de informações do parametro alvo.
     */
    fn.isVoid = function (value, param=1) {
        value = __.arr(value)
        try {

            if (value.length <= 0) {
                
                ERR.mount({
                    errMsg: 'void',
                    errName: 'Objeto Vazio',
                    errTarget: arg.list[param - 1],
                    errArg: arg,
                    errValue: value
                })
            }

        } catch (err) {
            ERR.launch(err)
        }
        return this
    }
    //--------------------->

    /**
     * * Lança um erro se um elemento não for encontrado usando um seletor especificado
     * 
     * @param {*} value O resultado da busca do elemento
     * @param {string} selector O seletor usado
     * @param {number} param O parametro
     * @returns 
     */
    fn.notFound = function (value, selector, param=1) {
        console.log(arg)
        try {

            if (!value) {
                ERR.mount({
                    errValue: selector,
                    errMsg: 'notFound',
                    errArg: arg,
                    errTarget: arg.list[param - 1],
                    errName: 'Elemento Não Encontrado'
                })
            }

        } catch (err) {
            ERR.launch(err)
        }

        return this
    }


    /**
     * * Testa uma instrução de busca de elemento. Se houver um DOMExecption o erro é tratado e disparado.
     * 
     * @param {Function} handlerExeption Uma função que deve conter o bloco de código que possui um possível erro
     * @param {string} selector O seletor usado
     * @param {number} param O parametro 
     * @returns 
     */
    fn.invalidSelector = function (handlerExeption, selector, param=1) {
        try {
            handlerExeption()
        } catch (_) {
            try {
                ERR.mount({
                    errValue: selector,
                    errMsg: "invalidSelector",
                    errArg: arg,
                    errTarget: arg.list[param - 1],
                    errName: "Seletor Inválido",
                });

            } catch (err) {
                ERR.launch(err)
            }
        }

        return this
    }


    /**
     * * Lança um erro se uma função done() não for executada
     * @param {boolean} done Se **true** o erro é lançado
     * @param {number} param O parametro do erro
     */
    fn.notDone = function (done = false, param = 1) {
        try {
            if (!done) {
                ERR.mount({
                    errMsg: 'notDone',
                    errArg: arg,
                    errName: 'Operação Esperada',
                    errTarget: arg.list[param - 1]
                })
            }
        } catch (err) {
            ERR.launch(err)
        }

        return this
    }


    /**
     * * Verifica se o objecto passado condiz com o objeto esperado como suas propriedades e tipos de valores. Lança um erro se o objeto houver uma propriedade não esperada ou tipo de valor não esperado
     * 
     * @param {object} expect Um objeto com as propriedades e tipos de valores que o objeto principal deve possuir
     * @param {object} obj O objeto principal
     * @param {number} param 
     * @returns 
     */
    fn.expectObj = function (obj, expect, param = 1) {
        x.hasErr = false //Indica se o erro deve ser lançado
        Object.keys(obj).forEach((prop) => {
            //Verificar se propriedade passada é esperada
            if (Object.hasOwn(expect, prop)) {
                x.typeList = expect[prop].split(/\s*,\s*/g)
                //Verificar se tipo de valor é esperado
                if (!x.typeList.includes(__.type(obj[prop])) && !x.typeList.includes('any')) {
                    x.hasErr = true
                    x.errName = 'Tipo Inválido' 
                }

            } else {
                x.typeList = null
                x.hasErr = true
                x.errName = 'Propriedade Inesperada'
                x.propList = Object.keys(expect).map((k) => {
                    return '\t' + k + ': [' + expect[k].split(',').join(' | ') + ']'
                }).join(',\n')
                
            }

            //Testar erro
            try {

                if (x.hasErr) {
                    
                    ERR.mount({
                        errMsg: "expectObj",
                        errName: x.errName,
                        errArg: arg,
                        errTarget: arg.list[param - 1],
                        errValue: prop,
                        other: x.typeList || x.propList
                    });
                }

            } catch (err) {
                ERR.launch(err)
            }
        

        })


        return this
    }

    return fn
}


//////////////////////////////
/**
 * * Buspa por um elemento em uma lista através do índice, seletor ou o proprio elemento como referência e retorna este elemento se for econtrado. Se a referencia passado não econtrar o elemento na lista o retorno é null
 * 
 * @param {number|string|HTMLElement} ref Uma referencia do elemento na lista. Pode ser sua posição (index), seletor ou o elemento 
 * @param {Array<HTMLElement>} list A lista de elementos para a busca
 * @param {boolean} getIndex Se true o retorno é o índice do elemento na lista
 */
__.indexRef = function (ref, list, getIndex = false) {
    delete x.nodeRef
    switch (__.type(ref)) {
        case "number":
            x.nodeRef = list[ref] || null;
            break;
        case "string":
            
            //Verificar se algum elemento da lista é selecionável com o seletor passado
            x.nodeRef = list.filter((e) => {
                return e.matches(ref)? e : null
            })[0] || null

            break;
        case "HTMLElement":
            //Verificar se a referência passada existe na lista
            x.nodeRef = list.includes(ref) ? ref : null;
    }

    if (getIndex) {
        return list.indexOf(x.nodeRef) < 0? null : list.indexOf(x.nodeRef)
    }

    return x.nodeRef
}

/**
 * Executa uma função para cada elemento obtido de uma lista de elementos através de uma referencia de posição ou seletor
 * @param {*} refs 
 * @param {Array<HTMLElement>} list 
 */
__.getElementsOfList = function (refs, list) {
    refs = this.arr(refs)
    x.elements = []
    for (let i = 0; i < refs.length; i++){
        x.ref = refs[i]
        switch (__.type(x.ref)) {
            case "number":
                x.elements.push(list[x.ref])
                break;
            case "string":
                //Verificar se algum elemento da lista é selecionável com o seletor passado
                x.elements.push(...list.filter((e) => {
                    if (e.matches(x.ref)) {return e}
                    }))
                    
                break;
            case "HTMLElement":
                //Verificar se a referência passada existe na lista
                if (list.includes(x.ref)) {
                    x.elements.push(x.ref) 
                }
        }
            
    }
    x.elements = [...new Set(x.elements)]

    delete x.ref
    return x.elements
}


__.strHTML = function (str) {
    x.capsule = document.createElement('div')
    x.capsule.innerHTML = str
    str = document.createDocumentFragment()
    str.append(...x.capsule.childNodes)
    x.capsule.innerHTML = ''
    
    delete x.capsule
    return str
}

/**Cria um novo array com os resultados do retorno de um loop */
__.mapLoop = function (amount, handler) {
    var arr = []
    for(let i = 0; i < amount; i++){
        arr.push(handler(i, amount))
    }
    return arr
}

//Função que captaliza uma string
__.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}



//-----> Auxilar de __.err <----------
const ERR = {
    /**
     * * Recebe as informações necessárias para montar o corpo da mensagem de erro.
     * * Depois de montada a mensagem e outras informações são enviadas como JSON para o bloco catch por meio do parametro de erro
     * 
     * @param {object} param0 Destructuting object
     * @param {string} param0.errName O nome do erro
     * @param {string} param0.errMsg O nome da mensagem
     * @param {Object} param0.errTarget Objecto de informações do argumento atual "arg.list.{}"
     * @param {*} errValue
     * @param {*} other Outros valores
     * @param {object} param0.errArg O objeto que armazena a quantidade de paraemtro e quantidade obrigatória de parametros
     */
    mount({ errName, errMsg, errArg={}, errTarget, errValue, other}) {
        //Enviar mensagem de erro e detalhes por catch err param
        x.joinTypes = errTarget.types.join(' | ')
        x.joinSubTypes = errTarget.subTypes ? errTarget.subTypes.join(' | ') : null
        throw new Error(
            JSON.stringify({
                name: errName, //Nome do erro
                fn: errArg.fn, //Nome da função
                param: errTarget.param,
                message: {// Corpo das mensagens de erro

                    //Erro de parametro obrigatorio
                    required: `O parâmetro é obrigatório! Recebe ${errArg.len} argumentos e ${errArg.requiredLen} são obrigatórios`,

                    //Erro de tipo de argumento
                    type: `O tipo "${errTarget.passedType}" é inválido! Esperado os tipos [${x.joinSubTypes || x.joinTypes}] ${(function () {
                    //Extende a mensagem caso haja os tipos HTMSelector e elementList
                            if (errTarget.subTypes) {
                                return `${
                                    errTarget.subTypes.includes("HTMLSelector")
                                        ? ".\n\n🛈 Um tipo HTMLSelector é uma string que representa um seletor CSS válido"
                                        : ""
                                }${
                                    errTarget.subTypes.includes("elementList")
                                        ? ".\n\n🛈 Um tipo elementList é um array ou um object cujo seus valores devem ser somente elementos HTML ou seletores válidos"
                                        : ""
                                }`;
                            }
                            return "";
                    })()}`,
                    
                    //Erro de objeto vazio
                    void: `Tipos Array ou Object devem conter pelo menos um valor`,

                    //Erro elemento não encontrado
                    notFound: `Nenhum elemento encontrado com o seletor "${errValue}"! Verifique se o seletor está correto ou se o elemento existe no DOM`,

                    //Erro de seletor inválido
                    invalidSelector: `Erro de busca no DOM! O seletor "${errValue}" é inválido`,

                    //Erro de parametro done() não executado.
                    notDone: `Esperado que a função done() passada como o segundo parâmetro de uma callback function seja executada ao menos uma vez!`,

                    //Erro de propriedade não esperada ou tipo de valor não esperado
                    expectObj: (function () {
                        if (errName == 'Tipo Inválido') {
                            other = __.type(other) == 'array'? other.join(' | ') : null
                            return `A propriedade "${errValue}" espera receber os seguintes tipos de valores: [${other}]`
                        } else {
                            return `"${errValue}" propriedade não esperada! O objeto destino espera receber apenas as seguintes opções de propriedades:\n\n{\n${other}\n}`
                        }
                    })(),

                }[errMsg],
            })
        );
    },


    /**
     * * Responsável por obter as informaçoes enviadas pelo parametro de erro, montar o cabeçalho de erro e lançar o erro.
     * @param {errorParam} err Recebe o parametro de erro do bloco catch
     */
    launch(err) {
        x.stack = err.stack.split("at").pop(); //Pegar ultima pilha
    
        err = JSON.parse(err.message)
        //Cabeçalho do erro
        x.headMsg = `ERROR! (${err.name})\n ▶ ${x.stack.split("/").pop()}\n ▶${x.stack}\n\n⚠️ ${err.fn}(Parâmetro ${err.param}):\n\n`;

        //Lançar mensagem de erro montada
        throw x.headMsg + err.message + ".\n ";
    },


   
};



export default __
