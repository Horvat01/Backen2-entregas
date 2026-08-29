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
    }
},
    {
        timestamps: true
    });

const UserModel = model('users', userSchema);
export default UserModel