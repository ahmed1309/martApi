
const mongoose = require('mongoose');


const ratingsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true,
    },
    userComment:{
        type:String
    },
    productRating:{
        type:Number,
        min: 0,
        max: 5,
    }
})


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
    description: String,
    productReviews:[ratingsSchema],
    productAverageRating: Number,
});

productSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

productSchema.methods.updateRating = async function () {
    const currentProduct = await this.constructor.findOne({ _id: this._id });
    
    if (currentProduct.productReviews && currentProduct.productReviews.length > 0) {
        // const totalRating = currentProduct.productReviews.reduce((sum, review) => sum + review.productRating, 0);
        // let averageRating = totalRating / currentProduct.productReviews.length;

        const totalRating = currentProduct.productReviews.reduce((sum, currentValue) => {
            if (currentValue.productRating) {
                return sum + currentValue.productRating;
            } else {
                return sum;
            }
        }, 0);

        let averageRating = totalRating / currentProduct.productReviews.filter(item => item.productRating).length;
        averageRating = parseFloat(averageRating.toFixed(1));
        currentProduct.productAverageRating = averageRating;
        await currentProduct.save();
    }
};


const product = mongoose.model('product', productSchema);
module.exports = mongoose.model('Product', productSchema);
