const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : window.location.origin;

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid Gmail address (example@gmail.com)');
    return;
  }

  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
  if (!passwordPattern.test(password)) {
    alert('Password must be at least 6 characters and include a number and special character');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      window.location.href = 'Login.html';
    }
  } catch (err) {
    console.error(err);
    alert('Signup failed due to a network or server error.');
  }
});
