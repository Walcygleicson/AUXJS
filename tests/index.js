import __ from "../@/@internal.js";
import dom from "../modules/dom.js";
import { AUXCallbackSources } from "../@/@interfaces.js";

const one = document.getElementById('one')
const two = document.getElementById('two')
const chb = document.getElementById('ch-c')

const o = {a: 'foo', b: 'bar', bla: true,num: 34}
const str = 'foo, bar'
const ar = ['foo', 'bar']
const boxes = ['.two', '.one']
const selectors = '.two, .one'

const el = dom(selectors)
var cont = 0
el.appendChilds('#tree > div', {
    position: true,
    handler(e, done) {
        cont++
        if (cont == 1) {
            done()
        }

        if (cont == 2) {
            done()
            
        } else if(cont == 3){done()}
}}) 



