$(function () {
  //WOW.js
  new WOW().init();
  //slick
  $(".slider").slick({
    infinite: false,
    arrows: false,
    adaptiveHeight: true,
  });
  $(".menu__item").click(function(e) {
    $(".slider").slick('goTo', $(e.target).attr('data-slide'));
  });
  $(".slider").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    $(".menu__item").removeClass("active");
    let menuItems = $(".menu__item").toArray();
    $(menuItems[nextSlide]).addClass("active");
  });
  //age
  let now = new Date();
  let birth = new Date(1992, 5, 1);
  let age = Math.floor(remaining(birth, now).days / 365);
  $("#age").text(`${age} ${declOfNum(age, ["год", "года", "лет"])}`);
});
function remaining(from, to) {
  let diff = to.getTime() - from.getTime();
  let d_num = parseInt(diff / 1e3 / 86400);
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
  };
}
function declOfNum(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
