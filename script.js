document.getElementById('generateButton').addEventListener('click', function () {
  const qrText = document.getElementById('qrText').value;
  const qrSize = parseInt(document.getElementById('qrSize').value) || 200; // Default Size: 200
  const format = document.getElementById('qrFormat').value || 'png'; // Default Format: 'png'
  const qrCodeContainer = document.getElementById('qrCode');

  // Clear previous QR code
  qrCodeContainer.innerHTML = '';

  if (qrText) {
    // Generate new QR code using QRious
    const qr = new QRious({
      element: document.createElement('canvas'),
      value: qrText,
      size: qrSize,
      level: 'H'
    });

    qrCodeContainer.appendChild(qr.canvas);

    // Display download and share buttons
    document.querySelector('.download-share-buttons').style.display = 'flex';

    // Download QR Code functionality
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.onclick = function () {
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

    // Share QR Code functionality
    const shareButton = document.getElementById('shareButton');
    shareButton.onclick = function () {
      qr.canvas.toBlob(function (blob) {
        const file = new File([blob], `QRazyCode.${format}`, { type: `image/${format}` });

        if (navigator.share) {
          navigator.share({
            title: 'QRazy Code',
            text: 'Check out this QR Code',
            files: [file]
          })
            .then(() => console.log('QR Code Shared Successfully'))
            .catch((error) => console.log('Error Sharing: ', error));
        } else {
          alert('Sharing is not supported on your device or browser.');
        }
      }, `image/${format}`);
    };

  } else {
    alert('Please enter a URL or text to generate a QR code.');
  }
});
