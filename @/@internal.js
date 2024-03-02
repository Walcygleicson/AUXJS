

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
     * @param {string} types Uma strig que representa um tipo de valor que o parametro deve receber, múltiplos tipos devem ser separados por vírgula
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

    return fn
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
                    invalidSelector: `Erro de busca no DOM! O seletor "${errValue}" é inválido`
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
