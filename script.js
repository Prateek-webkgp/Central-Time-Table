// ✅ Replace with your deployed Google Apps Script Web App URL
const API_URL = 'https://script.google.com/macros/s/AKfycbwOEjfkJFgQyCEQCy_Pur7E71t2ieoTAhjfYpq3o42izVnBxdRISO3dK4faUBfMnJoDAQ/exec';

// ===============================
// Admin Form Submission
// ===============================
document.getElementById('timetableForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('✅ Timetable submitted successfully!');
      e.target.reset();
    } else {
      alert('❌ Submission failed.');
    }
  } catch (err) {
    alert('❌ Network error or invalid API endpoint.');
    console.error(err);
  }
});

// ===============================
// Student Timetable Viewer
// ===============================
async function loadTimetable() {
  const program = document.getElementById('prog').value;
  const semester = document.getElementById('sem').value;

  try {
    const response = await fetch(`${API_URL}?Program=${encodeURIComponent(program)}&Semester=${encodeURIComponent(semester)}`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      document.getElementById('output').innerHTML = `<div class="alert alert-warning">No timetable data found for the selected Program and Semester.</div>`;
      return;
    }

    let html = `<table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>Day</th>
          <th>Time</th>
          <th>Course</th>
          <th>Faculty</th>
          <th>Room</th>
        </tr>
      </thead>
      <tbody>`;

    data.forEach(row => {
      html += `<tr>
        <td>${row.Day}</td>
        <td>${row.Time}</td>
        <td>${row.Course}</td>
        <td>${row.Faculty}</td>
        <td>${row.Room}</td>
      </tr>`;
    });

    html += `</tbody></table>`;
    document.getElementById('output').innerHTML = html;

  } catch (err) {
    document.getElementById('output').innerHTML = `<div class="alert alert-danger">Failed to load timetable.</div>`;
    console.error(err);
  }
}
