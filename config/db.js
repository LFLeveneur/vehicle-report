// Required:
const mogoose = require('mongoose');

// Define connection to mongoDB
mogoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@trpy-webprod-8tu.trpy.digdeo.net/${process.env.MONGODB_DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then((data) => {
    // Success connection
    console.log(`Mongodb connected with server: ${data.connection.host}`);
}).catch(err => {
    // Error connection
    console.log(err);
});