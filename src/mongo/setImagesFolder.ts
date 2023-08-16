import fs from 'fs'

export async function setImagesFolder () {
  try {
    const dir = process.env.IMAGES_PATH || './images'

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir + '/productos', { recursive: true });
        console.log('SE CREÓ EL DIRECTORIO DE IMAGENES - PRODUCTOS')
        fs.mkdirSync(dir + '/categorias', { recursive: true });
        console.log('SE CREÓ EL DIRECTORIO DE IMAGENES - CATEGORIAS')
    }
  } catch (error) {
    console.log(error)
  }
}
