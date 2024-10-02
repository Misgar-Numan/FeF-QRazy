document.getElementById('generateButton').addEventListener('click', function () {
  const qrText = document.getElementById('qrText').value;
  const qrSize = parseInt(document.getElementById('qrSize').value) || 200; // Default Size: 200
  const qrFormat = document.getElementById('qrFormat').value || 'png'; // Default Format: 'png'
  const qrCodeContainer = document.getElementById('qrCode');

  // Clear previous QR code
  qrCodeContainer.innerHTML = '';

  if (qrText) {
    generateQRCode(qrText, qrSize, qrCodeContainer);
    setupDownloadButton(qrFormat);
    setupShareButton(qrFormat);
  } else {
    alert('Please enter a URL or text to generate a QR code.');
  }
});

// Function to generate a new QR Code using 'QRious' Library
function generateQRCode(text, size, container) {
  const qr = new QRious({
    element: document.createElement('canvas'),
    value: text,
    size: size,
    level: 'H'
  });

  container.appendChild(qr.canvas);

  // Display Download and Share Button
  document.querySelector('.download-share-buttons').style.display = 'flex';
}

// Function to handle 'Download' option
function setupDownloadButton(qrFormat) {
  const downloadButton = document.getElementById('downloadButton');
  downloadButton.onclick = function () {
    const qrCanvas = document.querySelector('#qrCode canvas');
    let mimeType = `image/${qrFormat}`;
    let dataURL = qrCanvas.toDataURL(mimeType);

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `QRazyCode.${qrFormat}`;
    link.click();
  };
}

// Function to handle 'Share' option using 'Web Share API'
function setupShareButton(qrFormat) {
  const shareButton = document.getElementById('shareButton');
  shareButton.onclick = function () {
    const qrCanvas = document.querySelector('#qrCode canvas');
    qrCanvas.toBlob(function (blob) {
      const file = new File([blob], `QRazyCode.${qrFormat}`, { type: `image/${qrFormat}` });

      if (navigator.share) {
        navigator.share({
          title: 'QRazy Code',
          text: 'Check out this QR Code',
          files: [file]
        })
          .then(() => console.log('QR Code Shared Successfully'))
          .catch((error) => console.log('Error Sharing: ', error));
      } else {
        alert('Sharing is not supported on your current device or browser.');
      }
    }, `image/${qrFormat}`);
  };
}