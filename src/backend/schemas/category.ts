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
    }
},
    {
        timestamps: true
    }
)

export default models.Category || model('Category', schema_category);