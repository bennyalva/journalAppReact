const { fileUpload } = require("../../helpers/fileUpload");
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'lbenny', 
    api_key: '883911151255216', 
    api_secret: 'cUGQhDNSjlM-UywJUyKAooVkHfY' 
  });
describe('Tests on fileUpload', () => {
   test('should upload a file and return url',async(done) => {
      const resp = await fetch ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS07sQxSmHn9_q7tRWxODhAvRCmnFcJEvqBnw&usqp=CAU') 
      const blob = await resp.blob();

      const file = new File([blob], 'foto.png');
      const url = await fileUpload(file);
      expect(typeof url).toBe('string');
      
      // imagen por id
      const segments = url.split('/');
      const imageId = segments[segments.length -1].replace('.png', '');

      cloudinary.v2.api.delete_resources(imageId, {}, () => {
          done();
      });
    });

    test('should return a error',async() => {
  
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);
      });
    
});
