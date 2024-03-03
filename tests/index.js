import __ from "../@/@internal.js";
import dom from "../modules/dom.js";
import { AUXCallbackSources } from "../@/@interfaces.js";

const one = document.getElementById('one')
const two = document.getElementById('two')
const chb = document.getElementById('ch-b')

const o = {a: 'foo', b: 'bar', bla: true,num: 34}
const str = 'foo, bar'
const ar = ['foo', 'bar']
const boxes = ['.two', '.one']
const selectors = '.two, .one'

const el = dom(selectors)

el.addClass('caty')
    .appendChilds('#tree > div',)

console.log(new AUXCallbackSources('dom', {
    item: 'Hello'
}))


