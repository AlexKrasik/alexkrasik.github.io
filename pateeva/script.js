$(function () {
    $("#show .slider img").toArray().forEach(element => {
      $(element).attr('src', $(element).attr('data-src'));
    });

    $("#show .slider").slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      dots: true,
      appendDots: '#show .slider__dots',
      prevArrow: '#show .prev',
      nextArrow: '#show .next',
      responsive: [
      {
          breakpoint: 1160,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },{
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  });
