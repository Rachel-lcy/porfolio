
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#nav-toggle');
  const menu = document.querySelector('#hamburger-nav .menu-links');

  if (toggle && menu) {
    const toggleMenu = () => {
      const isOpen = menu.dataset.state === 'open';
      menu.dataset.state = isOpen ? 'closed' : 'open';
      menu.setAttribute('aria-hidden', String(isOpen));
      toggle.setAttribute('aria-expanded', String(!isOpen));
      document.body.classList.toggle('no-scroll', !isOpen);
      toggle.classList.toggle('open', !isOpen);
    };


    toggle.addEventListener('click', toggleMenu);
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) toggleMenu();
    });
  }
});


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

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  micBtn.addEventListener('click', () => {
    recognition.start();
    instruction.textContent = '🔊 Listening...';
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    result.textContent = `You said: "${transcript}"`;
    setTimeout(() => feedback.textContent = '', 2000);

    setTimeout(() => {
      instruction.textContent = 'Say: "Go to Projects", "Contact", "Experience", "Blog" or "Open Resume"';
      result.textContent = '';
    },2000)


    if (transcript.includes('project')) {
      document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    } else if (transcript.includes('contact')) {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    } else if (transcript.includes('experience')) {
      document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
    } else if (transcript.includes('about')) {
      document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    } else if (transcript.includes('top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (transcript.includes('blog')) {
      window.open('https://nodejs-blog-c5o4.onrender.com/', '_blank');
    } else if (transcript.includes('resume') || transcript.includes('cv')) {
      window.open('./assets/resume-example.pdf', '_blank');
    } else if (transcript.includes('travel blog website')) {
      window.open('https://travel-blog-website-six.vercel.app/', '_blank');
    } else if (transcript.includes('restaurant')) {
      window.open('https://github.com/Rachel-lcy', '_blank');
    } else if (transcript.includes('pet') || transcript.includes('peak pets')) {
      window.open('https://pets-website-steel.vercel.app/', '_blank');
    } else {
      instruction.textContent = '❗ Command not recognized. Try "Go to projects" or "Open Resume"';
    }
  };



  recognition.onerror = () => {
    instruction.textContent = '❗ Speech recognition error. Please try again.';
  }

} else {
  micBtn.disabled = true;
  instruction.textContent = '❗ Your browser does not support Web Speech API';
}