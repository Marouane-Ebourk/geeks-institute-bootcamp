document.querySelector("button").onclick = function() {
    let element = document.getElementById("animate");
    let container = document.getElementById("container");
    let pos = 0;
    let maxRight = container.offsetWidth - element.offsetWidth;
    element.style.position = "relative";
    let id = setInterval(frame, 1);
    function frame() {
        if (pos >= maxRight) {
            clearInterval(id);
        } else {
            pos++;
            element.style.left = pos + "px";
        }
    }
};