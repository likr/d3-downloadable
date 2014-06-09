(function() {
  d3.downloadable = function downloadable(arg) {
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

    return function(selection) {
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
        var menu = d3.select('body')
          .append('ul')
          .classed('dropdown-menu', true)
          .style({
            position: 'absolute',
            left: pos[0] + 'px',
            top: pos[1] + 'px',
            display: 'inline-block'
          })
          .on('mouseleave', function() {
            menu.remove();
          });
        menu
          .append('li')
          .append('a')
          .text('Save')
          .attr({
            download: filename,
            href: 'data:image/svg+xml;charset=utf-8;base64,' + base64SvgText
          });
        d3.event.preventDefault();
      });
    };
  };
})();
