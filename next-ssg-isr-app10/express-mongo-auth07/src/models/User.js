import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Min 8 chars, min 1 uppercase, min 1 digit, min one special (# $ % & * @)
                return /^(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&*@]).{8,}$/.test(v);
            },
            message:
                'La contraseña debe tener al menos 8 caracteres, una mayúscula, un dígito y un carácter especial (# $ % & * @)'
        }
    },
    phoneNumber: { type: String, required: true },
    birthdate: { type: Date, required: true },
    url_profile: { type: String, default: '/static/img/default-profile.png' },
    address: { type: String },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
}, { timestamps: true });


UserSchema.virtual('age').get(function () {
    if (!this.birthdate) return null;
    const diff = Date.now() - this.birthdate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
});


UserSchema.set('toJSON', { virtuals: true });


export default mongoose.model('User', UserSchema);