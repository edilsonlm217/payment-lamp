import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema(
    {
        cnpj: {
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
        next_charge: {
            type: Date,
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
        should_retry_charge: {
            type: Boolean,
            default: false,
        },
        recharge_attempts: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Subscription', SubscriptionSchema);
