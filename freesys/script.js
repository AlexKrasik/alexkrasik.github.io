$(function () {
    setInterval(timer, 100);
});


function timer() {
    let now = new Date();

    if (window.timerEnd == undefined) {
        window.timerEnd = new Date();
        window.timerEnd.setMinutes(timerEnd.getMinutes() + 15);
        window.timerEnd = timerEnd;
    } else {
        var time = remaining(now, window.timerEnd);
        if (!time.end) {
            if (time.minutes.toString().length == 1) {
                $('.min1').text('0');
                $('.min2').text(time.minutes);
            } else {
                $('.min1').text(time.minutes.toString()[0]);
                $('.min2').text(time.minutes.toString()[1]);
            }

            if (time.seconds.toString().length == 1) {
                $('.sec1').text('0');
                $('.sec2').text(time.seconds);
            } else {
                $('.sec1').text(time.seconds.toString()[0]);
                $('.sec2').text(time.seconds.toString()[1]);
            }
        }
    }
}

function remaining(from, to) {
    let diff = to.getTime() - from.getTime();
    let d_num = parseInt((diff / 1e3) / 86400);
    diff = (diff / 1e3) % 86400;
    let h_num = Math.floor(diff / 3600);
    diff = diff % 3600;
    let m_num = Math.floor(diff / 60);
    diff = diff % 60;
    let s_num = Math.floor(diff);
    return {
        days: d_num,
        hours: h_num,
        minutes: m_num,
        seconds: s_num,
        end: diff <= 0,
    }
}