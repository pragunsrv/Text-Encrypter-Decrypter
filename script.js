// Function to encrypt text
function encrypt() {
    const inputText = document.getElementById('input-text').value;
    const shift = parseInt(document.getElementById('shift-value').value) || 0;
    const encryptedText = inputText.split('').map(char => {
      const charCode = char.charCodeAt(0);
      return String.fromCharCode(((charCode - 32 + shift) % 95 + 95) % 95 + 32);
    }).join('');
    document.getElementById('output-text').value = encryptedText;
    localStorage.setItem('savedText', encryptedText);
    addToHistory(inputText, encryptedText, 'encrypt');
  }
  
  // Function to decrypt text
  function decrypt() {
    const inputText = document.getElementById('input-text').value;
    const shift = parseInt(document.getElementById('shift-value').value) || 0;
    const decryptedText = inputText.split('').map(char => {
      const charCode = char.charCodeAt(0);
      return String.fromCharCode(((charCode - 32 - shift + 95) % 95 + 95) % 95 + 32);
    }).join('');
    document.getElementById('output-text').value = decryptedText;
    localStorage.setItem('savedText', decryptedText);
    addToHistory(inputText, decryptedText, 'decrypt');
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
  
  // Function to add the encryption/decryption to history
  function addToHistory(input, output, type) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Type: ${type}, Input: ${input}, Output: ${output}`;
    historyList.appendChild(listItem);
  }
  
  // Function to filter the history list based on the search input
  function filterHistory() {
    const filter = document.getElementById('search-history').value.toLowerCase();
    const historyItems = document.getElementById('history-list').getElementsByTagName('li');
    Array.from(historyItems).forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  