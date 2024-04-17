const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schema

const eventSchema = new Schema({
    category: { 
        type: String, 
        required: [true, 'Category is required'], 
        enum: ['Model Tutorial Class', 'Design Charrettes', 'Sustainable Design', 'Computational Thinking', 'Innovative Research'] 
    },
    hostName: { type: Schema.Types.ObjectId, ref: 'User'},
    topic: { type: String, required: [true, 'Topic is required'] },
    title: { type: String, required: [true, 'Title is required'] },
    where: { type: String, required: [true, 'Location is required'] },
    startTime: { type: Date, required: [true, 'Start time is required'] },
    endTime: { type: Date, required: [true, 'End time is required'] },
    details: { type: String, required: [true, 'Details are required'] },
    image: {type: String, required: [true, 'No image found'] },
    
}, 
{timestamps: true}
);


module.exports = mongoose.model('Event', eventSchema); //exports the model as 'Event' and the schema as eventSchema