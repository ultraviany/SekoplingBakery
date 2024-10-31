import { NextFunction, Request, Response } from "express"
import Joi from "joi"



const createSchema = Joi.object({
    material_name: Joi.string().required(),
    material_price: Joi.number().min(1).required(),
    material_type: Joi.string().valid("powder","liquid", "solid").required()
})

const createValidation = async(
    req: Request,
    res: Response,
    next: NextFunction

) : Promise<any> => {
    const validation = createSchema.validate(req.body)
    if(validation.error){
       
        res.status(400)
        .json({
            message: validation
            .error
            .details
            .map(it => it.message).join()
        })
    }
    next()
}

const updateSchema = Joi.object({
    material_name: Joi.string().optional(),
    material_price: Joi.number().min(1).optional(),
    material_type: Joi.string().valid("powder","liquid", "solid").optional()

})


const updateValidation = async(
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    const validation = updateSchema.validate(req.body)
    if(validation.error){
        res.status(400)
        .json({
            message: validation
            .error
            .details
            .map(it => it.message).join()
        }) 
    }
    next()
}
export {createValidation, updateValidation}