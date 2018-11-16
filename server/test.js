var qr = require('qr-image');

var qr_svg = qr.image('23423222', { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream('qr123.png'));

// var svg_string = qr.imageSync('I love QR!', { type: 'svg' });


// var code = qr.image("23455544", { type: 'png', ec_level: 'H', size: 10, margin: 0 });
//    res.setHeader('Content-type', 'image/png');
//    code.pipe(res);
