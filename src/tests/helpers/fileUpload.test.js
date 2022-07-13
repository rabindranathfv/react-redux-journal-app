var cloudinary = require('cloudinary').v2;
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dr02vm7ia',
  api_key: '952156235768233',
  api_secret: 'gRma3geH2u0UEjnzTbu_MbA6xIw',
  secure: true
})
describe('fileUpload scenarios:::', () => {
  it('should upload rigth file', async () => {
    const imgUrl = 'https://media.gettyimages.com/photos/gym-brothers-picture-id923448008?s=612x612';
    const resp = await fetch(imgUrl);
    const blob = await resp.blob();
    const file = new File([blob],'foto-prueba.jpg');

    const url = await fileUpload( file )
    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imgId = segments[segments.length - 1].replace('.jpg', '');
    await cloudinary.api.delete_resources(imgId, {}, ()=> {
      console.log('finish test');
   });
  });

  it('should throw error if no file send it', async() => {
    const file = new File([], 'foto.jpg');

    const url = await fileUpload(file)
    expect(url).toBeFalsy();
  });
});