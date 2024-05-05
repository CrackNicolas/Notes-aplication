import { Schema, model, models } from "mongoose";

import { Props_category } from "@/context/types/category";

const schema_category = new Schema<Props_category>({
    title: {
        type: String,
        require: [true, 'Required title'],
        unique: true,
        trim: true
    },
    use: {
        type: Boolean,
        require: [true, 'Required use']
    },
    icon: {
        type: String,
        require: [true, 'Required icon']
    },
    user_id: {
        type: String,
        require: [true, 'Required user_id'],
        trim: true
    }
},
    {
        timestamps: true
    }
)

export default models.Category || model('Category', schema_category);