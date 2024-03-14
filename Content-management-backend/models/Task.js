const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: false,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: false
        },
        completed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: String
        },
        status: {
            type: String,
            required: false
        },
        keywords: {
            type: String,
            required: false
        },
        sKeywords: {
            type: String,
            required: false
        },
        webUrl: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        dueDate: {
            type: String,
            required: false
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