document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // Mobile nav toggle
  // ---------------------------
  const toggle = document.querySelector("#nav-toggle");
  const menu = document.querySelector(".menu-links");

  if (toggle && menu) {
    const toggleMenu = () => {
      const isOpen = menu.dataset.state === "open";
      menu.dataset.state = isOpen ? "closed" : "open";
      menu.setAttribute("aria-hidden", String(isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("no-scroll", !isOpen);
      toggle.classList.toggle("open", !isOpen);
    };

    toggle.addEventListener("click", toggleMenu);

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleMenu());
    });
  }

  // ---------------------------
  // Web Speech API (Voice Control)
  // ---------------------------
  const micBtn = document.getElementById("mic-btn");
  const instruction = document.getElementById("mic-instruction");
  const result = document.getElementById("mic-result");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!micBtn || !instruction || !result) return;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    micBtn.addEventListener("click", () => {
      recognition.start();
      instruction.textContent = "🔊 Listening...";
      result.textContent = "";
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      result.textContent = `You said: "${transcript}"`;

      // Reset UI after 2 seconds
      setTimeout(() => {
        instruction.textContent =
          'Say: "Go to Projects", "Capabilities", "Contact", "About", "Experience", or "Open Resume"';
        result.textContent = "";
      }, 2000);

      // Commands
      if (transcript.includes("project")) {
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
      } else if (transcript.includes("capabil") || transcript.includes("skills")) {
        document.querySelector("#capabilities")?.scrollIntoView({ behavior: "smooth" });
      } else if (transcript.includes("contact")) {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      } else if (transcript.includes("experience")) {
        document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
      } else if (transcript.includes("about")) {
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
      } else if (transcript.includes("top") || transcript.includes("home")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (transcript.includes("blog")) {
        window.open("https://nodejs-blog-c5o4.onrender.com/", "_blank");
      } else if (transcript.includes("resume") || transcript.includes("cv")) {
        window.open("./assets/RACHEL_HU_Resume_Design Version.pdf", "_blank");
      } else if (transcript.includes("ai resume") || transcript.includes("resume analyzer")) {
        window.open("business-ai.html", "_blank");
      } else if (transcript.includes("peak pets") || transcript.includes("pet")) {
        window.open("business-peakpets.html", "_blank");
      } else {
        instruction.textContent =
          '❗ Command not recognized. Try "Go to projects" or "Open resume"';
      }
    };

    recognition.onerror = () => {
      instruction.textContent = "❗ Speech recognition error. Please try again.";
    };
  } else {
    micBtn.disabled = true;
    instruction.textContent = "❗ Your browser does not support Web Speech API";
  }
});

// ---------------------------
// Encrypt message (AES-GCM demo)
// ---------------------------
async function encryptMessage() {
  const message = document.getElementById("message")?.value || "";
  const output = document.getElementById("encrypted-result");

  if (!message.trim()) {
    alert("Please enter a message to encrypt");
    return;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const encryptedBase64 = arrayBufferToBase64(encrypted);

  if (output) {
    output.innerText = "🔐 Encrypted Message: " + encryptedBase64;
  }
}

/* Load More Projects */

const loadMoreBtn = document.getElementById("load-more-btn");

if(loadMoreBtn){

  loadMoreBtn.addEventListener("click", () => {

    const hiddenProjects = document.querySelectorAll(".hidden-project");

    hiddenProjects.forEach(project=>{
      project.style.display = "flex";
    });

    loadMoreBtn.style.display = "none";
  });

}