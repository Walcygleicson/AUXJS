import"../internal/@interfaces.js"
import { AUXProperties } from "../internal/@interfaces.js";



/**
 * @typedef {string} Selector Uma *String* que representa um seletor *CSS* válido que aponte para um ou mais elementos existentes no *DOM*.
 */

//////////// CSSDisplayValue ///////////////////////////
/**
 * @typedef {"block" | "contents" | "flex" | "grid" | "inline" | "table" | "inline-flex" | "inline-block" | "flexbox" | "inline-flexbox" | "inline-table" | "list-item" | "none" | "run-in" | "flow-root" | "ruby" | "ruby-base" | "ruby-base-container" | "ruby-text" | "ruby-text-container" | "table-caption" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" | "table-row" | "table-row-group" | DefaultStyleValues} CSSDisplayValue
 */

/**
 * @typedef {number|string|HTMLElement|null} PositionReference Uma referência de posição de um elemento HTML dentro de uma lista de elementos
 * 

/////////////////// SELEÇÃO DE ELEMENTOS ////////////////////////////////
/**
 * @typedef {number | string | HTMLElement | Array<number|string|HTMLElement> | NodeList | HTMLAllCollection} ChildReference
 * 
 * @typedef {string | HTMLElement | Array<number|string|HTMLElement> | NodeList | HTMLAllCollection } ElementSelector
 */

////////////////////// UNIDADE DE MEDIDA CSS ///////////////////////
/**
 * @typedef {"cm" | "mm" | "in" | "pc" | "pt" | "px" | "em" | "ex" | "ch" | "rem" | "lh" | "rlh" | "vw" | "vh" | "vmin" | "vmax" | "vb" | "vi" | "svw" | "svh" | "lvw" | "lvh" | "dvw" | "dvh" | "%" | "cap" | "fr" | "cqb" | "cqh" | "cqi" | "cqmax" | "cqmin" | "rex" | "ic" | "q"} CSSUnit
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

/////////// AttributesObject //////////////
/**
 * @typedef {"button" | "checkbox" | "color" | "date" | "datetime"  | "datetime-local" | "email"  | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"} TypeAttrValues
 * 
 * @typedef {{
 * id: string,
 * class: string,
 * type: TypeAttrValues,
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
 * target:  "_blank" | "_parent" | "_self" | "_top",
 * src: string,
 * label: string,
 * action: string,
 * alt: string,
 * title: string,
 * defer: boolean,
 * autocomplete: string,
 * content: string,
 * colspan: string,
 * method: "dialog" | "get" | "post",
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
 * }} AttributesObject Um objeto de definição de atributos de elementos HTML
 */

///////////////// StyleProperties /////////////
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

///////// HANLDER FUNCTIONS ////////////

/**
 * @callback HandlerFunction
 * @param {AUXProperties} source
 * 
 * @callback EventHandlerFunction
 * @param {AUXProperties} source
 * @param {PointerEvent | MouseEvent | KeyboardEvent} event
 */
/////////////// ARGUMENTOS DE CONTROLE ////////////////////
/**
 * @typedef {"next" | "prev" | "all-next" | "all-prev" | "all" | 1 | 2 | 3 | 4 | 5 | -1 | -2 | -3 | -4 | -5 } SiblingKeys Argumentos chave de seleção de elementos próximos (irmãos) de um elemento alvo principal.
 */



///////////// INTERFACE FORMS //////////
/**
 * @callback FormHandlerFunction
 * @param {object} form
 * @param {{form: HTMLElement, formList: Array<HTMLElement>}} details
 */


////////////////// EVENT LISTENERS ////////////////////////////////////
/**
 * @typedef {"click" | "load" | "unload" | "submit" | "reset" | "blur" | "change" | "dblclick" | "focus" | "mousedown" | "mouseup" | "mousemove" | "mouseout" | "mouseover" | "keydown" | "keypress" | "keyup" | "mouseleave" | "mouseenter" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "auxclick" | "beforeinput" | "beforematch" | "beforescriptexecute" | "beforexrselect" | "compositionend" | "compositionstart" | "compositionupdate" | "contextmenu" | "copy" | "cut" | "focusin" | "focusout" | "fullscreenchange" | "fullscreenerror" | "gotpointercapture" | "input" | "lostpointercapture" | "paste" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "scroll" | "scrollend" | "rezise" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "weel" | "beforeunload" | "afterprint" | "appinstalled" | "beforeprint" | "error" | "devicemotion" | "deviceorientation" | "deviceorientationabsolute" | "gamepadconnected" | "gamepaddisconnected" | "haschange" | "languagechange" | "message" | "messageerror" | "online" | "offline" | "pagehide" | "pageshow" | "popstate" | "storage" | "playing" | "abort" | "canplay" | "canplaythrough" | "durationchange" | "emptied" | "encrypted" | "ended" | "loadeddata" | "loadedmetadata" | "loadstart" | "pause" | "play" | "progress" | "ratechange" | "seeked" | "seeking" | "stalled" | "suspend" | "timeupdate" | "volumechange" | "waiting" | "beforetoggle" | "cancel" | "drag" | "dragend" | "dragenter" | "dragleave" | "dragover" | "dragstart" | "drop" | "toggle" | "invalid" | "select"} EventType
 *
 * 
 * @typedef {{
 * click: EventHandlerFunction, load:EventHandlerFunction, unload: EventHandlerFunction, submit: EventHandlerFunction, reset: EventHandlerFunction,blur: EventHandlerFunction, change: EventHandlerFunction, dblClick: EventHandlerFunction, focus: EventHandlerFunction, mouseDown: EventHandlerFunction,mouseUp: Function, mouseMove: Function, mouseOut: Function, mouseOver: Function, keyDown: Function, keyPress: EventHandlerFunction, keyUp: EventHandlerFunction, mouseLeave: EventHandlerFunction, mouseEnter: EventHandlerFunction, animationCancel: EventHandlerFunction, animationEnd: EventHandlerFunction, animationIteration: EventHandlerFunction, animationStart: EventHandlerFunction, auxClick: EventHandlerFunction, beforeInput: EventHandlerFunction, 
 * }} EventListeners
 * 
 * 
 * @typedef {object} EventOptions
 * @property {boolean} [capture] - Indica se o evento será capturado ou não.
 * @property {boolean} [once] - Um valor booleano que indica que os ouvintes devem ser invocados no máximo uma vez após ser adicionado.
 * @property {boolean} [passive] - Um valor booleano que, se true, indica que a função/método especificada para o ouvinte nunca chamará *`preventDefault()`*.
 * @property {AbortSignal} [signal] - Um *`AbortSignal`*. O souvintes serão removidos quando o método *`AbortSignal`* do objeto fornecido *`abort()`* for chamado.
 */
