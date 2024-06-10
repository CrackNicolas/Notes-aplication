import { Schema, model, models } from "mongoose";

import { Props_session } from "@/backend/types/session";

const schema_session = new Schema<Props_session>({
    id: {
        type: String,
        require: [true, 'Required id'],
        unique: true,
        trim: true
    },
    status: {
        type: Boolean,
        require: [true, 'Required status']
    },
    last_time: {
        type: String,
        require: [true, 'Required last_time'],
        trim: true
    },
    expiret: {
        type: String,
        require: [true, 'Required expiret']
    },
    origin: {
        IP_adress: {
            type: String,
            require: [true, 'Required IP_adress'],
            trim: true
        },
        city: {
            type: String,
            require: [true, 'Required city'],
            trim: true
        }
    },
    user: {
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
        rol: {
            type: String,
            require: [true, 'Required rol'],
        }
    }
},
    {
        timestamps: true
    }
)

export default models.Session || model('Session', schema_session);