var timeleft = 1000;
var notfound = true;
var score = 0;
var total = 0;
var existsnew = false;
var limit = 135;
var increment = 5;
function init_countdown() {
    setInterval(function () {
        var countdown = document.getElementById("countdown");
        if (timeleft < 0) {
            show_game_over();
        }
        else {
            if (countdown) {
                countdown.innerHTML = (Math.round(timeleft / 10) / 10).toString();
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
    timeleft += 200;
    score += 1;
    init_score();
    notfound = false;
    var container = document.getElementById("container");
    var audio = document.getElementById("win");
    if (audio) {
        audio.play();
    }
    if (total <= limit) {
        for (var i = 0; i < increment; i++) {
            var randnum = Math.floor(Math.random() * 11 + 1);
            var img = document.createElement("img");
            img.src = "images/" + randnum + ".png";
            img.setAttribute("alt", "distraction images");
            img.setAttribute("class", "moving");
            if (container) {
                container.appendChild(img);
            }
            var width = img.getBoundingClientRect().width;
            var height = img.getBoundingClientRect().height;
            var new_arr = generate_new_pos(container, width, height);
            if (new_arr) {
                img.style.top = new_arr[0] + "px";
                img.style.left = new_arr[1] + "px";
                animate_elem(img);
            }
            total++;
        }
    }
}
function generate_new_pos(container, width, height) {
    if (container) {
        var h = container.clientHeight - height;
        var w = container.clientWidth - width;
        var new_h = Math.floor(Math.random() * h);
        var new_w = Math.floor(Math.random() * w);
        return [new_h, new_w];
    }
    else {
        return null;
    }
}
function animate_barm(elem) {
    var elem_pos = elem.getBoundingClientRect();
    var top = elem_pos.top;
    var left = elem_pos.left;
    var width = elem_pos.width;
    var height = elem_pos.height;
    var container = document.getElementById("container");
    var arr = generate_new_pos(container, width, height);
    var animate = setInterval(function () {
        if (arr && notfound) {
            if (top == arr[0] && left == arr[1]) {
                if (notfound) {
                    arr = generate_new_pos(container, width, height);
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
        else {
            clearInterval(animate);
            var new_arr = generate_new_pos(container, width, height);
            if (new_arr) {
                elem.style.top = new_arr[0] + "px";
                elem.style.left = new_arr[1] + "px";
                notfound = true;
                animate_barm(elem);
            }
        }
    }, 1);
}
function animate_elem(elem) {
    var elem_pos = elem.getBoundingClientRect();
    var top = elem_pos.top;
    var left = elem_pos.left;
    var width = elem_pos.width;
    var height = elem_pos.height;
    var container = document.getElementById("container");
    var arr = generate_new_pos(container, width, height);
    var animate = setInterval(function () {
        if (arr) {
            if (top == arr[0] && left == arr[1]) {
                if (notfound) {
                    arr = generate_new_pos(container, width, height);
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
function show_game_over() {
    var game_over = document.getElementById("gameover");
    if (game_over) {
        game_over.style.display = 'flex';
    }
}
function hide_game_over() {
    var game_over = document.getElementById("gameover");
    if (game_over) {
        game_over.style.display = 'none';
    }
}
function start_game() {
    hide_game_over();
    var container = document.getElementById("container");
    if (container) {
        var h = container.clientHeight;
        var w = container.clientWidth;
        if (h * w <= 500000) {
            limit = 20;
            increment = 2;
        }
        else if (h * w <= 1250000) {
            limit = 75;
        }
    }
    var barm = document.getElementById("barm");
    if (barm) {
        animate_barm(barm);
        barm.addEventListener("click", found_barm);
    }
    init_countdown();
    init_score();
}
document.addEventListener("DOMContentLoaded", function () {
    start_game();
});
