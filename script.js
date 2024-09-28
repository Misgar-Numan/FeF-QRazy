document.getElementById('generateButton').addEventListener('click', function () {
  const qrText = document.getElementById('qrText').value;
  const qrWidth = parseInt(document.getElementById('qrWidth').value) || 200;
  const qrHeight = parseInt(document.getElementById('qrHeight').value) || 200;
  const qrCodeContainer = document.getElementById('qrCode');
  qrCodeContainer.innerHTML = ''; // Clear previous QR Code

  if (qrText) {
    const qr = new QRious({
      element: document.createElement('canvas'),
      value: qrText,
      size: Math.min(qrWidth, qrHeight), // Use the smaller dimension for size
      level: 'H' // High error correction level for better scannability
    });

    qrCodeContainer.appendChild(qr.canvas); // Append canvas to the container

    // Show the download button
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'block';

    // Download QR code as an image
    downloadButton.onclick = function () {
      const link = document.createElement('a');
      link.href = qr.canvas.toDataURL('image/png');
      link.download = 'QRazy-code.png';
      link.click();
    };
  } else {
    alert("Please enter a URL or text to generate a QR code.");
  }
});
