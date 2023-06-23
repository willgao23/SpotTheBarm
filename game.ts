let timeleft: number = 1000;
let notfound: boolean = true;

function start_countdown() {
    setInterval(function() {
        let countdown = document.getElementById("countdown");
        if (timeleft < 0) {
            //display game over screen
            alert("GAME OVER");
        } else {
            if (countdown) {
                countdown.innerHTML = (timeleft / 100).toString();
            } else {
                timeleft = 0;
            }
        }
        timeleft -= 1;
    }, 10);
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
                } else {
                    clearInterval(animate);
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

function start_game() {
    let barm: HTMLElement | null = document.getElementById("barm");    
    if (barm) {
        animate_elem(barm);
    }
    start_countdown();
}

document.addEventListener("DOMContentLoaded", function() {
    start_game();
})