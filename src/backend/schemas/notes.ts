import { Schema, model, models } from "mongoose";

const schema_notes = new Schema({
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
    }
},
    {
        timestamps:true
    }
)

export default models.Notes || model('Notes',schema_notes);