import fs from 'fs';
import { loadData} from '../seeders/load_date.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathUploadCsv = path.join(__dirname, '..')

export const loadCsv = async(req,res) => {
    const csv = req.body;
  // Determine file name from header or generate a timestamped one
  let customFileName = req.headers['x-filename'];
  if (!customFileName) {
    customFileName = `data_${Date.now()}.csv`;
  } else if (!customFileName.toLowerCase().endsWith('.csv')) {
    customFileName += '.csv';
  }

  // Ensure the uploads folder exists
  const uploadsFolder = path.join(pathUploadCsv, 'uploads');
  if (!fs.existsSync(uploadsFolder)) fs.mkdirSync(uploadsFolder);

  const filePath = path.join(uploadsFolder, customFileName);

  try {
    // Save the CSV file to disk
    fs.writeFileSync(filePath, csv);
    console.log(`CSV saved at: ${filePath}`);

    // Run the seeder to process and insert CSV data
    await loadData(filePath);

    // Send success response
    res.json({ message: 'CSV uploaded and data loaded successfully', file: customFileName });
  } catch (error) {
    // Catch and log any errors during upload or seeding
    console.error('Error uploading CSV:', error);
    res.status(500).json({ message: 'Error uploading CSV', error: error.message });
  }

}
