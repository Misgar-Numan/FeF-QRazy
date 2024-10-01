document.getElementById('generateButton').addEventListener('click', function () {
  const qrText = document.getElementById('qrText').value;
  const qrSize = parseInt(document.getElementById('qrSize').value);
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

    // Download QR code as an image
    downloadButton.onclick = function () {
      const format = document.getElementById('qrFormat').value;
      let mimeType;
      if (format === 'png') {
        mimeType = 'image/png';
      } else {
        mimeType = 'image/jpeg';
      }
      const link = document.createElement('a');
      link.href = qr.canvas.toDataURL(mimeType);
      link.download = `QRazyCode.${format}`;
      link.click();
    };
  } else {
    alert("Please enter a URL or text to generate a QR code.");
  }
});
