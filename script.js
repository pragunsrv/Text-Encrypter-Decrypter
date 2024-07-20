// Function to encrypt text using a simple substitution cipher (shift by 3)
function encrypt() {
    const inputText = document.getElementById('input-text').value;
    const shift = 3;
    const encryptedText = inputText.split('').map(char => {
      if (char >= 'a' && char <= 'z') {
        // Shift lowercase letters
        return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
      } else if (char >= 'A' && char <= 'Z') {
        // Shift uppercase letters
        return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
      } else {
        // Non-alphabetic characters remain unchanged
        return char;
      }
    }).join('');
    document.getElementById('output-text').value = encryptedText;
  }
  