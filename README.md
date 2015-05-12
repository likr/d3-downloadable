# d3-downloadable

Make SVG downloadable.

## Install

### Bower

```bash
$ bower install d3-downloadable
```

### NPM

```bash
$ npm install d3-downloadable
```

## Usage

### Bower

```html
<script src="d3.js"></script>
<script src="d3-downloadable.js"></script>
```

```javascript
d3.select('svg#chart')
  .call(downloadable());
```

### NPM

```javascript
var d3 = require('d3');
var downloadable = require('d3-downloadable');

d3.select('svg#chart')
  .call(downloadable());
```

## Example

http://likr.github.io/d3-downloadable

## License

MIT
