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
    localStorage.setItem('savedText', encryptedText); // Save encrypted text to local storage
  }
  
  // Function to decrypt text using the same substitution cipher (shift by user-defined amount)
  function decrypt() {
    const inputText = document.getElementById('input-text').value;
    const shift = parseInt(document.getElementById('shift-value').value) || 0;
    const decryptedText = inputText.split('').map(char => {
      // Shift each character by the specified amount (in reverse)
      const charCode = char.charCodeAt(0);
      // Handle wrapping around for printable ASCII characters (32 to 126)
      return String.fromCharCode(((charCode - 32 - shift + 95) % 95 + 95) % 95 + 32);
    }).join('');
    document.getElementById('output-text').value = decryptedText;
    localStorage.setItem('savedText', decryptedText); // Save decrypted text to local storage
  }
  
  // Function to copy the text to the clipboard
  function copyToClipboard() {
    const outputText = document.getElementById('output-text');
    outputText.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
  }
  
  // Function to clear input and output text areas
  function clearText() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
  }
  
  // Function to save the current text to local storage
  function saveText() {
    const outputText = document.getElementById('output-text').value;
    localStorage.setItem('savedText', outputText);
    alert('Text saved to local storage!');
  }
  
  // Function to load the text from local storage
  function loadText() {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
      document.getElementById('input-text').value = savedText;
      document.getElementById('output-text').value = savedText;
    } else {
      alert('No text found in local storage!');
    }
  }
  
  // Function to toggle between encrypted and decrypted text
  function toggleText() {
    const inputText = document.getElementById('input-text').value;
    const outputText = document.getElementById('output-text').value;
    if (inputText === outputText) {
      document.getElementById('output-text').value = '';
      document.getElementById('input-text').value = outputText;
    } else {
      document.getElementById('input-text').value = '';
      document.getElementById('output-text').value = inputText;
    }
  }
  