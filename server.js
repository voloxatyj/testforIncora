const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')

//Load config
dotenv.config({ path: './config/config.env' })

connectDB()

app.use(bodyParser.json())

// Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}
// Production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const port = process.env.PORT || 5000

// Routes
app.use('/api', require('./routes/api/routes'))

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))