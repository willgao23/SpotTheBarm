let timeleft: number = 1000;
let notfound: boolean = true;
let score: number = 0;
let total: number = 0;
let existsnew: boolean = false;
let limit: number = 200;

function init_countdown() {
    setInterval(function() {
        let countdown = document.getElementById("countdown");
        if (timeleft < 0) {
            show_game_over();
        } else {
            if (countdown) {
                countdown.innerHTML = (Math.round(timeleft / 10) / 10).toString();
            } else {
                timeleft = 0;
            }
        }
        timeleft -= 1;
    }, 10);
}

function init_score() {
    let counter = document.getElementById("score");
    if (counter) {
        counter.innerHTML = "Score: " + score;
    }
}

function found_barm() {
    timeleft += 500;
    score += 1;
    init_score();
    notfound = false;
    let container = document.getElementById("container");

    let audio = document.getElementById("win") as HTMLAudioElement;
    if (audio) {
        audio.play();
    }

    if (total <= limit) {
        for (let i: number = 0; i < 5; i++) {
            let randnum: number = Math.floor(Math.random() * 11 + 1);
            let img = document.createElement("img");
            img.src = "images/" + randnum + ".png";
            img.setAttribute("alt", "distraction images");
            img.setAttribute("class", "moving");
            if (container) {
                container.appendChild(img);
            }
            let new_arr: any[] | null = generate_new_pos(container);
            if (new_arr) {
                img.style.top = new_arr[0] + "px";
                img.style.left = new_arr[1] + "px";
                animate_elem(img);
            } 
            total++;
        }
    } 

}

function generate_new_pos(container: HTMLElement | null): any[] | null {
    if (container) {
        let h: number = container.clientHeight;
        let w: number = container.clientWidth;
        let new_h = Math.floor(Math.random() * h);
        let new_w = Math.floor(Math.random() * w);
        return [new_h, new_w];
    } else {
        return null;
    } 
}

function animate_barm(elem: HTMLElement) {
    let container = document.getElementById("container");
    let arr: any[] | null = generate_new_pos(container);
    let elem_pos = elem.getBoundingClientRect();
    let top: number = elem_pos.top;
    let left: number = elem_pos.left;
    let animate = setInterval(function() {
        if (arr && notfound) {
            if (top == arr[0] && left == arr[1]) {
                if (notfound) {
                    arr = generate_new_pos(container);
                }
            } else if (top < arr[0] && left < arr[1]) {
                top += 1;
                left += 1;
            } else if (top > arr[0] && left > arr[1]) {
                top -= 1;
                left -= 1;
            } else if (top < arr[0]) {
                top += 1;
            } else if (top > arr[0]) {
                top -= 1;
            } else if (left < arr[1]) {
                left +=1;
            } else {
                left -= 1;
            }
            elem.style.top = top + 'px';
            elem.style.left = left + 'px';
        } else {
            clearInterval(animate);  
            let new_arr: any[] | null = generate_new_pos(container);
            if (new_arr) {
                elem.style.top = new_arr[0] + "px";
                elem.style.left = new_arr[1] + "px";
                notfound = true;
                animate_barm(elem);
            }
        }    
    }, 1);
}

function animate_elem(elem: HTMLElement) {
    let container = document.getElementById("container");
    let arr: any[] | null = generate_new_pos(container);
    let elem_pos = elem.getBoundingClientRect();
    let top: number = elem_pos.top;
    let left: number = elem_pos.left;
    let animate = setInterval(function() {
        if (arr) {
            if (top == arr[0] && left == arr[1]) {
                if (notfound) {
                    arr = generate_new_pos(container);
                }
            } else if (top < arr[0] && left < arr[1]) {
                top += 1;
                left += 1;
            } else if (top > arr[0] && left > arr[1]) {
                top -= 1;
                left -= 1;
            } else if (top < arr[0]) {
                top += 1;
            } else if (top > arr[0]) {
                top -= 1;
            } else if (left < arr[1]) {
                left +=1;
            } else {
                left -= 1;
            }
            elem.style.top = top + 'px';
            elem.style.left = left + 'px';
        }
    }, 1);    
}

function show_game_over() {
    let game_over = document.getElementById("gameover");
    if (game_over) {
        game_over.style.display = 'flex';
    }
}

function hide_game_over() {
    let game_over = document.getElementById("gameover");
    if (game_over) {
        game_over.style.display = 'none';
    }
}

function start_game() {
    hide_game_over();
    let container = document.getElementById("container");
    if (container) {
        let h: number = container.clientHeight;
        let w: number = container.clientWidth;
        if (h * w <= 500000) {
            limit = 50;
        } else if (h * w <= 1250000) {
            limit = 100;
        }
    }
    let barm: HTMLElement | null = document.getElementById("barm");    
    if (barm) {
        animate_barm(barm);
        barm.addEventListener("click", found_barm);
    }
    init_countdown();
    init_score();

}

document.addEventListener("DOMContentLoaded", function() {
    start_game();
})