#!/usr/bin/env node

var cheerio = require('cheerio');
var path = require('path')
var Flatdoc = require('./flatdoc.js');

setTimeout(function() {

	var transform = function(file) {

		var htmlFile = file["htmlFile"];

		//read the html file
		require('fs').readFile(path.resolve(htmlFile), 'UTF-8', function(err, data) {

			if (err) throw "Unable to find " + htmlFile;

			console.log(htmlFile + " file read");

			var $ = cheerio.load(data);

			var cb = function(err, el) {
				if (err) throw err;

		    	var root = $('[role~="flatdoc"]');
		    	$('[role~="flatdoc-title"]', root).html(el['title']);
		    	$('[role~="flatdoc-content"]', root).html(el['content']);
		    	$('[role~="flatdoc-menu"]', root).html(el['menu']);	
		    	$('script[id~="scriptFlatdocReady"]').html('$(function(){ $(document).trigger("flatdoc:ready") });');
		    	$('script[id~="scriptBundle"]').attr('src', 'scripts/prod.js.bundle');

		    	require('fs').writeFile(path.resolve(htmlFile), $.html(), function(err, data) {
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