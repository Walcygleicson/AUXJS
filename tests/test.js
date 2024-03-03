/**
 * @function Lib
 */

(function () {
    function a() {
        return {
            add() {
                console.log("ADD");
            },
        };
    }

   
    globalThis.LIB = a()
})();