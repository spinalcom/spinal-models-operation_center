var exports = (module.exports = {});

function toRGB(color, opacity) {
  let R = hexToR(color) / 255;
  let G = hexToG(color) / 255;
  let B = hexToB(color) / 255;
  return new THREE.Vector4(R, G, B, 0.5);
}
exports.toRGB = toRGB;

function hexToR(h) {
  return parseInt(cutHex(h).substring(0, 2), 16);
}

function hexToG(h) {
  return parseInt(cutHex(h).substring(2, 4), 16);
}

function hexToB(h) {
  return parseInt(cutHex(h).substring(4, 6), 16);
}

function cutHex(h) {
  return h.charAt(0) == "#" ? h.substring(1, 7) : h;
}



function colorByValue(_value, _min, _max) {
  let dx = 0.8;
  let min = _min;
  let max = _max;

  let lin = linMapValue(_value, min, max);
  let g = (6 - 2 * dx) * lin + dx;
  let R = Math.max(0, (3 - Math.abs(g - 4) - Math.abs(g - 5)) / 2);
  let G = Math.max(0, (4 - Math.abs(g - 2) - Math.abs(g - 4)) / 2);
  let B = Math.max(0, (3 - Math.abs(g - 1) - Math.abs(g - 2)) / 2);
  R = Math.floor(R * 255);
  G = Math.floor(G * 255);
  B = Math.floor(B * 255);

  let newcolor = rgbToHex(R, G, B);
  return newcolor;
}
exports.colorByValue = colorByValue;

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) +
    componentToHex(b);
}

function VBColorToHEX(i) {
  var bbggrr = ("000000" + i.toString(16)).slice(-6);
  var rrggbb =
    bbggrr.substr(4, 2) + bbggrr.substr(2, 2) + bbggrr.substr(0, 2);
  return "#" + rrggbb;
}

function linMap(list) {
  (mx = max(list)), (mn = min(list));
  return [((x - mn) / (mx - mn)) | (x < -list)];
}

function linMapValue(value, min, max) {
  return (value - min) / (max - min);
}

function max(list) {
  var max = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i] > max) max = list[i];
  }
  return max;
}

function min(list) {
  var min = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i] < max) min = list[i];
  }
  return min;
}