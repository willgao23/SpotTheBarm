var timeleft = 1000;
var notfound = true;
var score = 0;
function init_countdown() {
    setInterval(function () {
        var countdown = document.getElementById("countdown");
        if (timeleft < 0) {
            //TODO: display game over screen
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
function init_score() {
    var counter = document.getElementById("score");
    if (counter) {
        counter.innerHTML = "Score: " + score;
    }
}
function found_barm() {
    timeleft += 500;
    score += 1;
    init_score();
    notfound = false;
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
    notfound = true;
    var container = document.getElementById("container");
    var arr = generate_new_pos(container);
    var elem_pos = elem.getBoundingClientRect();
    var top = elem_pos.top;
    var left = elem_pos.left;
    var animate = setInterval(function () {
        if (arr && notfound) {
            if (top == arr[0] && left == arr[1]) {
                if (notfound) {
                    arr = generate_new_pos(container);
                }
                else {
                    clearInterval(animate);
                    var new_arr = generate_new_pos(container);
                    if (new_arr) {
                        elem.style.top = new_arr[0] + "px";
                        elem.style.left = new_arr[1] + "px";
                        notfound = true;
                        animate_elem(elem);
                    }
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
        else if (!notfound) {
            clearInterval(animate);
            var new_arr = generate_new_pos(container);
            if (new_arr) {
                elem.style.top = new_arr[0] + "px";
                elem.style.left = new_arr[1] + "px";
                notfound = true;
                animate_elem(elem);
            }
        }
    }, 1);
}
function start_game() {
    var barm = document.getElementById("barm");
    if (barm) {
        animate_elem(barm);
        barm.addEventListener("click", found_barm);
    }
    init_countdown();
    init_score();
}
document.addEventListener("DOMContentLoaded", function () {
    start_game();
});
