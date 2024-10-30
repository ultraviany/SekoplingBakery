import { Router } from "express";
import {createCakes, deleteCakes, readCakes, updateCake} from "../Controller/CakesController"
import {createValidation} from "../Middleware/CakesValidation"

const router = Router()

/**route for add new cakes */
router.post (`/`, [createCakes], createValidation)
/**root for show all cakes*/
router.get(`/`,readCakes)

/**route for update cakes , untuk update use put */
router.put(`/:id`, updateCake)

/*route for delete cakes , untuk update use delete*/
router.delete(`/:id`,deleteCakes)

export default router