const UPLOAD_PRESENT = 'journal-react-app';

export const fileUpload = async (file) => {
    // if (!file) throw new Error('no images');
    if (!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dr02vm7ia/image/upload';
    const formData = new FormData();
    formData.append('upload_preset', UPLOAD_PRESENT);
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        // throw new Error( error.message );
        return null;
    }

}