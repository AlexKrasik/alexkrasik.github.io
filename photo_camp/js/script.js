new WOW().init();

$(function () {
    let rickroll = document.getElementById('rickroll');
    $('.popup-bg').click(function () {
        $('.popup-bg, .popup-window').hide();
        rickroll.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    });
    $('.get__video-play').click(function (event) {
        event.preventDefault();
        $('.popup-bg, .popup-window').show();
        rickroll.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    });
});