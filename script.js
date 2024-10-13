// DOM Elements
const themeButton = document.getElementById('theme-btn');
const generateButton = document.getElementById('generateButton');
let currentTheme = localStorage.getItem('theme');

// Apply Current Theme
if (currentTheme === 'dark') {
  enableDarkMode();
} else {
  enableLightMode();
}

// Event Listeners
if (themeButton) {
  themeButton.addEventListener('click', setTheme);
}
if (generateButton) {
  generateButton.addEventListener('click', generateQRCodeHandler);
}

// Function to Handle Theme
function setTheme() {
  currentTheme = localStorage.getItem('theme');
  if (currentTheme !== 'dark') {
    enableDarkMode();
  } else {
    enableLightMode();
  }
}

// Enable Dark Mode
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
  themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Enable Light Mode
function enableLightMode() {
  document.body.classList.remove('dark-mode');
  localStorage.removeItem('theme');
  themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

// Function to Handle the Generation of QR Code
function generateQRCodeHandler() {
  const qrText = document.getElementById('qrText').value.trim();
  const qrSize = parseInt(document.getElementById('qrSize').value) || 200; // Default Size: 200
  const qrFormat = document.getElementById('qrFormat').value || 'png'; // Default Format: 'png'
  const qrCodeContainer = document.getElementById('qrCode');

  // Clear Previous QR Code
  qrCodeContainer.innerHTML = '';

  if (qrText) {
    try {
      generateQRCode(qrText, qrSize, qrCodeContainer);
      setupDownloadButton(qrFormat);
      setupShareButton(qrFormat);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('An error occurred while generating the QR code.');
    }
  } else {
    alert('Please enter a URL or text to generate a QR code.');
  }
}

// Function to Generate a New QR Code using 'QRious Library'
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

// Function to Handle 'Download'
function setupDownloadButton(qrFormat) {
  const downloadButton = document.getElementById('downloadButton');
  if (downloadButton) {
    downloadButton.onclick = () => {
      const qrCanvas = document.querySelector('#qrCode canvas');
      const mimeType = `image/${qrFormat}`;
      const dataURL = qrCanvas.toDataURL(mimeType);
      const link = document.createElement('a');

      link.href = dataURL;
      link.download = `QRazyCode.${qrFormat}`;
      link.click();
    };
  }
}

// Function to Handle 'Share' option using 'Web Share API'
function setupShareButton(qrFormat) {
  const shareButton = document.getElementById('shareButton');
  if (shareButton) {
    shareButton.onclick = () => {
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
}