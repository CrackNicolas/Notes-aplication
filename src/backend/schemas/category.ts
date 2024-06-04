import { Schema, model, models } from "mongoose";

import { Props_category } from "@/backend/types/category";

const schema_category = new Schema<Props_category>({
    title: {
        type: String,
        require: [true, 'Required title'],
        unique: true,
        trim: true
    },
    use: [
        {
            value: {
                type: Boolean,
                require: [true, 'Required use']
            },
            user_id: {
                type: String,
                require: [true, 'Required user_id'],
                trim: true
            }
        }
    ],
    icon: {
        type: String,
        require: [true, 'Required icon']
    }
},
    {
        timestamps: true
    }
)

export default models.Category || model('Category', schema_category);