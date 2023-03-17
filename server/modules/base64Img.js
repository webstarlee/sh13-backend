import path from "path";
import fs from "fs";

function imgToBase64(filename, data) {
  var extname = path.extname(filename).substr(1);
  extname = extname || 'png';

  if (extname === 'svg') {
    extname = "svg+xml"
  }
  
  return 'data:image/' + extname + ';base64,' + data.toString('base64');
}

function base64ToImg(data) {
  var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  var match = data.match(reg);
  var baseType = {
    jpeg: 'jpg'
  };

  baseType['svg+xml'] = 'svg'

  if (!match) {
    throw new Error('image base64 data error');
  }

  var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: '.' + extname,
    base64: match[2]
  };
}

export function base64(filename, callback) {
  if (!callback) callback = util.noop;

  fs.readFile(filename, function(err, data) {
    if (err) return callback(err);

    callback(null, imgToBase64(filename, data));
  });
}

export function img(data, destpath, name, callback) {
  var result = base64ToImg(data);
  var filepath = path.join(destpath, name + result.extname);

  fs.writeFile(filepath, result.base64, { encoding: 'base64' }, function(err) {
    callback(err, filepath);
  });
};

const base64Img = {
  base64,
  img
}

export default base64Img;