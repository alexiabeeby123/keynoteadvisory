// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOX2urkVMrnBrAlePH_cg8mV_MVXiB-3Q",
  authDomain: "keynoteadv-f6dcb.firebaseapp.com",
  projectId: "keynoteadv-f6dcb",
  storageBucket: "keynoteadv-f6dcb.firebasestorage.app",
  messagingSenderId: "321692728378",
  appId: "1:321692728378:web:d4f1a45b82722ad5cd4903",
  measurementId: "G-D6KH8S18M1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form submission
const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    service: document.getElementById("service").value,
    message: document.getElementById("message").value.trim(),
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "contactMessages"), data);
    alert("Message sent successfully!");
    form.reset();
  } catch (error) {
    console.error("Firestore error:", error);
    alert("Failed to send message. Please try again.");
  }
});
