const d3 = require('d3')
const {SVGConverter} = require('svg-dataurl')

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

const createMenu = (pos, filename, converter) => {
  const menu = d3.select('body')
    .append('ul')
    .classed('download-menu', true)
    .style('left', `${pos[0]}px`)
    .style('top', `${pos[1]}px`)
    .on('mouseleave', () => {
      menu.remove()
    })
  const list = menu
    .append('li')
  list
    .append('a')
    .text('Save as SVG')
    .attr('download', filename + '.svg')
    .attr('href', converter.svgDataURL())
  list
    .append('a')
    .text('Save as PNG')
    .attr('download', filename + '.png')
    .attr('href', converter.pngDataURL())
  list
    .append('a')
    .text('Save as JPG')
    .attr('download', filename + '.jpeg')
    .attr('href', converter.jpegDataURL())
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
      const f = () => {
        const pos = d3.mouse(document.body)
        SVGConverter.loadFromElement(selection.node()).then((converter) => {
          createMenu(pos, filename, converter)
        })
        d3.event.preventDefault()
      }
      if (d3.event == null) {
        d3.customEvent(window.event, f) // Hack for React
      } else {
        f()
      }
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

exports.downloadable = downloadable
