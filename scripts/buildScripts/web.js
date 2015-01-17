#!/usr/bin/env node

var cheerio = require('cheerio');
var path = require('path')
var Flatdoc = require('./flatdoc.js');
var spawn = require('child_process').spawn;

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
};

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
}

setTimeout(function() {

    var transform = function(file) {

        var htmlFile = file["htmlFile"];

        //read the html file
        require('fs').readFile(path.resolve(htmlFile), 'UTF-8', function(err, data) {

            if (err) throw "Unable to find " + htmlFile;

            console.log(htmlFile + " file read");

            var htmlData = data;

            var $ = cheerio.load(data);

            var cb = function(err, el) {
                if (err) throw err;

                var root = $('[role~="flatdoc"]');
                $('[role~="flatdoc-title"]', root).html(el['title']);
                $('[role~="flatdoc-content"]', root).html(el['content']);
                $('[role~="flatdoc-menu"]', root).html(el['menu']); 
                $('script[id~="scriptFlatdocReady"]').html('$(function(){ $(document).trigger("flatdoc:ready") });');

                var html = $.html();

                html = replaceAll('__RevisionNoGoesHere__', guid(), html);

                require('fs').writeFile(path.resolve(htmlFile), html, function(err) {
                    if (err) throw err;

                    console.log(htmlFile + " saved");

                });
            };

            if (file.type == 'file') {
                Flatdoc.run({
                    fetcher: Flatdoc.file(path.resolve(file["markdownFile"])),
                    cb: cb
                }); 
            } else {
                Flatdoc.run({
                    fetcher: Flatdoc.github(file["repo"]),
                    cb: cb
                });
            }

        });
    };

    //read config file into config 
    var config = require('./config.js');

    // if config has files
    if (config.files && config.files.length > 0) {

        config.files.forEach(function(file) {
            transform(file);
        });
    }

}, 0);

process.on('uncaughtexceptions', function(e) {
    process.exit(1);
});

process.on('exit', function(code) {
    if (code == 0) {
        console.log("\n*************Static html file generated successfully*************\n");
    }
});