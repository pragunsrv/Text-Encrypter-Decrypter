# Text Encrypter/Decrypter

## Overview

The Text Encrypter/Decrypter is a web-based tool designed to encrypt and decrypt text using various methods. It offers advanced features such as base32 encoding, QR code generation, password protection, and more. The tool is built with HTML, CSS, and JavaScript.

## Features

- **Encryption Methods**:
  - Caesar Cipher
  - Base64 Encoding
  - ROT13 Cipher
  - Base32 Encoding

- **Decryption Methods**:
  - Caesar Cipher
  - Base64 Decoding
  - ROT13 Cipher
  - Base32 Decoding

- **Password Protection**: Encrypt and decrypt text using a user-defined password.

- **QR Code Generation**: Generate a QR code for the encrypted or decrypted text.

- **History Management**: Save, view, delete, and filter historical encryption/decryption records.

- **File Operations**: Save encrypted/decrypted text to a file and import/export history.

- **Night Mode**: Toggle night mode for improved readability in low-light conditions.

- **Character Frequency Analysis**: Analyze the frequency of characters in the encrypted/decrypted text.

## Files

- `index.html`: The main HTML file containing the structure of the application.
- `styles.css`: The CSS file for styling the application.
- `script.js`: The JavaScript file containing the logic for encryption, decryption, and other features.

## Installation

1. Clone this repository:
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```sh
   cd <project-directory>
   ```

3. Open `index.html` in your web browser to use the application.

## Usage

1. **Encryption**:
   - Enter the text you want to encrypt in the "Input Text" area.
   - Choose the encryption method from the dropdown.
   - (Optional) Enter a shift value for Caesar Cipher.
   - (Optional) Choose the case format (uppercase or lowercase).
   - (Optional) Enter a password for additional security.
   - Click the "Encrypt" button to see the encrypted text.

2. **Decryption**:
   - Enter the text you want to decrypt in the "Input Text" area.
   - Choose the decryption method from the dropdown.
   - (Optional) Enter a shift value for Caesar Cipher.
   - (Optional) Enter a password if it was used during encryption.
   - Click the "Decrypt" button to see the decrypted text.

3. **Additional Features**:
   - **Generate QR Code**: Click "Generate QR Code" to create a QR code for the encrypted or decrypted text.
   - **Save to File**: Click "Save to File" to download the output text as a `.txt` file.
   - **Night Mode**: Toggle night mode for better visibility in dark environments.
   - **History Management**: View, filter, and manage encryption/decryption history.

## Dependencies

- `qrcode.min.js`: For generating QR codes.

## Contributing

Feel free to fork this repository and submit pull requests. For bug reports or feature requests, please open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy encrypting and decrypting!
