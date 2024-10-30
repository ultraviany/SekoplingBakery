import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs"

/** Create object of Prisma */
const prisma = new PrismaClient({ errorFormat: "minimal" });
type type = "powder" | "liquid" | "solid"

//CREAT 

const createMaterials = async (req: Request, res: Response): Promise<any> => {
    try {
        const material_name: string = req.body.cake_name;
        const material_price: number = Number(req.body.cake_price);
        const material_type: type = req.body.type

        /** Save a new materials to DB */
        const newmaterials  = await prisma.materials.create({
            data: {
                material_name,
                material_price,
                material_type
            },
        });

        return res.status(200).json({
            message: `New cake materials been created`,
            data: newmaterials,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: `Failed to create materials cake`,
            details: error,
        });
    }
};

//READ

const readMaterials = async (req:Request,res:Response) : Promise<any> =>{
    try {
        /**for search materials */
        const search = req.query.search
        /**get all materials */
        const allmaterials = await prisma.materials.findMany()
        return res.status(200)
            .json({
                message: `materials has been retrivied`,
                data: allmaterials
            })
    } catch (error) {
        res.status(500)
            .json(error)
    }
}

/**UPDATE */

const updateMaterials = async (req: Request, res: Response) : Promise<any> => {
    try {
        /** read "id" of cakes that sent at
         * parameter URL
         */
        const id = req.params.id

        /** check existing cakes based on id */
        const findMaterials = await prisma.materials
            .findFirst({
                where: { id: Number(id) }
            })

        if (!findMaterials) {
            return res.status(200)
                .json({
                    message: `cakes is not found`
                })
        }

        /**read property of material from req.body */
        const {
            material_name,material_price,material_type
        } = req.body

        /** update materials */
        const saveCakes = await prisma.materials
            .update({
                where: { id: Number(id) },
                data: {
                    material_name: material_name ? material_name : findMaterials.material_name,
                    material_price: material_price ? Number(material_price) : findMaterials.material_price,
                    material_type: material_type ? material_type : findMaterials.material_type,
                }
            })

        return res.status(200)
            .json({
                message: `Material has been updated`,
                data: saveCakes
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

/**DELETE */

const deleteMaterials = async (req: Request, res: Response)  : Promise<any> => {
    try {
        /** read id of materials from  0*/
        const id = req.params.id

        const findMaterials = await prisma.materials
            .findFirst({
                where: { id: Number(id) }
            })

        if (!findMaterials) {
            return res.status(200)
                .json({
                    message: `Material is not found`
                })
        }


        const saveMaterial = await prisma.materials
            .delete({
                where: { id: Number(id) }
            })

        return res.status(200)
            .json({
                message: `Material has been removed`,
                data: saveMaterial
            })

    } catch (error) {
        console.log(error)
        return res.status(500)
            .json(error)
    }
}

export { createMaterials, readMaterials, updateMaterials, deleteMaterials}


