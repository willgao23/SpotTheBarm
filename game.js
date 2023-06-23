var timeleft = 1000;
var notfound = true;
function start_countdown() {
    setInterval(function () {
        var countdown = document.getElementById("countdown");
        if (timeleft < 0) {
            //display game over screen
            alert("GAME OVER");
        }
        else {
            if (countdown) {
                countdown.innerHTML = (timeleft / 100).toString();
            }
            else {
                timeleft = 0;
            }
        }
        timeleft -= 1;
    }, 10);
}
function generate_new_pos(container) {
    if (container) {
        var h = container.clientHeight;
        var w = container.clientWidth;
        var new_h = Math.floor(Math.random() * h);
        var new_w = Math.floor(Math.random() * w);
        return [new_h, new_w];
    }
    else {
        return null;
    }
}
function animate_elem(elem) {
    var container = document.getElementById("container");
    var arr = generate_new_pos(container);
    var elem_pos = elem.getBoundingClientRect();
    var top = elem_pos.top;
    var left = elem_pos.left;
    var animate = setInterval(function () {
        if (arr) {
            if (top == arr[0] && left == arr[1]) {
                if (notfound) {
                    arr = generate_new_pos(container);
                }
                else {
                    clearInterval(animate);
                }
            }
            else if (top < arr[0] && left < arr[1]) {
                top += 1;
                left += 1;
            }
            else if (top > arr[0] && left > arr[1]) {
                top -= 1;
                left -= 1;
            }
            else if (top < arr[0]) {
                top += 1;
            }
            else if (top > arr[0]) {
                top -= 1;
            }
            else if (left < arr[1]) {
                left += 1;
            }
            else {
                left -= 1;
            }
            elem.style.top = top + 'px';
            elem.style.left = left + 'px';
        }
    }, 1);
}
function start_game() {
    var barm = document.getElementById("barm");
    if (barm) {
        animate_elem(barm);
    }
    start_countdown();
}
document.addEventListener("DOMContentLoaded", function () {
    start_game();
});
