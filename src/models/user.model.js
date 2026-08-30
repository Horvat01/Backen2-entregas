import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'El apellido del usuario es obligatorio'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El email del usuario es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña del usuario es obligatoria'],
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'organizer', 'user'],
        default: 'user',
    }
},
    {
        timestamps: true
    });

const UserModel = model('users', userSchema);

export default UserModel;