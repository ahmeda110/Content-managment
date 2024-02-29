const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

taskSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 100
})

module.exports = mongoose.model('Task', taskSchema)