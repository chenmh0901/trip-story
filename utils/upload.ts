import imageCompression from 'browser-image-compression';
import { uuid } from './uuid';


const assetsOrigin = 'http://swjtdhcuz.hd-bkt.clouddn.com';
const uploadUrl = 'https://upload.qiniup.com';
const imageTokenApiName = 'http://localhost:3001/upload-token';

export const getUploadToken = async (
  fileType?: string,
) => {
  const url = new URL(imageTokenApiName);
  url.searchParams.set('fileType', fileType || '');
  const res = await fetch(url.toString()).then((res) => res.json());

  return res.token;
};

const compressImage = async (file: File) => {
  const compressedFile = await imageCompression(file, {
    maxWidthOrHeight: 7000,
  });

  return compressedFile;
};

export const uploadImage = async (
  file: File,
): Promise<string | undefined> => {
  const token = await getUploadToken(file.type);
  let compressedFile = file;

  if (
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp'
  ) {
    compressedFile = await compressImage(file);
  }

  const formData = new FormData();
  const fileName = `${uuid()}.${file.type.split('/')[1]}`;

  formData.append('file', compressedFile);
  formData.append('token', token);
  formData.append('key', fileName);

  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());

  if (!res.key) {
    return;
  }

  const url = new URL(res.key, assetsOrigin);

  return url.href;
};
