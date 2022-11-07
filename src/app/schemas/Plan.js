import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema(
    {
        planCode: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        period: {
            type: String,
            required: true,
        },
        amountPerPayment: {
            type: Number,
            required: true,
        },
        maxUses: {
            type: Number,
            required: true,
        },
        currentUses: {
            type: Number,
            required: false,
            default: 0
        },
        description: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Plan', PlanSchema);
