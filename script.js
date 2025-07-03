const API_URL = 'https://script.google.com/macros/s/AKfycbwOEjfkJFgQyCEQCy_Pur7E71t2ieoTAhjfYpq3o42izVnBxdRISO3dK4faUBfMnJoDAQ/exec'; // Replace this

// Submit form from admin.html
document.getElementById('timetableForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    alert('Timetable entry submitted!');
    e.target.reset();
  } else {
    alert('Error submitting timetable.');
  }
});

// Load timetable on index.html
async function loadTimetable() {
  const program = document.getElementById('prog').value;
  const semester = document.getElementById('sem').value;

  const response = await fetch(`${API_URL}?Program=${encodeURIComponent(program)}&Semester=${encodeURIComponent(semester)}`);
  const data = await response.json();

  let html = `<table border="1" cellpadding="5" cellspacing="0">
    <tr><th>Day</th><th>Time</th><th>Course</th><th>Faculty</th><th>Room</th></tr>`;
  data.forEach(row => {
    html += `<tr>
      <td>${row.Day}</td>
      <td>${row.Time}</td>
      <td>${row.Course}</td>
      <td>${row.Faculty}</td>
      <td>${row.Room}</td>
    </tr>`;
  });
  html += `</table>`;
  document.getElementById('output').innerHTML = html;
}
