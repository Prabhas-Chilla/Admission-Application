const form = document.getElementById('applicationForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch('/api/application/upload', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
    alert('Application Submitted! PDF generated.');
  } catch (err) {
    console.error('Error:', err);
    alert('Something went wrong while submitting the form');
  }
});
