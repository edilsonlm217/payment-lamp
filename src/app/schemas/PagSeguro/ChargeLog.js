import mongoose from 'mongoose';

const ChargeLogSchema = new mongoose.Schema(
    {
        subscription_id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        plan_description: {
            type: String,
            required: true,
        },
        plan_value: {
            type: Number,
            required: true,
        },
        card_number: {
            type: String,
            required: true,
        },
        card_exp_month: {
            type: String,
            required: true,
        },
        card_exp_year: {
            type: String,
            required: true,
        },
        card_security_code: {
            type: String,
            required: true,
        },
        card_holder_name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('ChargeLog', ChargeLogSchema);
