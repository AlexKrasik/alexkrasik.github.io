var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('rickroll', {
        height: '390',
        width: '640',
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
            'playsinline': 1
        },
        events: {
            // 'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
        }
    });
}

$(function () {

    $('.popup-bg').click(function () {
        $('.popup-bg, .popup-window').hide();
        player.stopVideo();
    });
    $('.get__video-play').click(function (event) {
        event.preventDefault();
        $('.popup-bg, .popup-window').show();
        player.playVideo();
    });
});