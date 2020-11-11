const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

// Register User
router.post(
	'/register',
	[
		check('email', 'wrong email').isEmail(),
		check('password', 'Minimal length is 8 characters').isLength({min:6}),
		check('firstName').notEmpty(),
		check('lastName').notEmpty()
	], 
	async (req, res) => {
	try {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Incorrect credentials'
			})
		}
		const { firstName, lastName , email, password } = req.body
		const candidate = await User.findOne({ email })
		if(candidate) return res.status(400).json({ message: 'Such email is already taken'})
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({ firstName, lastName, email, password: hashedPassword, createdAt: new Date() })
		await user.save()
		const token = jwt.sign(
			{ userId: user.id },
			process.env.jwtSecret,
			{ expiresIn: '1h' }
		)
		return res.json({ firstName, lastName, token })
	} catch (error) {
		res.status(500).json({ message: `something goes wrong like ${error}` })
	}
})
// Login User
router.post(
	'/login', 
	[
		check('email', 'Wrong email').normalizeEmail().isEmail(),
		check('password', 'Password is incorrect or not exists').exists()
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Incorrect credentials'
			})
		}
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if(!user) return res.status(400).json({ errors: [{param: 'email', msg: 'User not find'}],message: 'User not find'})
		const isMatch = await bcrypt.compare(password, user.password)
		if(!isMatch) return res.status(400).json({ errors: [{param: 'password', msg: 'Password is incorrect'}],message: 'Password is incorrect'})
		const token = jwt.sign(
			{ userId: user.id },
			process.env.jwtSecret,
			{ expiresIn: '1h' }
		)
		const firstName = user.firstName
		const lastName = user.lastName
		res.json({ firstName, lastName, token })
	} catch (error) {
		res.status(500).json({ message: `something goes wrong like ${error}` })
	}
})

module.exports = router