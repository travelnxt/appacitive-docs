/*!
Flatdoc (http://ricostacruz.com/flatdoc)
(c) 2013 Rico Sta. Cruz. MIT licensed.

Also includes:

  marked
    a markdown parser
    (c) 2011-2013, Christopher Jeffrey. (MIT Licensed)
    https://github.com/chjj/marked

  base64.js
    http://github.com/dankogai/js-base64

*/

var jQuery = require('jquery');
var path = require('path');

(function ($) {
    var exports = this;

    var marked = require('./marked.js');
    var hljs = require('./highlight.js');
    var Base64 = require('./base64.js');
    /**
     * Basic Flatdoc module.
     *
     * The main entry point is `Flatdoc.run()`, which invokes the [Runner].
     *
     *     Flatdoc.run({
     *       fetcher: Flatdoc.github('rstacruz/backbone-patterns');
     *     });
     */

    var Flatdoc = {};

    /**
     * Creates a runner.
     * See [Flatdoc].
     */

    Flatdoc.run = function (options) {
        (new Flatdoc.runner(options)).run();
    };

    /**
     * File fetcher function.
     *
     * Fetches a given `filepath` via 'fs'.
     * See [Runner#run()] for a description of fetcher functions.
     */

    Flatdoc.file = function (filePath) {
        return function (callback) {
            require('fs').readFile(filePath, "UTF-8", function (err, markdown) {
                if (err) callback(err, null);
                callback(null, markdown);
            });
        };
    };

    /**
    * Github fetcher.
    * Fetches from repo `repo` (in format 'user/repo').
    * 
    * If the parameter `filepath` is supplied, it fetches the contents of that
    * given file in the repo.
    *
    * See [Runner#run()] for a description of fetcher functions.
    *
    * See: http://developer.github.com/v3/repos/contents/
    */
    Flatdoc.github = function (repo, filepath) {
        var url;
        if (filepath) {
            url = 'https://api.github.com/repos/' + repo + '/contents/' + filepath;
        } else {
            url = 'https://api.github.com/repos/' + repo + '/readme';
        }
        return function (callback) {
            $.get(url)
              .fail(function (e) { callback(e, null); })
              .done(function (data) {
                  var markdown = Base64.decode(data.content);
                  callback(null, markdown);
              });
        };
    };

    /**
     * Parser module.
     * Parses a given Markdown document and returns a JSON object with data
     * on the Markdown document.
     *
     *     var data = Flatdoc.parser.parse('markdown source here');
     *     console.log(data);
     *   
     *     data == {
     *       title: 'My Project',
     *       content: '<p>This project is a...',
     *       menu: {...}
     *     }
     */

    var Parser = Flatdoc.parser = {};

    /**
     * Parses a given Markdown document.
     * See `Parser` for more info.
     */
    Parser.parse = function (source) {

        Parser.setMarkedOptions();

        var html = $("<div>" + marked(source));
        var h1 = html.find('h1').eq(0);
        var title = h1.text();

        // Mangle content
        Transformer.mangle(html);
        var menu = Transformer.getMenu(html);

        return { title: title, content: html, menu: menu };
    };

    Parser.setMarkedOptions = function () {
        marked.setOptions({
            highlight: function (code, lang) {
                var prepend = "";
                if (code.indexOf("$$$") == 0) {
                    var split = code.split('\n');
                    prepend = "<span class='code-title'>" + split.shift(1).replace("$$$", "") + "</span><br/>";
                    code = split.join('\n');
                }
                var hLang = "xml";
                if (lang) {
                    switch (lang.toLowerCase()) {
                        case "csharp": hLang = "cs"; break;
                        case "ios": hLang = "objectivec"; break;
                        case "android": hLang = "java"; break;
                        case "rest":
                        case "javascript":
                            hLang = "javascript"; break;
                        case "nolang": return code + " "; break; //Inline html handling
                        case "nolang-rest": hLang = "javascript"; break;
                        case "python": hLang = "python"; break;
                    }
                    return prepend + hljs.highlight(hLang, code).value;
                }
            }
        });
    };

    /**
     * Transformer module.
     * This takes care of any HTML mangling needed.  The main entry point is
     * `.mangle()` which applies all transformations needed.
     *
     *     var $content = $("<p>Hello there, this is a docu...");
     *     Flatdoc.transformer.mangle($content);
     *
     * If you would like to change any of the transformations, decorate any of
     * the functions in `Flatdoc.transformer`.
     */

    var Transformer = Flatdoc.transformer = {};

    /**
     * Takes a given HTML `$content` and improves the markup of it by executing
     * the transformations.
     *
     * > See: [Transformer](#transformer)
     */
    Transformer.mangle = function ($content) {
        this.addIDs($content);
        this.buttonize($content);
        this.smartquotes($content);
        this.addPermaLinks($content);
    };

    /**
     * Adds IDs to headings.
     */

    Transformer.addIDs = function ($content) {
        $content.find('h1, h2, h3, h4, h5').each(function () {
            var $el = $(this);
            var text = $el.text();

            if ($el.is('h2'))
                text = $el.prevAll("h1:first").html() + "_" + text;

            if ($el.is('h3'))
                text = $el.prevAll("h1:first").html() + "_" + $el.prevAll("h2:first").html() + "_" + text;


            if ($el.is('h4'))
                text = $el.prevAll("h1:first").html() + "_" + $el.prevAll("h2:first").html() + "_" + $el.prevAll("h3:first").html() + "_" + text;

            if ($el.is('h5'))
                text = $el.prevAll("h1:first").html() + "_" + $el.prevAll("h2:first").html() + "_" + $el.prevAll("h3:first").html() + "_" + $el.prevAll("h4:first").html() + '_' + text;

            var id = slugify(text);
            $el.attr('id', id);
        });
    };

    /**
     * Returns menu data for a given HTML.
     *
     *     menu = Flatdoc.transformer.getMenu($content);
     *     menu == {
     *       level: 0,
     *       items: [{
     *         section: "Getting started",
     *         level: 1,
     *         items: [...]}, ...]}
     */

    Transformer.getMenu = function ($content) {
        var root = { items: [], id: '', level: 0 };
        var cache = [root];

        function mkdir_p(level) {
            var parent = (level > 1) ? mkdir_p(level - 1) : root;
            if (!cache[level]) {
                var obj = { items: [], level: level };
                cache[level] = obj;
                parent.items.push(obj);
                return obj;
            }
            return cache[level];
        }

        $content.find('h1, h2, h3, h4, h5').each(function () {
            var $el = $(this);
            var level = +(this.nodeName.substr(1));

            var parent = mkdir_p(level - 1);

            var obj = { section: $el.text(), items: [], level: level, id: $el.attr('id') };
            parent.items.push(obj);
            cache[level] = obj;
        });

        return root;
    };

    /**
     * Changes "button >" text to buttons.
     */

    Transformer.buttonize = function ($content) {
        $content.find('a').each(function () {
            var $a = $(this);

            var m = $a.text().match(/^(.*) >$/);
            if (m) $a.text(m[1]).addClass('button');
        });
    };

    /**
     * Applies smart quotes to a given element.
     * It leaves `code` and `pre` blocks alone.
     */

    Transformer.smartquotes = function ($content) {
        var nodes = getTextNodesIn($content), len = nodes.length;
        for (var i = 0; i < len; i++) {
            var node = nodes[i];
            node.nodeValue = quotify(node.nodeValue);
        }
    };

    /**
     * Adds permalinks for all heading tags
     */
    Transformer.addPermaLinks = function ($content) {
        $content.find('h1, h2, h3, h4, h5').each(function () {
            var $el = $(this);
            var id = $el.attr('id');
            $el.prepend('<a name="' + id + '" class="anchor" href="#' + id + '"><span class="hash hash-link"></span></a>')
        });
    };

    /**
     * Menu view. Renders menus
     */

    var MenuView = Flatdoc.menuView = function (menu) {
        var $el = $("<ul>");

        function process(node, $parent) {
            var id = node.id || 'root';

            var $li = $('<li>')
              .attr('id', id + '-item')
              .addClass('level-' + node.level)
              .appendTo($parent);

            if (node.section) {
                var $a = $('<a>')
                  .html(node.section)
                  .attr('id', id + '-link')
                  .attr('href', '#' + node.id)
                  .attr('title', node.section)
                  .addClass('level-' + node.level)
                  .appendTo($li);
            }

            if (node.items.length > 0) {
                var $ul = $('<ul>')
                  .addClass('level-' + (node.level + 1))
                  .attr('id', id + '-list')
                  .appendTo($li);

                node.items.forEach(function (item) {
                    process(item, $ul);
                });
            }
        }

        process(menu, $el);
        return $el;
    };

    /**
     * A runner module that fetches via a `fetcher` function.
     *
     *     var runner = new Flatdoc.runner({
     *       fetcher: Flatdoc.url('readme.txt')
     *     });
     *     runner.run();
     *
     * The following options are available:
     *
     *  - `fetcher` - a function that takes a callback as an argument and
     *    executes that callback when data is returned.
     *
     * See: [Flatdoc.run()]
     */

    var Runner = Flatdoc.runner = function (options) {
        this.cb = function () { };
        this.initialize(options);
    };

    Runner.prototype.root = '[role~="flatdoc"]';
    Runner.prototype.menu = '[role~="flatdoc-menu"]';
    Runner.prototype.title = '[role~="flatdoc-title"]';
    Runner.prototype.content = '[role~="flatdoc-content"]';

    Runner.prototype.initialize = function (options) {
        $.extend(this, options);
    };

    /**
     * Loads the Markdown document (via the fetcher), parses it, and applies it
     * to the elements.
     */

    Runner.prototype.run = function () {
        var doc = this;
        doc.fetcher(function (err, markdown) {
            if (err) {
                doc.cb(err, null);
                return;
            }
            var data = Flatdoc.parser.parse(markdown);
            doc.applyData(data, doc);
            doc.cb(null, doc.el);
        });
    };

    /**
     * Applies given doc data `data` to elements in object `elements`.
     */

    Runner.prototype.applyData = function (data) {
        var elements = this;

        elements.el = {};
        elements.el['title'] = data.title;
        elements.el['content'] = data.content.html();
        elements.el['menu'] = "<ul>" + (MenuView(data.menu)).html() + "</ul>";
    };

    /*
     * Helpers
     */

    // http://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery
    function getTextNodesIn(el) {
        var exclude = 'iframe,pre,code';
        return $(el).find(':not(' + exclude + ')').andSelf().contents().filter(function () {
            return this.nodeType == 3 && $(this).closest(exclude).length === 0;
        });
    }

    // http://www.leancrew.com/all-this/2010/11/smart-quotes-in-javascript/
    function quotify(a) {
        a = a.replace(/(^|[\-\u2014\s(\["])'/g, "$1\u2018");        // opening singles
        a = a.replace(/'/g, "\u2019");                              // closing singles & apostrophes
        a = a.replace(/(^|[\-\u2014\/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
        a = a.replace(/"/g, "\u201d");                              // closing doubles
        a = a.replace(/\.\.\./g, "\u2026");                         // ellipses
        a = a.replace(/--/g, "\u2014");                             // em-dashes
        return a;
    }

    function slugify(text) {
        return text.toLowerCase().match(/[a-z0-9_]+/g).join('-');
    }

    if (typeof exports === 'object') {
        module.exports = Flatdoc;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return Flatdoc; });
    } else {
        this.Flatdoc = Flatdoc;
    }

})(jQuery);

