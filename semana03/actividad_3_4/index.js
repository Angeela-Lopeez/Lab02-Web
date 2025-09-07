const fs = require('fs');

const readable = fs.createReadStream('entrada.txt', { encoding: 'utf8' });
const writable = fs.createWriteStream('salida.txt');

readable.on('data', chunk => {
  if (!writable.write(chunk)) {
    readable.pause();
  }
});

writable.on('drain', () => readable.resume());
