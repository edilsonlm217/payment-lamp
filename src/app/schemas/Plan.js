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
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Plan', PlanSchema);
