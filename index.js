const d3 = require('d3')

const css = `.download-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: inline-block;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  background-clip: padding-box;
}

.download-menu>li>a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: 400;
  line-height: 1.42857143;
  color: #333;
  white-space: nowrap;
  text-decoration: none;
  background: 0 0;
}

.download-menu>li>a:hover, .download-menu>li>a:focus {
  text-decoration: none;
  color: #262626;
  background-color: #f5f5f5;
}`

const toCanvas = (svgData, width, height, callback) => {
  const src = 'data:image/svg+xml;charset=utf-8;base64,' + svgData
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const image = new window.Image()
  canvas.width = width
  canvas.height = height
  image.onload = () => {
    context.drawImage(image, 0, 0)
    callback(canvas)
  }
  image.src = src
}

const createMenu = (pos, filename, canvas, base64SvgText) => {
  const menu = d3.select('body')
    .append('ul')
    .classed('download-menu', true)
    .style({
      left: `${pos[0]}px`,
      top: `${pos[1]}px`,
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
    })
    .on('mouseleave', () => {
      menu.remove()
    })
  const list = menu
    .append('li')
  list
    .append('a')
    .text('Save as SVG')
    .attr({
      download: filename + '.svg',
      href: 'data:image/svg+xml;charset=utf-8;base64,' + base64SvgText
    })
  list
    .append('a')
    .text('Save as PNG')
    .attr({
      download: filename + '.png',
      href: canvas.toDataURL('image/png')
    })
  list
    .append('a')
    .text('Save as JPG')
    .attr({
      download: filename + '.jpeg',
      href: canvas.toDataURL('image/jpeg')
    })
}

const downloadable = () => {
  let filename = 'image'

  const downloadableImpl = (selection) => {
    if (d3.select('#downloadable-css').empty()) {
      d3.select('head')
        .append('style')
        .attr('id', 'downloadable-css')
        .text(css)
    }

    selection.on('contextmenu', () => {
      const pos = d3.mouse(document.body)
      const origSvgNode = selection.node()
      const {width, height} = origSvgNode.getBoundingClientRect()
      const svgNode = origSvgNode.cloneNode(true)
      d3.select(svgNode)
        .attr({
          version: '1.1',
          xmlns: 'http://www.w3.org/2000/svg',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink',
          width: width,
          height: height
        })
      const svgText = svgNode.outerHTML
      const base64SvgText = window.btoa(
        encodeURIComponent(svgText)
          .replace(/%([0-9A-F]{2})/g,
                   (match, p1) => String.fromCharCode('0x' + p1)))
      toCanvas(base64SvgText, width, height, (canvas) => {
        createMenu(pos, filename, canvas, base64SvgText)
      })
      d3.event.preventDefault()
    })
  }

  downloadableImpl.filename = function () {
    if (arguments.length === 0) {
      return filename
    }
    filename = arguments[0]
    return downloadableImpl
  }

  return downloadableImpl
}

module.exports = downloadable
