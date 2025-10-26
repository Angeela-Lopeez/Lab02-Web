const http = require('http');
const ExcelJS = require('exceljs');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/reporte') {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Ventas');

      worksheet.columns = [
        { header: 'Producto', key: 'producto', width: 20 },
        { header: 'Cantidad', key: 'cantidad', width: 10 },
        { header: 'Precio', key: 'precio', width: 10 }
      ];

      for (let i = 1; i <= 20; i++) {
        worksheet.addRow({
          producto: `Producto ${i}`,
          cantidad: Math.floor(Math.random() * 100) + 1,
          precio: (Math.random() * 50 + 10).toFixed(2)
        });
      }

      res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="reporte.xlsx"'
      });

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error al generar el Excel:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error al generar el reporte');
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Visita /reporte para descargar el Excel');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});