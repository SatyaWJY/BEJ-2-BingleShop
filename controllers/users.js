require('dotenv').config()

const { Users } = require('../db/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const bodies = req.body

        const isUserExist = await Users.findOne({
            where: {
                email: bodies.email
            },
            attributes: ['id']
        })

        if (isUserExist) {
            throw {
                code: 400,
                message: 'Email already exist'
            }
        }

        const hasedPassword = bcrypt.hashSync(bodies.password, 12)

        const user = await Users.create({
            email: bodies.email,
            password: hasedPassword,
            name: bodies.name,
            phone: bodies.phone,
            address: bodies.address
        })

        return res.status(200).json({
            code: 200,
            message: 'Success create user',
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await Users.findOne({
            where: {
                email
            }
        })

        if(!user) {
            throw {
               code: 404,
               message: 'user not found' 
            }
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            throw {
                code: 403,
                message: 'invalid password'
            }
        }

        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        return res.status(200).json({
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}