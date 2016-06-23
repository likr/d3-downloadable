(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["downloadable"] = factory();
	else
		root["downloadable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d3 = __webpack_require__(1);

	var css = '.download-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: inline-block;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 14px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0,0,0,.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);\n  box-shadow: 0 6px 12px rgba(0,0,0,.175);\n  background-clip: padding-box;\n}\n\n.download-menu>li>a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: 400;\n  line-height: 1.42857143;\n  color: #333;\n  white-space: nowrap;\n  text-decoration: none;\n  background: 0 0;\n}\n\n.download-menu>li>a:hover, .download-menu>li>a:focus {\n  text-decoration: none;\n  color: #262626;\n  background-color: #f5f5f5;\n}';

	var toCanvas = function toCanvas(svgData, width, height, callback) {
	  var src = 'data:image/svg+xml;charset=utf-8;base64,' + svgData;
	  var canvas = document.createElement('canvas');
	  var context = canvas.getContext('2d');
	  var image = new window.Image();
	  canvas.width = width;
	  canvas.height = height;
	  image.onload = function () {
	    context.drawImage(image, 0, 0);
	    callback(canvas);
	  };
	  image.src = src;
	};

	var createMenu = function createMenu(pos, filename, canvas, base64SvgText) {
	  var menu = d3.select('body').append('ul').classed('download-menu', true).style({
	    left: pos[0] + 'px',
	    top: pos[1] + 'px',
	    position: 'absolute',
	    'z-index': '1000',
	    display: 'inline-block',
	    float: 'left',
	    'min-width': '160px',
	    padding: '5px 0',
	    margin: '2px 0 0',
	    'list-style': 'none',
	    'font-size': '14px',
	    'background-color': '#fff',
	    border: '1px solid #ccc',
	    'border-radius': '4px',
	    '-webkit-box-shadow': '0 6px 12px rgba(0,0,0,.175)',
	    'box-shadow': '0 6px 12px rgba(0,0,0,.175)',
	    'background-clip': 'padding-box'
	  }).on('mouseleave', function () {
	    menu.remove();
	  });
	  var list = menu.append('li');
	  list.append('a').text('Save as SVG').attr({
	    download: filename + '.svg',
	    href: 'data:image/svg+xml;charset=utf-8;base64,' + base64SvgText
	  });
	  list.append('a').text('Save as PNG').attr({
	    download: filename + '.png',
	    href: canvas.toDataURL('image/png')
	  });
	  list.append('a').text('Save as JPG').attr({
	    download: filename + '.jpeg',
	    href: canvas.toDataURL('image/jpeg')
	  });
	};

	var downloadable = function downloadable() {
	  var filename = 'image';

	  var downloadableImpl = function downloadableImpl(selection) {
	    if (d3.select('#downloadable-css').empty()) {
	      d3.select('head').append('style').attr('id', 'downloadable-css').text(css);
	    }

	    selection.on('contextmenu', function () {
	      var pos = d3.mouse(document.body);
	      var origSvgNode = selection.node();

	      var _origSvgNode$getBound = origSvgNode.getBoundingClientRect();

	      var width = _origSvgNode$getBound.width;
	      var height = _origSvgNode$getBound.height;

	      var svgNode = origSvgNode.cloneNode(true);
	      d3.select(svgNode).attr({
	        version: '1.1',
	        xmlns: 'http://www.w3.org/2000/svg',
	        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
	        width: width,
	        height: height
	      });
	      var svgText = svgNode.outerHTML;
	      var base64SvgText = window.btoa(encodeURIComponent(svgText).replace(/%([0-9A-F]{2})/g, function (match, p1) {
	        return String.fromCharCode('0x' + p1);
	      }));
	      toCanvas(base64SvgText, width, height, function (canvas) {
	        createMenu(pos, filename, canvas, base64SvgText);
	      });
	      d3.event.preventDefault();
	    });
	  };

	  downloadableImpl.filename = function () {
	    if (arguments.length === 0) {
	      return filename;
	    }
	    filename = arguments[0];
	    return downloadableImpl;
	  };

	  return downloadableImpl;
	};

	module.exports = downloadable;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	module.exports = window.d3;

/***/ }
/******/ ])
});
;