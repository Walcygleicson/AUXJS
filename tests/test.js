


function shake(target, options = {
    duration: 500,
    distance: 1,
    speed: 10
}) {
    options = {
        duration: options.duration ?? 500,
        distance: options.distance ?? 1,
        speed: options.speed ?? 10
    }
    console.log(options)
    
    let shakePos = 0
    let interval
    let tranform = getComputedStyle(target).transform;
    //target.style.transition = ".1s"
    interval = setInterval(() => {
        let vec = shakePos > 0.5 ? "X" : "Y"
        shakePos = Math.random() * (options.distance - 0) + 0;
        
        target.style.transform = "translate" + vec + "(" + shakePos + "px)"
        // Escolher número aleatorio entre 0 e 1
        
        
    }, options.speed)
    
    setTimeout(() => {
        clearInterval(interval)
        if (tranform === 'none') {
            target.style.removeProperty('transform')
        }
    }, options.duration)
}
const htm = document.documentElement
//shake(one, {distance: 2,duration: 5000})





