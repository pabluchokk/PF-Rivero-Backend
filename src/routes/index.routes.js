import cartRouter from '../controllers/cartsCont.js'
import productRouter from '../controllers/productCont.js'
import viewsTempRouter from '../controllers/viewsTemplateCont.js'
import userRouter from '../controllers/userCont.js'
import authRouter from '../controllers/authCont.js'
import mailRouter from '../controllers/mailCont.js'

const routes = (app) => {
    app.use("/mail", mailRouter)
    app.use("/", viewsTempRouter)
    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/users", userRouter)
    app.use("/api/auth", authRouter)
    app.use("/", productRouter)
    app.use("/", cartRouter)
}

export default routes