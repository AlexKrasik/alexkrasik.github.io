new WOW().init();

$(function () {
    $('.popup-bg').click(function () {
        $('.popup-bg, .popup-window').hide();
    });
    $('.get__video-play').click(function (event) {
        event.preventDefault();
        $('.popup-bg, .popup-window').show();
    });
});