import __ from "../@/@internal.js";
import dom from "../modules/dom.js";

const one = document.getElementById('one')
const two = document.getElementById('two')

const o = {a: 'foo', b: 'bar', bla: true,num: 34}
const str = 'foo, bar'
const ar = ['foo', 'bar']

const el = dom('.two, .one')

el.addClass('caty')
.appendChilds('#tree > div', '#ch-c')




el.console()
