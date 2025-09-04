const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : window.location.origin;

document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailPattern.test(email)) {
    alert('Email must be a valid Gmail address (example@gmail.com)');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      window.location.href = 'ApplicationForm.html';
    } else {
      console.error('Login failed:', data.message);
    }
  } catch (err) {
    console.error('Error during login:', err);
    alert('Login failed due to a network or server error.');
  }
});
