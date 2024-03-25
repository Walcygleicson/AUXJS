
/**
 * @typedef {Selector|ElementList} ElementReference
 */

/**
 * @typedef {string} Selector Uma *String* que representa um seletor *CSS* válido que aponte para um ou mais elementos existentes no *DOM*.
 */

// VALORES DA PROPRIEDADE SE ESTILO DISPLAY
/**
 * @typedef {"block" | "contents" | "flex" | "grid" | "inline" | "table" | "inline-flex" | "inline-block" | "flexbox" | "inline-flexbox" | "inline-table" | "list-item" | "none" | "run-in" | "flow-root" | "ruby" | "ruby-base" | "ruby-base-container" | "ruby-text" | "ruby-text-container" | "table-caption" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" | "table-row" | "table-row-group" | DefaultStyleValues} DisplayValue
 */

/**
 * @typedef {number|string|HTMLElement|null} PositionReference Uma referência de posição de um elemento HTML dentro de uma lista de elementos
 * 
 * @typedef {number|ElementList} elementListReference
 */

/**
 * @typedef {"unset" | "inherit" | "initial" | "calc()" | "var()"} DefaultStyleValues
 * 
 * @typedef {"none" | "solid" | "dashed" | "dotted" | "double"} StyleLines
 * 
 * 
 * @typedef {"red" | "green" | "blue" | "gray" | "white" | "yellow" | "black" | "orange" | "pink" | "purple" | "rgb()" | "rgba()" | "transparent" | "bisque" | "blueviolet" | "brown" | "lime" | "magenta" | "marron" | "chocolate" | "crimson" | "coral" | "cyan" | "deeppink" | "gold" | "oliv" | "orangered"} StyleColors
 * 
 * 
 * @typedef {"block" | "contents" | "flex" | "grid" | "inline" | "table" | "inline-flex" | "inline-block" | "flexbox" | "inline-flexbox" | "inline-table" | "list-item" | "none" | "run-in"} StyleDisplay
 * 
 * 
 * 
 * @typedef {"flex-start" | "flex-end" | "stretch" | "center" | "baseline" | "right" | "left" | "safe" | "start" | "end" | "unsafe"} StyleAlign
 * 
 * 
 * @typedef {"linear-gradient()" | "radial-gradient()" | "color()" | "rgb()" | "rgba()" | "url()"} StyleBackgroundFunc
 */

//attributesObject
/**
 * @typedef {{
 * id: string,
 * class: string,
 * type: string,
 * name: string,
 * placeholder: string,
 * required: boolean,
 * disabled: boolean,
 * value: (string | number),
 * checked: boolean,
 * selected: boolean,
 * lang: string,
 * style: string,
 * href: string,
 * target: string,
 * src: string,
 * label:string,
 * action: string,
 * alt: string,
 * title: string,
 * defer: boolean,
 * autocomplete: string,
 * content: string,
 * colspan: string,
 * method: string,
 * max: string | number,
 * maxlength: string | number,
 * open: boolean,
 * rows: string | number,
 * cols: string | number,
 * height: string,
 * pattern: string,
 * rel: string,
 * readonly: boolean,
 * scope: string,
 * scoped: boolean,
 * accept: string,
 * "accept-charset": string,
 * step: (string | number),
 * acceskey: string,
 * align: string,
 * async: boolean,
 * autofocus: boolean,
 * autoplay: boolean,
 * bgcolor: string,
 * border: string,
 * buffered: string,
 * charset: string,
 * cite: string,
 * code: string,
 * codebase: string,
 * color: string,
 * contenteditable: boolean,
 * constextmenu: string,
 * controls: boolean,
 * coords: string,
 * data: string,
 * datetime: string,
 * default_: boolean,
 * dir: string,
 * draggable: boolean,
 * dropzone: string,
 * enctype: string,
 * for: string,
 * from: string,
 * headers: string,
 * hidden: boolean,
 * high: string,
 * hreflang: string,
 * "http-equiv": string,
 * icon: string,
 * ismap: boolean,
 * itemprop: string,
 * list: string,
 * loop: boolean,
 * low: string,
 * manifest: string,
 * media: string,
 * multiple: boolean,
 * novalidate: boolean,
 * optimum: string,
 * ping: string,
 * poster: string,
 * preload: string,
 * radiogroup: string,
 * pubdate: boolean,
 * reversed: boolean,
 * rowspan: number,
 * sandbox: string,
 * seamless: boolean,
 * shape: string,
 * size: string,
 * sizes: string,
 * span: number,
 * srcdoc: string,
 * srclang: string,
 * start: number,
 * summary: string,
 * tabindex: number,
 * usemap: string,
 * wrap: string
 * width: string,
 * }} attributesObject Um objeto de definição de atributos de elementos HTML
 */

/**
 * @typedef {{
 * fontFamily: string,
 * fontStyle: "italic" | "normal" | "oblique" | DefaultStyleValues,
 * fontWeight: "bold" | "lighter" | "bolder" | "normal" | DefaultStyleValues,
 * fontSize: "large" | "larger" | "medium" | "small" | "smaller" | "x-large" | "x-small" | "xx-large" | "xx-small" | DefaultStyleValues,
 * textDecoration: StyleLines | "line-through" | "overline" | "underline" | "wavy" | DefaultStyleValues,
 * textAlign: "start" | "end" | "left" | "right" | "center" | "justify" | DefaultStyleValues,
 * textTransform: "capitalize" | "uppercase" | "lowercase" | "none" | DefaultStyleValues,
 * textIndent: DefaultStyleValues,
 * color: StyleColors | DefaultStyleValues,
 * font: DefaultStyleValues,
 * width: DefaultStyleValues | "auto" | "fit-content" | "max-content" | "min-content",
 * height: DefaultStyleValues | "auto" | "fit-content" | "max-content" | "min-content",
 * border:  StyleLines | "currentColor" | "dotted" | "goove" | "hidden" | "outset" | "ridge" | "transparent" | DefaultStyleValues,
 * backgroundColor: StyleColors | DefaultStyleValues,
 * margin: DefaultStyleValues | "auto",
 * padding: DefaultStyleValues | "auto",
 * float: "inline-end" | "inline-start" | "right" | "left" | "none" | DefaultStyleValues,
 * display: StyleDisplay | DefaultStyleValues,
 * position: "static" | "relative" | "absolute" | "fixed" | "sticky" | "-ms-page" | "-webkit-sticky" | DefaultStyleValues,
 * visibility: "visible" | "hidden" | "collapse" | DefaultStyleValues,
 * justifyContent: "space-between" | "space-around" | "space-evenly" |StyleAlign| DefaultStyleValues,
 * overflow: "scroll" | "auto" | "scroll" | "hidden" | DefaultStyleValues,
 * zIndex: DefaultStyleValues,
 * borderRadius: DefaultStyleValues,
 * boxShadow: "inset" | "none" | "transparent" | DefaultStyleValues,
 * opacity: DefaultStyleValues,
 * transform: "none" | "rotate()" | "perspective()" | "rotate3d()" | "translate()" | "translateX()" | "translateY()" | "scale()" | "scaleX()" | "scaleY()" | DefaultStyleValues,
 * alignItems: StyleAlign | DefaultStyleValues,
 * gap: DefaultStyleValues,
 * position: "static" | "relative" | "absolute" | "fixed" | "sticky" | DefaultStyleValues,
 * top: DefaultStyleValues,
 * right: DefaultStyleValues,
 * bottom: DefaultStyleValues,
 * left: DefaultStyleValues,
 * background: "fixed" | "local" | "none" | "scroll" | "center" | StyleBackgroundFunc | DefaultStyleValues,
 * backgroundAttachment: "fixed" | "local" | "scroll" | DefaultStyleValues,
 * backgroundImage: "none" | "url()",
 * backgroundPosition: "bottom" | "center" | "left" | "right" | "top" | DefaultStyleValues,
 * backgroundRepeat: "repeat" | "no-repeat" | "repeat-x" | "repeat-y" | "round" | "space" | DefaultStyleValues,
 * direction: "rtl" | "ltr" | DefaultStyleValues,
 * letterSpacing: DefaultStyleValues | "normal",
 * textShadow: "none" | DefaultStyleValues,
 * whiteSpace: "nowrap" | "pre" | "pre-wrap" | "pre-line" | DefaultStyleValues,
 * wordBreak: "break-all" | "keep-all" | "normal" | DefaultStyleValues,
 * lineHeight: DefaultStyleValues,
 * font: string | DefaultStyleValues,
 * fontSizeAdjust: string | "none" | DefaultStyleValues,
 * fontStretch: "condensed" | "expanded" | "extra-condensed" | "extra-expanded" | "ultra-condensed" | "ultra-expanded" | "normal" | "wider" | "narrower" | DefaultStyleValues,
 * fontVariant: "small-caps" | "normal" | DefaultStyleValues,
 * borderBottom: string | DefaultStyleValues,
 * borderLeft: string | DefaultStyleValues,
 * borderRight: string | DefaultStyleValues,
 * borderTop: string | DefaultStyleValues,
 * berderLeftColor: string | DefaultStyleValues,
 * berderRightColor: string | DefaultStyleValues,
 * borderStyle: string | DefaultStyleValues,
 * marginBottom: DefaultStyleValues,
 * marginLeft: DefaultStyleValues,
 * marginRight: DefaultStyleValues,
 * marginTop: DefaultStyleValues,
 * paddingBottom: DefaultStyleValues,
 * paddingLeft: DefaultStyleValues,
 * paddingRight: DefaultStyleValues,
 * paddingTop: DefaultStyleValues,
 * listStyle: "inside" | "outside" | "none" | DefaultStyleValues,
 * listStyleType: "none" | "disc" | "circle" | "square" | "decimal" | "zero" | "hebrew" | "armenian" | "georgian" | DefaultStyleValues,
 * listStyleImage: "none" | "url()" | DefaultStyleValues,
 * listStylePosition: "inside" | "outside" | DefaultStyleValues,
 * markerOffset: "auto" | DefaultStyleValues,
 * maxHeigth: DefaultStyleValues,
 * maxWidth: DefaultStyleValues,
 * minHeight: DefaultStyleValues,
 * minWidth: DefaultStyleValues,
 * clear: "both" | "left" | "none" | "right" | DefaultStyleValues,
 * cursor: "default" | "pointer" | "wait" | "text" | "move" | "help" | "not-allowed" | "progress" | DefaultStyleValues,
 * verticalAlign: "text-bottom" | "baseline" | "sub" | "super" | "text-top" | "middle" | "top" | DefaultStyleValues,
 * boxSizing: "content-box" | "border-box" | DefaultStyleValues,
 * content: string | DefaultStyleValues,
 * transition: DefaultStyleValues,
 * transitionDuration: DefaultStyleValues,
 * transitionProperty: DefaultStyleValues,
 * transitionDelay: DefaultStyleValues,
 * animation: DefaultStyleValues,
 * outline: "inherit" | "none"| DefaultStyleValues,
 * borderColor: DefaultStyleValues,
 * flexWrap: "nowrap" | "wrap" | "wrap-reverse" | DefaultStyleValues,
 * overflowY: "hidden" | "visible" | "scroll" | DefaultStyleValues,
 * overflowX: "hidden" | "visible" | "scroll" | DefaultStyleValues,
 * textOverflow: "clip" | "ellipsis" | DefaultStyleValues,
 * userSelect: "text" | "all" | "contain" | "manual" | "none" | DefaultStyleValues,
 * pointerEvents: "auto" | "painted" | "fill" | "stroke" | "visiblePainted" | "visibleFill" | "visibleStroke" | "none" | DefaultStyleValues,
 * fill: "currentColor" | DefaultStyleValues,
 * stroke: "currentColor" | DefaultStyleValues,
 * filter: DefaultStyleValues,
 * fontDisplay: "block" | "swap" | "fallback" | "optional" | DefaultStyleValues,
 * backgroundClip: "padding-box" | "content-box" | "border-box" | DefaultStyleValues,
 * transformOrigin: DefaultStyleValues | "bottom" | "center" | "right" | "left",
 * animationDuration: number | string | DefaultStyleValues,
 * animationIterationCount: number | string | DefaultStyleValues,
 * animationName: string | DefaultStyleValues,
 * animationPlayState: "paused" | "running" | DefaultStyleValues,
 * animationTimingFunction: string | DefaultStyleValues,
 * animationDelay: number | string | DefaultStyleValues,
 * animationRange: DefaultStyleValues,
 * src: DefaultStyleValues,
 * flex: DefaultStyleValues,
 * order: DefaultStyleValues,
 * flexGrow: number | DefaultStyleValues,
 * msFlexPositive: number | DefaultStyleValues,
 * flexShrink: number | DefaultStyleValues,
 * flexFit: "auto" | "grow" | "shrink" | "basis" | DefaultStyleValues,
 * alignSelf: "stretch" | "flex-start" | "center" | "flex-end" | "space-around" | "space-between" | "space-evenly" | DefaultStyleValues,
 * justifySelf: "flex-start" | "flex-end" | "center" | "stretch" | "space-around" | "space-between" | "space-evenly" | DefaultStyleValues,
 * placeItems: "center" | DefaultStyleValues,
 * alignContent: "start" | "end" | "stretch" | "space-between" | "space-around" | "space-evenly" | DefaultStyleValues,
 * }} StyleProperties
 */

/**
 * @typedef {Array<Selector|HTMLElement>|NodeList|HTMLCollection} ElementList Uma lista de elementos HTML e/ou Seletores válidos. Pode ser um Array, um Object, um NodeList ou um HTMLCollection.
 */

/**
 * @callback _CallbackFunction
 * @param {ElementTools} source 555
 * @param {Function} done 555555
 */
/////////////// ARGUMENTOS DE CONTROLE ////////////////////
/**
 * @typedef {"next" | "prev" | "all-next" | "all-prev" | "all" | 1 | 2 | 3 | 4 | 5 | -1 | -2 | -3 | -4 | -5 } SiblingKeys Argumentos chave de seleção de elementos próximos (irmãos) de um elemento alvo principal.
 */

/////////// INTERFACE ELEMENT TOOLS /////////////////////////

/**
 * @typedef {object} ElementTools Object de fun
 * @property {HTMLElement} item O elemento HTML alvo da operação atual.
 * @property {number} i O index do elemento HTML atual (item) na lista de elementos alvos da operação atual (elementos fornecido em **dom()**).
 * @property {GetterProperties} get Um Objeto que provém de propriedades somente leitura que fornecem informações sobre a operação atual e o elemento alvo.
 * @property {DOMDefinerMethods} def Um Objeto que provém métodos que podem ser aplicados sobre o elemento alvo da operação atual.
 */


////////////////// EVENT LISTENERS ////////////////////////////////////
/**
 * @typedef {"click" | "load" | "unload" | "submit" | "reset" | "blur" | "change" | "dblclick" | "focus" | "mousedown" | "mouseup" | "mousemove" | "mouseout" | "mouseover" | "keydown" | "keypress" | "keyup" | "mouseleave" | "mouseenter" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "auxclick" | "beforeinput" | "beforematch" | "beforescriptexecute" | "beforexrselect" | "compositionend" | "compositionstart" | "compositionupdate" | "contextmenu" | "copy" | "cut" | "focusin" | "focusout" | "fullscreenchange" | "fullscreenerror" | "gotpointercapture" | "input" | "lostpointercapture" | "paste" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "scroll" | "scrollend" | "rezise" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "weel" | "beforeunload" | "afterprint" | "appinstalled" | "beforeprint" | "error" | "devicemotion" | "deviceorientation" | "deviceorientationabsolute" | "gamepadconnected" | "gamepaddisconnected" | "haschange" | "languagechange" | "message" | "messageerror" | "online" | "offline" | "pagehide" | "pageshow" | "popstate" | "storage" | "playing" | "abort" | "canplay" | "canplaythrough" | "durationchange" | "emptied" | "encrypted" | "ended" | "loadeddata" | "loadedmetadata" | "loadstart" | "pause" | "play" | "progress" | "ratechange" | "seeked" | "seeking" | "stalled" | "suspend" | "timeupdate" | "volumechange" | "waiting" | "beforetoggle" | "cancel" | "drag" | "dragend" | "dragenter" | "dragleave" | "dragover" | "dragstart" | "drop" | "toggle" | "invalid" | "select"} EventType
 *
 * 
 * @typedef {{
 * click: Function, load:Function, unload: Function, submit: Function, reset: Function,blur: Function, change: Function, dblClick: Function, focus: Function, mouseDown: Function,mouseUp: Function, mouseMove: Function, mouseOut: Function, mouseOver: Function, keyDown: Function, keyPress: Function, keyUp: Function, mouseLeave: Function, mouseEnter: Function, animationCancel: Function, animationEnd: Function, animationIteration: Function, animationStart: Function, auxClick: Function, beforeInput: Function, 
 * }} EventListeners
 * 
 * 
 * @typedef {object} EventOptions
 * @property {boolean} [capture] - Indica se o evento será capturado ou não.
 * @property {boolean} [once] - Um valor booleano que indica que os ouvintes devem ser invocados no máximo uma vez após ser adicionado.
 * @property {boolean} [passive] - Um valor booleano que, se true, indica que a função/método especificada para o ouvinte nunca chamará *`preventDefault()`*.
 * @property {AbortSignal} [signal] - Um *`AbortSignal`*. O souvintes serão removidos quando o método *`AbortSignal`* do objeto fornecido *`abort()`* for chamado.
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
