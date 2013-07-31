(function ($) {
    var $window = $(window);
    var $document = $(document);

    /*
     * Scrollspy.
     */
    var currentId = null;
    var reCal = true;
    var alignScroll = function () {
        if (currentId) {
            $("[href='#" + currentId + "']").trigger("click");
        }
        var preId = null;
        $("h1,h2, h3").scrollagent({ offset: 200, reCal: reCal }, function (cid, pid, currentElement, previousElement) {
            if (pid) {
                $("[href='#" + pid + "']").removeClass('active');
            }
            if (cid) {
                $("[href='#" + cid + "']").addClass('active');
                $("[href='#" + cid + "']").siblings().slideDown();
            }
            if ($("[href='#" + cid + "']").hasClass("level-2")) {
                preId = cid;
            }
            if ($("[href='#" + cid + "']").hasClass("level-3") && $("[href='#" + cid + "']").closest("ul").is(":visible") == false) {
                $("[href='#" + cid + "']").closest("ul").slideDown();
                preId = $("[href='#" + cid + "']").closest("ul").parent().children("a").html().toLowerCase();
            }
            $("li.level-2 ul.level-3").not($("[href='#" + preId + "']").siblings()).slideUp();
            currentId = cid;
        });
        if (reCal) $("ul.level-1 li.level-1:first-child a").addClass("active");
        reCal = false;
    };

    $document.on('flatdoc:ready', function () {
        var that = this;
        var cName = "appacitive-docs-selected-lang";
        var storeCookie = function (lang) {
            if (!lang) return;
            document.cookie = cName + "=" + lang + ";";
        };
        var readCookie = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        };
        var deleteCookie = function (name) {
            var domain = "domain=.appacitive.com;";
            if (window.location.hostname == "localhost") domain = '';
            document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;" + domain;
        };

        //jump to hash
        if (window.location.hash != "") {
            setTimeout(function () {
                $("[href='" + window.location.hash + "']").trigger("click");
            }, 1000);
        }

        //language selection
        $(".language a").unbind("click").click(function (e) {
            var $that = $(this);

            //handle active tab
            if ($that.parent().hasClass("active")) return;
            $(".language li").removeClass("active");
            $that.parent().addClass("active");

            $(".lang").hide();
            var selected = $that.data("lang").toLowerCase();
            $(".lang-" + selected).show();

            setTimeout(function () {
                alignScroll();
            }, 50);
            storeCookie(selected);
        });
        var lang = readCookie(cName);
        if (!lang) $(".language a:first").trigger("click");
        $("*[data-lang='" + lang + "']").trigger("click");

        //authenticated user handling
        this.SESSION_COOKIE_NAME = '__app_session';
        this.USERNAME_COOKIE = "_app_session_user";
        this.account = "";
        var user = readCookie(this.USERNAME_COOKIE);
        if (user) {
            user = unescape(user);
            var split = user.split("|");
            this.account = split[2];
            $(".top_nav_user_name_first").html(split[0]);
            $(".top_nav_user_name_last").html(split[1]);

            if (split.length == 6) $('#imgUserPhoto').attr("src", split[5]);
            else $('#imgUserPhoto').attr("src", "https://secure.gravatar.com/avatar/" + MD5(split[4]) + "?s=40&d=" + escape("https://portal.appacitive.com/styles/images/human.png"));

            $(".top_links_user").show();

            that.docEventBinded = false;
            $(".top_links_user").click(function (e) {
                if ($('#lnkUserMenu').hasClass('highlit-menu') == false) {
                    if (that.docEventBinded == false) {
                        that.docEventBinded = true;

                        $(document).click(function (e) {
                            if ($('#lnkUserMenu').hasClass('highlit-menu') == false) return;
                            $('#lnkUserMenu').toggleClass('highlit-menu');
                            $('#lstUserMenu').toggle();
                        });
                    }
                }
                $('#lnkUserMenu').toggleClass('highlit-menu');
                $('#lstUserMenu', that).toggle();
                e.preventDefault();
                return false;
            });
            $("#lnkLogout").click(function () {
                deleteCookie(that.SESSION_COOKIE_NAME);
                deleteCookie(that.USERNAME_COOKIE);
                $(".top_links_user").hide();
                $("#aLogin").parent().show();
            });
            $("#lnkMyAccount").click(function () {
                window.location = "https://portal.appacitive.com/" + that.account + "/accounts.html?accounts=myaccount";
            });

        } else $("#aLogin").parent().show();
        $("#aLogin").attr("href", $("#aLogin").attr("href") + "&ru=" + window.location.href);

        //add padding to bottom, so that last item can be highlighted
        $(".content-root").css("padding-bottom", $(window).height() - 200);
    });

    $(document).on('flatdoc:ready', function () {
        function switch_style(title) {
            var i, links = document.getElementsByTagName("link");
            for (i = 0; i < links.length ; i++) {
                if ((links[i].rel.indexOf("stylesheet") != -1) && links[i].title) {
                    links[i].disabled = true;
                    if (links[i].title == title) {
                        links[i].disabled = false;
                    }
                }
            }
        }
    });

    /*
     * Anchor jump links.
     */

    $document.on('flatdoc:ready', function () {
        $('.menu a').anchorjump();
    });

    /*
     * Title card.
     */

    $(function () {
        var $card = $('.title-card');
        if (!$card.length) return;

        var $header = $('.header');
        var headerHeight = $header.length ? $header.outerHeight() : 0;

        $window
          .on('resize.title-card', function () {
              var windowWidth = $window.width();

              if (windowWidth < 480) {
                  $card.css('height', '');
              } else {
                  var height = $window.height();
                  $card.css('height', height - headerHeight);
              }
          })
          .trigger('resize.title-card');

        $card.fillsize('> img.bg');
    });

    /*
     * Sidebar stick.
     */

    $(function () {
        var $sidebar = $('.menubar');
        var $lang = $('.language');
        var elTop = 62;

        $window
          .on('resize.sidestick', function () {
              $window.trigger('scroll.sidestick');
          })
          .on('scroll.sidestick', function () {
              var scrollY = $window.scrollTop();
              $sidebar.toggleClass('fixed', (scrollY >= elTop));
              $lang.toggleClass('fixed', (scrollY >= elTop));
          })
          .trigger('resize.sidestick');
    });

})(jQuery);
/*! jQuery.scrollagent (c) 2012, Rico Sta. Cruz. MIT License.
 *  https://github.com/rstacruz/jquery-stuff/tree/master/scrollagent */

// Call $(...).scrollagent() with a callback function.
//
// The callback will be called every time the focus changes.
//
// Example:
//
//      $("h2").scrollagent(function(cid, pid, currentElement, previousElement) {
//        if (pid) {
//          $("[href='#"+pid+"']").removeClass('active');
//        }
//        if (cid) {
//          $("[href='#"+cid+"']").addClass('active');
//        }
//      });

(function ($) {

    var offsets = [];
    $.fn.scrollagent = function (options, callback) {
        // Account for $.scrollspy(function)
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }

        var $sections = $(this);
        var $parent = options.parent || $(window);

        // Find the top offsets of each section
        offsets = [];
        $sections.each(function (i) {
            var offset = $(this).attr('data-anchor-offset') ?
              parseInt($(this).attr('data-anchor-offset'), 10) :
              (options.offset || 0);

            offsets.push({
                top: $(this).offset().top + offset,
                id: $(this).attr('id'),
                index: i,
                el: this
            });
        });

        if (options.reCal) {

            // State
            var current = null;
            var height = null;
            var range = null;

            // Save the height. Do this only whenever the window is resized so we don't
            // recalculate often.
            $(window).on('resize', function () {
                height = $parent.height();
                range = $(document).height();
            });

            // Find the current active section every scroll tick.
            $parent.on('scroll', function () {
                var y = $parent.scrollTop();
                y += height * (0.3 + 0.05 * Math.pow(y / range, 2));

                var latest = null;

                for (var i in offsets) {
                    if (offsets.hasOwnProperty(i)) {
                        var offset = offsets[i];
                        if (offset.top < y) latest = offset;
                    }
                }

                if (latest && (!current || (latest.index !== current.index))) {
                    callback.call($sections,
                      latest ? latest.id : null,
                      current ? current.id : null,
                      latest ? latest.el : null,
                      current ? current.el : null);
                    current = latest;
                }
            });
        }
        $(window).trigger('resize');
        $parent.trigger('scroll');

        return this;
    };

})(jQuery);
/*! Anchorjump (c) 2012, Rico Sta. Cruz. MIT License.
 *   http://github.com/rstacruz/jquery-stuff/tree/master/anchorjump */

// Makes anchor jumps happen with smooth scrolling.
//
//    $("#menu a").anchorjump();
//    $("#menu a").anchorjump({ offset: -30 });
//
//    // Via delegate:
//    $("#menu").anchorjump({ for: 'a', offset: -30 });
//
// You may specify a parent. This makes it scroll down to the parent.
// Great for tabbed views.
//
//     $('#menu a').anchorjump({ parent: '.anchor' });
//
// You can jump to a given area.
//
//     $.anchorjump('#bank-deposit', options);

(function ($) {
    var defaults = {
        'speed': 500,
        'offset': 0,
        'for': null,
        'parent': null
    };

    $.fn.anchorjump = function (options) {
        options = $.extend({}, defaults, options);

        if (options['for']) {
            this.on('click', options['for'], onClick);
        } else {
            this.on('click', onClick);
        }

        function onClick(e) {
            var $a = $(e.target).closest('a');
            if (e.ctrlKey || e.metaKey || e.altKey || $a.attr('target')) return;

            e.preventDefault();
            var href = $a.attr('href');

            $.anchorjump(href, options);
        }
    };

    // Jump to a given area.
    $.anchorjump = function (href, options) {
        options = $.extend({}, defaults, options);

        var top = 0;

        if (href != '#') {
            var $area = $(href);
            // Find the parent
            if (options.parent) {
                var $parent = $area.closest(options.parent);
                if ($parent.length) { $area = $parent; }
            }
            if (!$area.length) { return; }

            // Determine the pixel offset; use the default if not available
            var offset =
              $area.attr('data-anchor-offset') ?
              parseInt($area.attr('data-anchor-offset'), 10) :
              options.offset;

            top = Math.max(0, $area.offset().top + offset);
        }

        $('html, body').animate({ scrollTop: top }, options.speed);
        $('body').trigger('anchor', href);

        // Add the location hash via pushState.
        if (window.history.pushState) {
            window.history.pushState({ href: href }, "", href);
        }
    };
})(jQuery);
/*! fillsize (c) 2012, Rico Sta. Cruz. MIT License.
 *  http://github.com/rstacruz/jquery-stuff/tree/master/fillsize */

// Makes an element fill up its container.
//
//     $(".container").fillsize("> img");
//
// This binds a listener on window resizing to automatically scale down the
// child (`> img` in this example) just so that enough of it will be visible in
// the viewport of the container.
// 
// This assumes that the container has `position: relative` (or any 'position',
// really), and `overflow: hidden`.

(function ($) {
    $.fn.fillsize = function (selector) {
        var $parent = this;
        var $img;

        function resize() {
            if (!$img) $img = $parent.find(selector);

            $img.each(function () {
                if (!this.complete) return;
                var $img = $(this);

                var parent = { height: $parent.innerHeight(), width: $parent.innerWidth() };
                var imageRatio = $img.width() / $img.height();
                var containerRatio = parent.width / parent.height;

                var css = {
                    position: 'absolute',
                    left: 0, top: 0, right: 'auto', bottom: 'auto'
                };

                // If image is wider than the container
                if (imageRatio > containerRatio) {
                    css.left = Math.round((parent.width - imageRatio * parent.height) / 2) + 'px';
                    css.width = 'auto';
                    css.height = '100%';
                }

                    // If the container is wider than the image
                else {
                    css.top = Math.round((parent.height - (parent.width / $img.width() * $img.height())) / 2) + 'px';
                    css.height = 'auto';
                    css.width = '100%';
                }

                $img.css(css);
            });
        }

        // Make it happen on window resize.
        $(window).resize(resize);

        // Allow manual invocation by doing `.trigger('fillsize')` on the container.
        $(document).on('fillsize', $parent.selector, resize);

        // Resize on first load (or immediately if called after).
        $(function () {
            // If the child is an image, fill it up when image's real dimensions are
            // first determined. Needs to be .bind() because the load event will
            // bubble up.
            $(selector, $parent).bind('load', function () {
                setTimeout(resize, 25);
            });

            resize();
        });

        return this;
    };
})(jQuery);
