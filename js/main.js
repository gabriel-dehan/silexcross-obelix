$(document).ready( function() {
    partial.onLoad(function(route) {
        Header.init();
	      $('.fancybox').fancybox({});
    })

    partial.onceLoaded('map', function(route) {
        Map.init();
        Map.interact();
    })
});

var Header = (function() {
    function _init() {
        $('.expandable').on('click', function(e) {
            $(this).toggleClass('expanded');
        });
    }
    return {init:_init};
})();

var Map = (function() {
    var registered = [];

    function _init() {
        var $main = $('.map-container');
        $main.css('min-height', $(window).height() - 80);

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

    function _interact() {
        var $main = $('.map-container');

        $main.find('.content').on('click', function() {

            if (!$(this).hasClass('new')) {
                registered.push($(this).parents('.map'));
                console.log('Registered');
            } else {
                var self = $(this),
                    next = self.parents('.map').next('.map');
                next.removeClass('hide');
                self.removeClass('new').html('<p>Master Page Bottom</p>');
                registered = []
                $('.map-container').css('min-height', $(window).height() + 80);
            }
        });

        $('span.del_map').on('click', function() {
            registered.each(function(e) {
                next = e.next('.map');
                if (next.find('.content').hasClass('new')
                    || next.find('.content').hasClass('new-fake') ) {
                    c = e.find('.content');
                    next.addClass('hide');
                    c.addClass('new');
                    c.html('');
                } else {
                    e.addClass('hide');
                }
            });
            registered = []
            $('.map-container').css('min-height', $(window).height() - 100);
        });

        $('span.share_map').on('click', function() {
            $('.map-container .footer').toggleClass('hide');
        });
    }

    return {init:_init, interact:_interact};
})();
