// Detect if running locally or on Render
const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : window.location.origin;

// Select the login form and add submit event listener
document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get email and password values from the form
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // -------------------------
  // Added: Basic client-side validation
  // -------------------------
  if (!email || !password) {
    alert('Please enter both email and password');
    return; // Stop execution if fields are empty
  }

  try {
    // Send POST request to the backend
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }) // Send login credentials
    });

    // Parse JSON response
    const data = await res.json();

    // Show message from backend
    alert(data.message);

    // -------------------------
    // Added: Check if login was successful
    // -------------------------
    if (res.ok) {
      // Redirect to application form if login successful
      window.location.href = 'ApplicationForm.html';
    } else {
      // Optional: log server-side error for debugging
      console.error('Login failed:', data.message);
    }
  } catch (err) {
    // -------------------------
    // Added: Detailed error handling
    // -------------------------
    console.error('Error during login:', err);
    alert('Login failed due to a network or server error.');
  }
});
