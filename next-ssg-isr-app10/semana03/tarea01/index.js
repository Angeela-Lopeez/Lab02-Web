const { Transform } = require('stream');
const fs = require('fs');
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});
const readStream = fs.createReadStream('texto.txt', { encoding: 'utf-8' });

const writeStream = fs.createWriteStream('texto_mayusculas.txt');

readStream
    .pipe(transformStream)
    .pipe(writeStream)
    .on('finish', () => {
        console.log('Archivo transformado correctamente');
    });
    