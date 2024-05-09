const { dirname } = require("path")
const { fileURLToPath } = require("url")

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname