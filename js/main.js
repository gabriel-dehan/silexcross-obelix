$(document).ready( function() {
  setTimeout(
      function() {
	        $('.fancybox').fancybox({});
          $('.map-container').css('min-height', $(window).height() - 100);
      }
  , 500);
});
