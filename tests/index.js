import __ from "../@/internal/@utils.js";
import AUX from "../module/Aux-Main.js";

const one = document.getElementById("one");
const two = document.getElementById("two");
const tree = document.getElementById("tree");

const chb = document.getElementById("ch-c");
const ch0 = document.getElementById("ch-0");
const ch1 = document.querySelectorAll(".one-child")[1]
const x0 = document.querySelector("#x-0");
const created = document.createElement("input")
created.type = "checkbox"
const fakeParent = document.createElement('div')
//fakeParent.appendChild(created)

const o = { a: "foo", b: "bar", bla: true, num: 34 };
const str = "foo, bar";
const ar = ["foo", "bar"];
const boxes = [".two", ".one"];
const selectors = ".two, .one";
const childs = [...two.children];
const html = "<input type='checkbox'> <p>Oi</p>"
const my = AUX(".box");
const btn = AUX("#btn");
const bro = AUX("#btn, .two, #ch-0");
const um = AUX(one)
const inpt = AUX("input[name='nome']")
const dois = AUX(two)
const A = AUX("#ch-a > div")
let cont = 0
function hand(e, ev, i) {
   console.log(e)
}


my.exchange(created).








