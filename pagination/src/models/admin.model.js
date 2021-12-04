const { Schema, model } = require("mongoose")

const adminSchema = new Schema(
    {
        user_ids: [
            
            {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true,
            }

        ] 
        
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model("admin", adminSchema)