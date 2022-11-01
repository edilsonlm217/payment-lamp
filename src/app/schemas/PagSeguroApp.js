import mongoose from 'mongoose';

const PagSeguroAppSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        client_id: {
            type: String,
            required: true,
        },
        client_secret: {
            type: String,
            required: true,
        },
        account_id: {
            type: String,
            required: true,
        },
        client_type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('PagSeguroApplication', PagSeguroAppSchema);
