// Quote requests go to Netlify Forms (the form is registered by public/__forms.html).
// Netlify stores the submission, keeps the photos, and sends the notification email.
const FORM_NAME = 'quote';
const FORM_ENDPOINT = '/__forms.html';

export const MAX_PHOTOS = 3;
/** Netlify rejects requests over 8 MB; stay under it with room for the text fields. */
const MAX_UPLOAD_BYTES = 7 * 1024 * 1024;
/** Longest edge of a photo after shrinking. Plenty to judge a car's condition. */
const MAX_EDGE = 1600;

export type QuoteFields = {
  name: string;
  phone: string;
  email: string;
  address: string;
  package: string;
  vehicle: string;
  'preferred-day': string;
  'preferred-time': string;
  'add-ons': string;
  notes: string;
};

/**
 * Shrinks a phone photo to a JPEG the upload limit can take. If the browser
 * can't decode the file (some HEIC photos), the original is sent as it is.
 */
async function shrinkPhoto(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>(done => canvas.toBlob(done, 'image/jpeg', 0.82));
    if (!blob) return file;
    const name = file.name.replace(/\.[^.]*$/, '') || 'photo';
    return new File([blob], `${name}.jpg`, {type: 'image/jpeg'});
  } catch {
    return file;
  }
}

/** Shrinks the photos for upload. Resolves to null when they are still too big to send. */
export async function preparePhotos(files: File[]): Promise<File[] | null> {
  const photos = await Promise.all(files.slice(0, MAX_PHOTOS).map(shrinkPhoto));
  const total = photos.reduce((sum, p) => sum + p.size, 0);
  return total > MAX_UPLOAD_BYTES ? null : photos;
}

/** Sends the quote request to Netlify Forms. Resolves to true when Netlify accepted it. */
export async function submitQuoteForm(fields: QuoteFields, photos: File[]): Promise<boolean> {
  const body = new FormData();
  body.append('form-name', FORM_NAME);
  for (const [name, value] of Object.entries(fields)) body.append(name, value);
  photos.forEach((photo, i) => body.append(`photo-${i + 1}`, photo, photo.name));
  try {
    // No Content-Type header: the browser sets the multipart boundary itself.
    const res = await fetch(FORM_ENDPOINT, {method: 'POST', body});
    return res.ok;
  } catch {
    return false;
  }
}
