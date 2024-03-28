import __ from "../@/internal/@utils.js";
import AUX from "../module/Aux-Main.js";

const one = document.getElementById("one");
const two = document.getElementById("two");
const tree = document.getElementById("tree");

const chb = document.getElementById("ch-c");
const ch0 = document.getElementById("ch-0");
const x0 = document.querySelector("#x-0");

const o = { a: "foo", b: "bar", bla: true, num: 34 };
const str = "foo, bar";
const ar = ["foo", "bar"];
const boxes = [".two", ".one"];
const selectors = ".two, .one";
const childs = [...two.children];

const my = AUX(".box");
const btn = AUX("#btn");
const bro = AUX("#btn, .two, #ch-0");

btn.appendChilds("#ch-0", ({item, get, is}) => {
    item.text("ttt")
    console.log(get)
})

