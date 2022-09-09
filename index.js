const fs= require('fs')

class Contenedor {
    constructor(fileRute){
        this.fileRute = fileRute
    }

    async #leerUnArchivo(){
        try {
            const data= await fs.promises.readFile(this.fileRute, 'utf-8')
            const parseData= JSON.parse(data)
            return parseData

        } catch (error) {
            console.log(error)
        }
    }

    async save (obj){
       const fileContent = await this.#leerUnArchivo()
        if(fileContent.length!==0){
            console.log(fileContent)
            await fs.promises.writeFile(this.fileRute, JSON.stringify([...fileContent, {...obj, id: fileContent[fileContent.length-1].id + 1}], null, 2), 'utf-8')
        }else{
            await fs.promises.writeFile(this.fileRute, JSON.stringify([{...obj, id: 1}]), 'utf-8')
        }
    }

    async getById(id){
    }

    async getAll(){
    }
}

const contenedor= new Contenedor ('./productos.txt')

contenedor.save()