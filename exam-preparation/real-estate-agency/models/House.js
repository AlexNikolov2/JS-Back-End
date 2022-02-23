const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Apartment", "Villa", "House"],
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,

    },
    homeImage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    availablePieces: {
        type: Number,
        required: true,
    },
    tenants: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

houseSchema.method("getTenants", async function () {
    return await this.tenants.map(t => t.name).join(", ");
});

const House = mongoose.model("House", houseSchema);

module.exports = House;