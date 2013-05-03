$(function(){
    Logger = {};
    Logger.log = {
        routing: function(route, file_path) {
            this.file_path = file_path;

            console.debug('Matching route: ', route);
            this._log_request(file_path);
        },
        rendering: function(partial, file_path) {
            this.file_path = file_path;

            console.debug('Rendering partial: ', partial.slice(1));
            this._log_request(file_path);
        },

        separator: function() { console.debug('---'); },

        _log_request: function(file_path) {
            this.file_path = file_path;

            console.log('Loading file... ', file_path);
            console.log('Resource URL:   ', this.resource_url());
        },

        protocol: function() { return window.location.href.split('://')[0]; },
        resource_url: function(){ return this.protocol() + '://' + location.host + '/' + this.file_path; }
    }

    Router = window.Router = function() {
        this.dispatch = function() {
            var route        = location.hash.split('#')[1] || '/',
                file_path    = 'html/' + route + '.html';

            if (route != '/') {
                Logger.log.routing(route, file_path);
                Logger.log.separator();
                $('#container[role="main"]').load(file_path);
            }
        }
    };

    Router.prototype.start = function() {
        var self = this;

        self.dispatch();

        $(window).on('hashchange', function() {
            self.dispatch();
        });
    };

    var router = new Router();
    router.start();

    PartialLoader = function(opts) {
        this.partials = {
            header: ['header'],
            footer: ['footer']
        };
        this.base_path = 'html/partials/';
    }

    PartialLoader.contentDiv = function(position, file_name) {
        return $('<div class="' + position + '" id="' + file_name.split('/')[0]  + '"></div>');
    }

    PartialLoader.prototype.partialsList = function(list, all) {
        if (list == null || list == undefined || list[0] == 'all' || Array.isEmpty(list)) {
            return all;
        } else {
            if (list.length > 1) {
                return { header: [list[0]], footer: [list[1]] };
            } else {
                return { header: [list[0]] };
            }
        }
    }

    PartialLoader.prototype.load = function() {
        var self           = this,
            partialsToLoad = arguments,
            partials       = self.partialsList(partialsToLoad, self.partials)

        Object.each(partials, function(partial, position, object) {
            Array.each(partial, function(file_name) {
                url = self.base_path + '_' + file_name + '.html'

                Logger.log.rendering('_' + file_name, url);
                PartialLoader.contentDiv(position, file_name).load(
                    url,
                    function(content) {
                        position == 'header' ? $('body').prepend(content) : $('body').append(content);
                    }
                );
            });
        });
    }

    PartialLoader.prototype.clearAll  = function() { this.partials = { header: [], footer: [] }; return this; }
    PartialLoader.prototype.addHeader = function(name) { this.partials.header.push(name); return this; }
    PartialLoader.prototype.addFooter = function(name) { this.partials.footer.push(name); return this; }

    window.partial = partial = new PartialLoader();
});
