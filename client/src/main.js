import './style.css';
import * as XLSX from 'xlsx';


const fileInput = document.getElementById('dropzone-file');
const dropzoneLabel = document.getElementById('dropzone');
const fileName = document.getElementById('file-name');
const cancelBtn = document.getElementById('cancel-btn');
const uploadBtn = document.getElementById('upload-btn');

let csvData = '';  // Variable to store the generated CSV string


debugger
// Listen for file selection
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();

  // When file is loaded, process it
  reader.onload = (e) => {
    const data = e.target.result;
    console.log(data)

    // Read Excel file as binary
    const workbook = XLSX.read(data, { type: 'binary' });

    // Get the first sheet's name
    const firstSheetName = workbook.SheetNames[0];
    // Access the worksheet by name
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert worksheet to CSV format
    csvData = XLSX.utils.sheet_to_csv(worksheet);

    console.log('CSV generated:', csvData);

    // Hide the file dropzone and show file info & controls
    dropzoneLabel.classList.add('hidden');
    fileName.textContent = `Selected file: ${file.name}`;
    cancelBtn.classList.remove('hidden');
    uploadBtn.disabled = false; // Enable upload button
  };

  // Read file as binary string
  reader.readAsBinaryString(file);
});

// Cancel button resets the file input and UI elements
cancelBtn.addEventListener('click', () => {
  fileInput.value = '';
  dropzoneLabel.classList.remove('hidden');
  fileName.textContent = '';
  cancelBtn.classList.add('hidden');
  uploadBtn.disabled = true;
  csvData = '';  // Clear stored CSV data
});

// Upload button sends CSV data to backend asynchronously
uploadBtn.addEventListener('click', async () => {
  if (!csvData) {
    alert('No CSV data to send');
    return;
  }

  uploadBtn.disabled = true; // Disable button to prevent multiple submissions

  try {
    const response = await fetch('http://localhost:3000/api/upload-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'text/csv', 'x-filename': 'dataLoad' },
      body: csvData
    });

    if (!response.ok) throw new Error('Server responded with an error');

    const data = await response.json();
    console.log('Server response:', data);
    alert('CSV uploaded successfully');
    location.reload();
  } catch (error) {
    console.error('Error uploading CSV:', error);
    alert('Error uploading CSV');
  } finally {
    uploadBtn.disabled = false; // Re-enable upload button
  }
});
