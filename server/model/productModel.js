
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    brand:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        validate: {
            validator: async function (name) {
                const currentID = this._id;
                const oldProduct = await product.findOne({ name: name, brand: this.brand });
                const productCount = await product.find({ name: name, brand: this.brand }).count();
                if(productCount === 0) return true                
                const oldID = oldProduct._id
                return (String(currentID) === String(oldID));
            },
            message: props => `${props.value} already exists for the given brand`
        }

    },
    price: {
        type: Number,
        required: true
    },    
    itemqty: {
        type: Number,
        required: true
    },
    addedAt:{
        type: Date,
        default: ()=> Date.now(),
    },
    updatedAt: Date,
    description: String
});

productSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});


const product = mongoose.model('product', productSchema);
module.exports = mongoose.model('Product', productSchema);