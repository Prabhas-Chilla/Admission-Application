document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const res = await fetch('/api/auth/signup', {
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
    alert('Signup failed');
  }
});
