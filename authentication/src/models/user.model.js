const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

Schema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        return next();
    })
})

module.exports = model("user", userSchema);
