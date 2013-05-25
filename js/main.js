$(document).ready( function() {
  setTimeout(
      function() {
          Header.init();
          Map.init();

	        $('.fancybox').fancybox({});
      }
  , 600);
});

var Header = (function() {
    function _init() {
        console.log($('.expandable'));
        $('.expandable').on('click', function(e) {
            console.log('click');
            $(this).toggleClass('expanded');
        });
    }

    return {init:_init};
})();

var Map = (function() {
    function _init() {
        var $main = $('.map-container');

        $main.css('min-height', $(window).height() - 100);
        $main.find('.sidebar-toolbar li').on('mouseenter', function() {
            var self = $(this),
                img  = self.find('img'),
                src  = img.attr('src');
            img.attr('src', src.replace('.png', '_hover.png'));
        }).on('mouseleave', function() {
            var self = $(this),
                img  = self.find('img'),
                src  = img.attr('src');
            img.attr('src', src.replace('_hover.png', '.png'));
        });
    }

    return {init:_init};
})();
