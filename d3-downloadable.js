(function() {
  d3.downloadable = function (arg) {
    function viewBoxString(vb) {
      return vb.minX + ' ' + vb.minY + ' ' + vb.width + ' ' + vb.height;
    }
    if (arg === undefined) {
      arg = {};
    }
    var viewBox = arg.viewBox === undefined ? null : viewBoxString(arg.viewBox);
    var filename = arg.filename === undefined ? null : arg.filename;
    var width = arg.width === undefined ? null : arg.width;
    var height = arg.height === undefined ? null : arg.height;

    var downloadable = function(selection) {
      selection.on('contextmenu', function() {
        var pos = d3.mouse(document.body);
        var svgNode = selection.node().cloneNode(true);
        d3.select(svgNode)
          .attr({
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xmlns:xlink": "http://www.w3.org/1999/xlink",
            width: width,
            height: height,
            viewBox: viewBox
          });
        var svgText = svgNode.outerHTML;
        var base64SvgText = btoa(unescape(encodeURIComponent(svgText)));
        toCanvas(base64SvgText, function(canvas) {
          var menu = d3.select('body')
            .append('ul')
            .classed('download-menu', true)
            .style({
              left: pos[0] + 'px',
              top: pos[1] + 'px',
            })
            .on('mouseleave', function() {
              menu.remove();
            });
          var list = menu
            .append('li');
          list
            .append('a')
            .text('Save as SVG')
            .attr({
              download: filename + '.svg',
              href: 'data:image/svg+xml;charset=utf-8;base64,' + base64SvgText
            });
          list
            .append('a')
            .text('Save as PNG')
            .attr({
              download: filename + '.png',
              href: canvas.toDataURL('image/png')
            });
          list
            .append('a')
            .text('Save as JPG')
            .attr({
              download: filename + '.jpeg',
              href: canvas.toDataURL('image/jpeg')
            });
        });
        d3.event.preventDefault();
      });
    };

    downloadable.filename = function() {
      if (arguments.length === 0) {
        return filename;
      }
      filename = arguments[0];
      return filename;
    };

    downloadable.width = function() {
      if (arguments.length === 0) {
        return width;
      }
      width = arguments[0];
      return downloadable;
    };

    downloadable.height = function() {
      if (arguments.length === 0) {
        return height;
      }
      height = arguments[0];
      return downloadable;
    };

    return downloadable;

    function toCanvas(svgData, callback) {
      var src = 'data:image/svg+xml;charset=utf-8;base64,' + svgData;
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var image = new Image();
      canvas.width = width;
      canvas.height = height;
      image.onload = function() {
        context.drawImage(image, 0, 0);
        callback(canvas);
      };
      image.src = src;
    }
  };
})();
