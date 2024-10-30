import Express from 'express';
import CakesRouter from './Router/CakesRouter' 
import MaterialRouter from './Router/MaterialsRouter'

const app = Express()
/**allow to read a body request with
 * JSON format
 */
app.use(Express.json())

/**prefix for cake router */
app.use(`/Cakes`, CakesRouter)

app.use('/Materials',MaterialRouter)

const PORT = 1992
app.listen(PORT, () => {
    console.log(`Server Sekopling_Bakery run on port ${PORT}`)
})