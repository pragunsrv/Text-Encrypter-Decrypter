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
  analyzeFrequency(encryptedText);
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
      try {
        decryptedText = base32Decode(inputText);
      } catch (e) {
        alert('Invalid Base32 encoded text!');
        return;
      }
      break;
    default:
      alert('Invalid decryption method!');
      return;
  }

  document.getElementById('output-text').value = decryptedText;
  localStorage.setItem('savedText', decryptedText);
  addToHistory(inputText, decryptedText, 'decrypt');
  analyzeFrequency(decryptedText);
}

// Base32 Encoding function
function base32Encode(input) {
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let binary = '';

  for (const char of input) {
    binary += char.charCodeAt(0).toString(2).padStart(8, '0');
  }

  let output = '';
  let padding = '';
  for (let i = 0; i < binary.length; i += 5) {
    const segment = binary.slice(i, i + 5);
    output += base32Chars[parseInt(segment, 2)];
  }

  if (binary.length % 8 !== 0) {
    padding = '='.repeat((8 - (binary.length % 8)) / 5);
    output += padding;
  }

  return output;
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
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => listItem.remove();
  
  listItem.appendChild(deleteButton);
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

// Function to save settings to local storage
function saveSettings() {
  const settings = {
    method: document.getElementById('encryption-method').value,
    shift: document.getElementById('shift-value').value,
    format: document.getElementById('case-format').value
  };
  localStorage.setItem('encryptionSettings', JSON.stringify(settings));
  alert('Settings saved!');
}

// Function to load settings from local storage
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem('encryptionSettings'));
  if (settings) {
    document.getElementById('encryption-method').value = settings.method;
    document.getElementById('shift-value').value = settings.shift;
    document.getElementById('case-format').value = settings.format;
    alert('Settings loaded!');
  } else {
    alert('No settings found!');
  }
}

// Function to clear history
function clearHistory() {
  document.getElementById('history-list').innerHTML = '';
}

// Function to export history to JSON file
function exportHistory() {
  const historyItems = document.querySelectorAll('#history-list li');
  const historyArray = Array.from(historyItems).map(item => item.textContent);
  const blob = new Blob([JSON.stringify(historyArray)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'history.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Function to import history from JSON file
function importHistory() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const historyArray = JSON.parse(event.target.result);
      const historyList = document.getElementById('history-list');
      historyArray.forEach(itemText => {
        const listItem = document.createElement('li');
        listItem.textContent = itemText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => listItem.remove();

        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);
      });
    };
    reader.readAsText(file);
  };
  input.click();
}

// Function to filter history
function filterHistory() {
  const filterText = document.getElementById('search-history').value.toLowerCase();
  const historyItems = document.querySelectorAll('#history-list li');
  historyItems.forEach(item => {
    if (item.textContent.toLowerCase().includes(filterText)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Function to analyze character frequency
function analyzeFrequency(text) {
  const frequencyResult = document.getElementById('frequency-result');
  const frequency = {};

  text.split('').forEach(char => {
    frequency[char] = (frequency[char] || 0) + 1;
  });

  frequencyResult.innerHTML = Object.entries(frequency)
    .map(([char, count]) => `${char}: ${count}`)
    .join('<br>');
}
