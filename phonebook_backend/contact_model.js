import mongoose from 'mongoose';

const contact_schema = mongoose.Schema({
    name: String,
    numbers:[
        {
            number:String,
            numtype:String
        }
    ]
})
export default mongoose.model('contact', contact_schema);