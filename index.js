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
        try {
            const fileContent = await this.#leerUnArchivo()
            if(fileContent.length!==0){
                await fs.promises.writeFile(this.fileRute, JSON.stringify([...fileContent, {...obj, id: fileContent[fileContent.length-1].id + 1}], null, 2), 'utf-8')
                
            }else{
                await fs.promises.writeFile(this.fileRute, JSON.stringify([{...obj, id: 1}]), 'utf-8')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getById(idProduct){
        try {
            const data= await this.#leerUnArchivo()
            if(data!==undefined){
                let productId=data.find((product)=> product.id===idProduct)
                console.log(productId)
            }
        } catch (error) {
            
        }
    }


    async getAll(){
        try {
            const fileContent = await this.#leerUnArchivo()
            if(fileContent.length!==0){
                console.log(fileContent)
            }else{
                console.log('No se Encuentra Ningun producto')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(idProduct){
        try {
            const data = await this.#leerUnArchivo()
            if(data!==undefined){
                const productFilter= data.filter((product)=> product.id !== idProduct)
                await fs.promises.writeFile(this.fileRute, JSON.stringify(productFilter, null, 4))
                console.log(productFilter)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.fileRute, JSON.stringify([], null, 2), 'utf-8')
            console.log('data delete')
        } catch (error) {
            console.log(error)
        }

    }
}

const contenedor= new Contenedor ('./productos.txt')

contenedor.save({nombre: "Zapatillas nike", precio: "20000"})

contenedor.getAll()

contenedor.getById(2)

contenedor.deleteById(2)

// contenedor.deleteAll()