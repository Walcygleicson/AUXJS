import __ from "../@/@internal.js";

import { AUXCallbackSources } from "../@/@interfaces.js";
import AUX from "../modules/Aux-Main.js";


const one = document.getElementById('one')
const two = document.getElementById('two')
const tree = document.getElementById('tree')

const chb = document.getElementById('ch-c')
const ch0 = document.getElementById('ch-0')
const x0 = document.querySelector('#x-0')

const o = {a: 'foo', b: 'bar', bla: true,num: 34}
const str = 'foo, bar'
const ar = ['foo', 'bar']
const boxes = ['.two', '.one']
const selectors = '.two, .one'
const childs = [...two.children]

const my = AUX(".box")
const btn =  AUX('#btn')




// btn.on('click', (e, i, o) => {
//     console.log(e, i)
//     my.forms((e) => {
//         //console.log(e);
//     })
// })






// teste(btn.elements[0], 'click', () => {
//     console.log('click')
// }, 4)



//btn.on('click', evt, { removeStack: true })
//btn.on("click", ()=>{}, { removeStack: 'clickEvt' });



