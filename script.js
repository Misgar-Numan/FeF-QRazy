document.getElementById('generateButton').addEventListener('click', function () {
  const qrText = document.getElementById('qrText').value;
  const qrSize = parseInt(document.getElementById('qrSize').value) || 200; // Default Size: 200
  const qrCodeContainer = document.getElementById('qrCode');

  qrCodeContainer.innerHTML = ''; // Clear previous QR Code

  if (qrText) {
    const qr = new QRious({
      element: document.createElement('canvas'),
      value: qrText,
      size: qrSize,
      level: 'H' // High error correction level for better scannability
    });

    qrCodeContainer.appendChild(qr.canvas); // Append canvas to the container

    // Show the download button
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'block';

    // Download QR code
    downloadButton.onclick = function () {
      const format = document.getElementById('qrFormat').value || 'png'; // Default Format: 'png'
      let mimeType;
      let dataURL;

      if (format === 'png') {
        mimeType = 'image/png';
        dataURL = qr.canvas.toDataURL(mimeType);
      } else if (format === 'jpeg') {
        mimeType = 'image/jpeg';
        dataURL = qr.canvas.toDataURL(mimeType);
      }
      
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `QRazyCode.${format}`;
      link.click();
    };
  } else {
    alert("Please enter a URL or text to generate a QR code.");
  }
});
