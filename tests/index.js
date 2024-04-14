import __ from "../@/internal/@utils.js";
import AUX from "../module/Aux-Main.js";
import { __ as config } from "../@/config/@config.js";
import { ItemGetters } from "../@/internal/@interfaces.js";




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
const child = AUX("#ch-a")


btn.mouseHold((e)=>{console.log(e)}, {delay: 2, max: 5, button: "any"})