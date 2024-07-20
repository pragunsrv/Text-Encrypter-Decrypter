// Function to encrypt text using a substitution cipher (shift by user-defined amount)
function encrypt() {
    const inputText = document.getElementById('input-text').value;
    const shift = parseInt(document.getElementById('shift-value').value) || 0;
    const encryptedText = inputText.split('').map(char => {
      // Shift each character by the specified amount
      const charCode = char.charCodeAt(0);
      // Handle wrapping around for printable ASCII characters (32 to 126)
      return String.fromCharCode(((charCode - 32 + shift) % 95 + 95) % 95 + 32);
    }).join('');
    document.getElementById('output-text').value = encryptedText;
  }
  
  // Function to copy the encrypted text to the clipboard
  function copyToClipboard() {
    const outputText = document.getElementById('output-text');
    outputText.select();
    document.execCommand('copy');
    alert('Encrypted text copied to clipboard!');
  }
  
  // Function to clear input and output text areas
  function clearText() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
  }
  