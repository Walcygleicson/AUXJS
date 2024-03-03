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
    position: 0,
    root: 2,
    handler(e, done) {
        this.position++
        done()
    }
}) 



