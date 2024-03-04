import __ from "../@/@internal.js";
import dom from "../modules/dom.js";
import { AUXCallbackSources } from "../@/@interfaces.js";

const one = document.getElementById('one')
const two = document.getElementById('two')
const chb = document.getElementById('ch-c')
const ch0 = document.getElementById('ch-0')

const o = {a: 'foo', b: 'bar', bla: true,num: 34}
const str = 'foo, bar'
const ar = ['foo', 'bar']
const boxes = ['.two', '.one']
const selectors = '.two, .one'
const childs = [...two.children]

const el = dom(selectors)

const html = "<div>STR</div> <!-- comentário --> <p>@</p>"
el.appendHTML(html, {
    amount: 5,
    handler(e, done) {
        if (e > 2) {
           this.root = 1 
        }

        
        done()
        this.position++
    }
})


const elems = [one, two]

var list = one.children
// function iterate(list, handler, idx=0) {
    
//     for (let i = 0; i >= 0; i++){
//         handler({item: list[i], i: i, list: list, root: elems[idx], idx:idx})
       
//         //Quando chegar ao fim da primeira interação resetar i e ir para proxima
//         if (i >= list.length - 1) {
//             idx++
//             i = -1
//         }

//         //
//         if (idx >= elems.length) {
//             console.log('Fim do loop')
//             break
//         }
        
//     }
// }
