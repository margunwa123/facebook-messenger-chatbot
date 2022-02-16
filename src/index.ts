import moduleAlias from "module-alias"
moduleAlias.addAlias('@', __dirname);
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { loggerMiddleware } from "./middleware/logger"
import messagesRoutes from "./routes/messages.routes"
import summaryRoutes from "./routes/summary.routes"
import webhookRoutes from "./routes/webhook.routes"


const main = () => {
	const app = express()

	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(loggerMiddleware);


	app.use('/messages', messagesRoutes)
	app.use('/summary', summaryRoutes)
	app.use('/webhook', webhookRoutes)

	app.listen("3000", () => {
		console.log("server started on port 3000")
	})
}

main()