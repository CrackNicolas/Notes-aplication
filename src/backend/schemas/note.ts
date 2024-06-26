import { Schema, model, models } from "mongoose";

import { Props_note } from "@/backend/types/note";

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
        title: {
            type: String,
            require: [true, 'Required title category']
        },
        icon: {
            type: String,
            require: [true, 'Required icon category']
        }
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

export default models.Notes || model('Notes', schema_notes);