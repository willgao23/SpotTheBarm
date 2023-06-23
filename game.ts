function start_countdown() {
    let timeleft: number = 1000;
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

function start_game() {
    let barm: object | null = document.getElementById("barm");
    start_countdown();
}

document.addEventListener("DOMContentLoaded", function() {
    start_game();
})