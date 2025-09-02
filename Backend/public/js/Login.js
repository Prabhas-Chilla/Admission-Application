document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);
   
    if (res.ok) {
      
      // redirect or show dashboard
      window.location.href = 'ApplicationForm.html'; // or your main page
    }
  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
});
