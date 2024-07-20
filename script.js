// Function to encrypt text using selected method
function encrypt() {
    const inputText = document.getElementById('input-text').value;
    const shift = parseInt(document.getElementById('shift-value').value) || 0;
    const method = document.getElementById('encryption-method').value;
    let encryptedText;
  
    if (method === 'caesar') {
      encryptedText = inputText.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(((charCode - 32 + shift) % 95 + 95) % 95 + 32);
      }).join('');
    } else if (method === 'base64') {
      encryptedText = btoa(inputText);
    } else {
      alert('Invalid encryption method!');
      return;
    }
  
    document.getElementById('output-text').value = encryptedText;
    localStorage.setItem('savedText', encryptedText);
    addToHistory(inputText, encryptedText, 'encrypt');
  }
  
  // Function to decrypt text using selected method
  function decrypt() {
    const inputText = document.getElementById('input-text').value;
    const shift = parseInt(document.getElementById('shift-value').value) || 0;
    const method = document.getElementById('encryption-method').value;
    let decryptedText;
  
    if (method === 'caesar') {
      decryptedText = inputText.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(((charCode - 32 - shift + 95) % 95 + 95) % 95 + 32);
      }).join('');
    } else if (method === 'base64') {
      try {
        decryptedText = atob(inputText);
      } catch (e) {
        alert('Invalid Base64 encoded text!');
        return;
      }
    } else {
      alert('Invalid decryption method!');
      return;
    }
  
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
  
  // Function to clear the history
  function clearHistory() {
    document.getElementById('history-list').innerHTML = '';
  }
  
  // Function to export the history to a file
  function exportHistory() {
    const historyList = document.getElementById('history-list');
    const historyItems = Array.from(historyList.getElementsByTagName('li')).map(item => item.textContent);
    const blob = new Blob([historyItems.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'history.txt';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Function to import history from a file
  function importHistory() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    fileInput.onchange = function(event) {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result.split('\n');
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        content.forEach(line => {
          const listItem = document.createElement('li');
          listItem.textContent = line;
          historyList.appendChild(listItem);
        });
      };
      reader.readAsText(file);
    };
    fileInput.click();
  }
  