$(function () {
    $('.popup-bg').click(function () {
        $('.popup-bg, .popup-window').hide();
        $(' .popup-window iframe').attr('src', '');
    });
    $('.get__video-play').click(function () {
        $('.popup-bg, .popup-window').show();
        $(' .popup-window iframe').attr('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
    });
});