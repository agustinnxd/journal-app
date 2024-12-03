import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dmknlpyhn',
    api_key: '517272886746529',
    api_secret: 'vTQsfNy4SNztbSBsnG2NgnuP5ug',
    secure: true
})


describe('Pruebas en fileUpload', () => {

    test('debe subir el archivo a Cloudinary correctamente', async () => {

        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR37ZpX19YISFEH3Uc40X--F4MVmBI-SPXCGQ&s';

        const resp = await fetch(imageUrl);

        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');
        console.log(imageId);

        await cloudinary.api.delete_resources(['journal/' + imageId]);

    });

    test('debe retornar null', async () => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null)
    })

})