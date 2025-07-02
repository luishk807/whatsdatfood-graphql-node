import fs from 'fs';
import axios from 'axios';

export async function downloadImage(url: string, outputPath: string) {
  const response = await axios.get(url, { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(outputPath));
}
