/* web crypto API */

async function encryptMessage() {
  const message = document.getElementById("message").value;
  if (!message) {
    alert("Please enter a message to encrypt");
    return;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const encryptedBase64 = arrayBufferToBase64(encrypted);

  document.getElementById("encrypted-result").innerText =
    "🔐 Encrypted Message: " + encryptedBase64;
}
/* Web Speech API */
const micBtn = document.getElementById('mic-btn');
const instruction = document.getElementById('mic-instruction');
const result = document.getElementById('mic-result');