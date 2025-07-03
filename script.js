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

  const spinner = document.getElementById('spinner');
  const output = document.getElementById('output');
  spinner.style.display = 'block';
  output.innerHTML = '';

  try {
    const response = await fetch(`${API_URL}?Program=${encodeURIComponent(program)}&Semester=${encodeURIComponent(semester)}`);
    const data = await response.json();
    spinner.style.display = 'none';

    if (!Array.isArray(data) || data.length === 0) {
      output.innerHTML = `<div class="alert alert-warning">No timetable data found for the selected Program and Semester.</div>`;
      return;
    }

    const dayColors = {
      "Monday": "#cce5ff",
      "Tuesday": "#d4edda",
      "Wednesday": "#fff3cd",
      "Thursday": "#f8d7da",
      "Friday": "#e2e3e5",
      "Saturday": "#e2f0d9",
      "Sunday": "#fbe4ff"
    };

    let html = `<table class="table table-bordered table-hover">
      <thead class="table-dark text-center">
        <tr>
          <th>Day</th>
          <th>Start Time</th>
          <th>Duration</th>
          <th>Course</th>
          <th>Faculty</th>
          <th>Room</th>
        </tr>
      </thead>
      <tbody>`;

    data.forEach(row => {
      const day = row.Day || '';
      const bgColor = dayColors[day] || 'white';

      html += `<tr style="background-color: ${bgColor}; transition: background 0.3s ease;">
        <td>${day}</td>
        <td>${row.Time}</td>
        <td>${row.Duration || '-'}</td>
        <td>${row.Course}</td>
        <td>${row.Faculty}</td>
        <td>${row.Room}</td>
      </tr>`;
    });

    html += `</tbody></table>`;
    output.innerHTML = html;

  } catch (err) {
    spinner.style.display = 'none';
    output.innerHTML = `<div class="alert alert-danger">Failed to load timetable.</div>`;
    console.error(err);
  }
}
