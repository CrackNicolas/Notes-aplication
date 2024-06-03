import { Schema, model, models } from "mongoose";

import { Props_user } from "@/context/types/session";

const schema_user = new Schema<Props_user>({
    id: {
        type: String,
        require: [true, 'Required id'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        require: [true, 'Required name'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: [true, 'Required email'],
        unique: true,
        trim: true
    },
    image: {
        type: String,
        require: [true, 'Required image'],
    },
    sessions:{
        type: Number,
        require: [true, 'Required sessions'],
    }
},
    {
        timestamps: true
    }
)

export default models.User || model('User', schema_user);