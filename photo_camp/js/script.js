new WOW().init();

$(function () {
    $('.popup-bg').click(function () {
        $('.popup-bg, .popup-window').hide();
        player.stopVideo();
    });
    $('.get__video-play').click(function (event) {
        event.preventDefault();
        $('.popup-bg, .popup-window').show();
        let rickroll = document.getElementById('rickroll');
        rickroll.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    });
});