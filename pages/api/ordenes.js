import { PrismaClient } from "@prisma/client";



export default async function handler(req, res){
    const prisma = new PrismaClient()
    const { nombre, total, pedido, fecha } = req.body
    if(req.method === 'POST'){
        const orden = await prisma.orden.create({
            data:{
                nombre:nombre,
                total: total,
                pedido: pedido,
                fecha:fecha
            }
        });
        res.json(orden)       
    } 
    
}