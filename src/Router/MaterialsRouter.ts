import {Router} from "express"
import { createValidation,updateValidation} from "../Middleware/MaterialsValidation"
import { createMaterials, readMaterials, updateMaterials, deleteMaterials } from "../Controller/MaterialsController"

const router = Router()
//create
router.post('/', [createValidation], createMaterials)

router.get('/', readMaterials)

router.put('/:id', [updateValidation], updateMaterials)

router.delete('/:id', deleteMaterials)

export default router