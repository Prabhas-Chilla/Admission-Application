const form = document.getElementById('applicationForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  
  try {
    const res = await fetch('http://localhost:5000/api/application/upload', {
      method: 'POST',
      body: formData, // Don't set Content-Type manually
    });

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }

    const data = await res.json();

    alert(data.message || 'Application Submitted!');

    // Redirect to the generated PDF
    if (data.pdfUrl) {
      window.location.href = `http://localhost:5000${data.pdfUrl}`;
    }
  } catch (err) {
    console.error("Error:", err);
    alert('Something went wrong while submitting the form');
  }
});
