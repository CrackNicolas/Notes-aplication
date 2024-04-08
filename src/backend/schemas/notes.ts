import { Schema, model, models } from "mongoose";

import { Props_note } from "@/context/types/note";

const schema_notes = new Schema<Props_note>({
    title: {
        type: String,
        require: [true, 'Required title'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        require: [true, 'Required description'],
        unique: true,
        trim: true
    },
    category: {
        type: String,
        require: [true, 'Required category'],
        trim: true
    },
    priority: {
        type: String,
        require: [true, 'Required priority'],
        enum: ['Alta', 'Media', 'Baja']
    },
    featured: {
        type: Boolean,
        require: [true, 'Required featured']
    },
    file: {
        id: {
            type: String,
            require: [true, 'Required id'],
            trim: true
        },
        name: {
            type: String,
            require: [true, 'Required name'],
            trim: true
        },
        url: {
            type: String,
            require: [true, 'Required url'],
            trim: true
        }
    }
},
    {
        timestamps: true
    }
)

export default models.Notes || model('Notes', schema_notes);