$(document).ready(function() {
  var bannerItem = $('.banner_item'),
      pagination = $('.pagination span'),
      timer = null,
      iNow = 0;

  pagination.on('click', function () {
    
    var me = $(this);

    bannerItem.removeClass('active');
    bannerItem.eq(me.index()).addClass('active');

    pagination.removeClass('active');
    me.addClass('active');

  });

  autoPlay();

  function autoPlay() {
    timer = setInterval(function(){
      iNow++;

      if (iNow > pagination.length-1) {
        iNow = 0;
      }

      pagination.eq(iNow).trigger('click');
    }, 2000)
  }
});