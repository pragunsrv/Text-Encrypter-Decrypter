// Function to encrypt text using selected method
function encrypt() {
    const inputText = document.getElementById('input-text').value;
    const shift = parseInt(document.getElementById('shift-value').value) || 0;
    const method = document.getElementById('encryption-method').value;
    const caseFormat = document.getElementById('case-format').value;
    let encryptedText;
  
    switch (method) {
      case 'caesar':
        encryptedText = inputText.split('').map(char => {
          const charCode = char.charCodeAt(0);
          return String.fromCharCode(((charCode - 32 + shift) % 95 + 95) % 95 + 32);
        }).join('');
        break;
      case 'base64':
        encryptedText = btoa(inputText);
        break;
      case 'rot13':
        encryptedText = inputText.split('').map(char => {
          const charCode = char.charCodeAt(0);
          return String.fromCharCode(((charCode - 32 + 13) % 95 + 95) % 95 + 32);
        }).join('');
        break;
      case 'base32':
        encryptedText = base32Encode(inputText);
        break;
      default:
        alert('Invalid encryption method!');
        return;
    }
  
    if (caseFormat === 'uppercase') {
      encryptedText = encryptedText.toUpperCase();
    } else if (caseFormat === 'lowercase') {
      encryptedText = encryptedText.toLowerCase();
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
  
    switch (method) {
      case 'caesar':
        decryptedText = inputText.split('').map(char => {
          const charCode = char.charCodeAt(0);
          return String.fromCharCode(((charCode - 32 - shift + 95) % 95 + 95) % 95 + 32);
        }).join('');
        break;
      case 'base64':
        try {
          decryptedText = atob(inputText);
        } catch (e) {
          alert('Invalid Base64 encoded text!');
          return;
        }
        break;
      case 'rot13':
        decryptedText = inputText.split('').map(char => {
          const charCode = char.charCodeAt(0);
          return String.fromCharCode(((charCode - 32 - 13 + 95) % 95 + 95) % 95 + 32);
        }).join('');
        break;
      case 'base32':
        decryptedText = base32Decode(inputText);
        break;
      default:
        alert('Invalid decryption method!');
        return;
    }
  
    document.getElementById('output-text').value = decryptedText;
    localStorage.setItem('savedText', decryptedText);
    addToHistory(inputText, decryptedText, 'decrypt');
  }
  
  // Base32 Encoding function
  function base32Encode(input) {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let output = '';
    let padding = 0;
    
    for (let i = 0; i < input.length; i += 5) {
      const chunk = input.slice(i, i + 5);
      const binary = chunk.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
      }).join('');
      
      for (let j = 0; j < binary.length; j += 5) {
        const segment = binary.slice(j, j + 5);
        output += base32Chars[parseInt(segment, 2)];
      }
      if (chunk.length < 5) {
        padding += 8 - binary.length % 8;
      }
    }
    
    return output.padEnd(output.length + (padding / 8), '=');
  }
  
  // Base32 Decoding function
  function base32Decode(input) {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let binary = '';
    
    for (const char of input) {
      if (char !== '=') {
        const index = base32Chars.indexOf(char);
        if (index === -1) {
          throw new Error('Invalid Base32 character');
        }
        binary += index.toString(2).padStart(5, '0');
      }
    }
    
    let output = '';
    for (let i = 0; i < binary.length; i += 8) {
      const segment = binary.slice(i, i + 8);
      output += String.fromCharCode(parseInt(segment, 2));
    }
    
    return output;
  }
  
  // Function to add text to history
  function addToHistory(input, output, type) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${type.toUpperCase()}: ${input} -> ${output}`;
    historyList.appendChild(listItem);
  }
  
  // Function to copy text to clipboard
  function copyToClipboard() {
    const outputText = document.getElementById('output-text').value;
    navigator.clipboard.writeText(outputText)
      .then(() => alert('Copied to clipboard'))
      .catch(err => alert('Failed to copy: ' + err));
  }
  
  // Function to clear text areas
  function clearText() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
  }
  
  // Function to save text to local storage
  function saveText() {
    const inputText = document.getElementById('input-text').value;
    const outputText = document.getElementById('output-text').value;
    localStorage.setItem('savedText', JSON.stringify({ input: inputText, output: outputText }));
  }
  
  // Function to load text from local storage
  function loadText() {
    const savedText = JSON.parse(localStorage.getItem('savedText'));
    if (savedText) {
      document.getElementById('input-text').value = savedText.input || '';
      document.getElementById('output-text').value = savedText.output || '';
    } else {
      alert('No saved text found!');
    }
  }
  
  // Function to clear history
  function clearHistory() {
    document.getElementById('history-list').innerHTML = '';
  }
  
  // Function to export history
  function exportHistory() {
    const historyList = document.getElementById('history-list');
    const historyItems = Array.from(historyList.children).map(item => item.textContent);
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
  
  // Function to filter history based on search input
  function filterHistory() {
    const searchInput = document.getElementById('search-history').value.toLowerCase();
    const historyItems = document.getElementById('history-list').children;
  
    Array.from(historyItems).forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchInput)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  