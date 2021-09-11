new WOW().init();

$(document).ready(function () {
    var slider = $('#results .slider').slick({
        slidesToShow: 9,
        centerMode: true,
        prevArrow: '.slider-controls .prev',
        nextArrow: '.slider-controls .next',
    });
    $(slider).on('afterChange', function (event, slick, currentSlide, nextSlide) {
        currentSlide += 1;
        var current = (String(currentSlide).length == 1) ? '0' + currentSlide : currentSlide;
        $('.slider-controls .current').text(current);
        $('.slider-controls .count').text(slick.slideCount);
    });
});