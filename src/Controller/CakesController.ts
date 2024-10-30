import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ROOT_DIRECTORY } from "../config";
import path from "path";
import fs from "fs"

/** Create object of Prisma */
const prisma = new PrismaClient({ errorFormat: "minimal" });

//CREATE

const createCakes = async (req: Request, res: Response) : Promise<any> => {
    try {
        const cake_name: string = req.body.cake_name;
        const cake_price: number = Number(req.body.cake_price);
        const cake_image: string = req.file?.filename || '';
        const best_before: Date = new Date(req.body.best_before);
        const cake_flavor: string = req.body.cake_flavor;

        /** Save a new cake to DB */
        const newcakes = await prisma.cakes.create({
            data: {
                cake_name,
                cake_price,
                best_before,
                cake_image,
                cake_flavor,
            },
        });
        
        return res.status(200).json({
            message: `New cake has been created`,
            data: newcakes,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: `Failed to create cake`,
            details: error,
        });
    }
};

//READ

const readCakes = async (req:Request,res:Response) : Promise<any> =>{
    try {
        /**for search cakes */
        const search = req.query.search
        /**get all cakes */
        const allcakes = await prisma.cakes.findMany()
        return res.status(200)
            .json({
                message: `cakes has been retrivied`,
                data: allcakes
            })
    } catch (error) {
        res.status(500)
            .json(error)
    }
}

/**UPDATE */
const updateCake = async (req: Request, res: Response) : Promise<any> => {
    try {
        /** read "id" of cakes that sent at
         * parameter URL
         */
        const id = req.params.id

        /** check existing cakes based on id */
        const findCakes = await prisma.cakes
            .findFirst({
                where: { id: Number(id) }
            })

        if (!findCakes) {
            return res.status(200)
                .json({
                    message: `cakes is not found`
                })
        }

        /** ! is mean not */
        /**check change file or not */
        if (req.file) {
            /** assume that user want to  replace photo */

            /**define the old pf file name */
            let oldFileName = findCakes.cake_image
            /**define path / location of old file */
            let pathFile = `${ROOT_DIRECTORY}/public/cakes-image/${oldFileName}`
            /**check is file exists */
            let existsFile = fs.existsSync(pathFile)

            if (existsFile && oldFileName !== ``) {
                /**delate the old file */
                fs.unlinkSync(pathFile)
            }
        }


        /**read property of cakes from req.body */
        const {
            cake_name,cake_price,cake_image, best_before,cake_flavor
        } = req.body


        /** update cakes */
        const saveCakes = await prisma.cakes
            .update({
                where: { id: Number(id) },
                data: {
                    cake_name: cake_name ? cake_name : findCakes.cake_name,
                    cake_price: cake_price ? Number(cake_price) : findCakes.cake_price,
                    cake_image: req.file? req.file.filename : findCakes.cake_image,
                    best_before: best_before ? new Date(best_before) : findCakes.best_before,
                    cake_flavor: cake_flavor? cake_flavor : findCakes.cake_flavor
                }
            })

        return res.status(200)
            .json({
                message: `Cakes has been updated`,
                data: saveCakes
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}


/**DELETE */
const deleteCakes = async (req: Request, res: Response)  : Promise<any> => {
    try {
        /** read id of cakes from  0*/
        const id = req.params.id

        const findCakes = await prisma.cakes
            .findFirst({
                where: { id: Number(id) }
            })

        if (!findCakes) {
            return res.status(200)
                .json({
                    message: `Cakes is not found`
                })
        }

        /**delate the file */
        let oldFileName = findCakes.cake_image
        let pathFile =`${ROOT_DIRECTORY}/public/cakes-image/${oldFileName}`
        let existsFile = fs.existsSync(pathFile)

        if (existsFile && oldFileName !== ``){
            fs.unlinkSync(pathFile)
        }

        const saveCakes = await prisma.cakes
            .delete({
                where: { id: Number(id) }
            })

        return res.status(200)
            .json({
                message: `Cakes has been removed`,
                data: saveCakes
            })

    } catch (error) {
        console.log(error)
        return res.status(500)
            .json(error)
    }
}

export{createCakes,readCakes,updateCake,deleteCakes}