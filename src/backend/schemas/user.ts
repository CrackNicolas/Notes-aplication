import { Schema, model, models } from "mongoose";

import { Props_user } from "@/context/types/user";

const schema_user = new Schema<Props_user>({
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
    }
},
    {
        timestamps: true
    }
)

export default models.User || model('User', schema_user);