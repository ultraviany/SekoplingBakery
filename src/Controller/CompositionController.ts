import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    errorFormat: "minimal",
})

const CreateCompositions = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const cakesId: number = Number(req.body.cakes_id);
        const material: number = Number(req.body.material_id);
        const quantity: number = Number(req.body.qty); 

        const newComposition = await prisma.compositions.create({
            data: {
                cakes_id: cakesId,
                material_id: material,
                qty: quantity
            }
        });

        return res.status(201).json({
            message: 'composition created',
            data: newComposition
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }
}

const ReadCompositions = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const search = req.query.search
        const searchId = Number(search)
        const allcompositions = await prisma.compositions.findMany({
            where: {
                OR: [
                    {cake_id: searchId || undefined}
                ]
            }
        });
        return res.status(200).json({
            message: 'compositions has been read',
            data: allcompositions
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

const UpdateCompositions = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const id = req.params.id 

        const findCompositions = await prisma.compositions.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(!findCompositions){
            return res.status(200).json({
                message: 'compositions not found'
            })
        }
        const {cakes_id, material_id, qty} = req.body

        const saveCompositions = await prisma.compositions.update({
            where: {id: Number(id)},
            data: {
                cakes_id: cakes_id ?? findCompositions.cakes_id,
                material_id: material_id ?? findCompositions.material_id,
                qty: qty ?? findCompositions.qty
            }
        })
        return res.status(200).json({
            message: `compositions has been update`,
            data: saveCompositions
        })
    } catch (error) {
        return res.status(500).json({
            message: `compositions error`,
            error
        })
    }
}

const DeleteCompositions = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const id = req.params.id
        const findCompositions = await prisma.compositions.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(!findCompositions){
            return res.status(200).json({
                message: 'compositions not found'
            })
        }
        const saveCompositions = await prisma.compositions.delete({
            where: {id: Number(id)}
        })
        return res.status(200).json({
            message: `compositions has been delete`,
            data: saveCompositions
        })
    } catch (error) {
        return res.status(500).json({
            message: `compositions error`,
            error
        })
    }
}

export { CreateCompositions, ReadCompositions, UpdateCompositions, DeleteCompositions }