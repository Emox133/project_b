const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Molimo vas unesite vaše ime.']
    },
    lastName: {
        type: String,
        required: [true, 'Molimo vas unesite vaše prezime.']
    },
    email: {
        type: String,
        required: [true, 'Molimo vas unesite vaš mail.'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Molimo vas unesite korisničko ime.']
    },
    password: {
        type: String,
        required: [true, 'Molimo vas unesite lozinku.']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Molimo vas potvrdite vašu lozinku.'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Lozinke se ne podudaraju.'
        }
    }
})

usersSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    next();
});

usersSchema.methods.comparePasswords = async function(upwd, candidatePassword) {
    return await bcrypt.compare(upwd, candidatePassword)
};

const User = mongoose.model('User', usersSchema)

module.exports = User