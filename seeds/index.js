const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Centre = require('../models/campus');

mongoose.connect('mongodb://127.0.0.1:27017/STUDENTS')
.then(()=>{console.log("Mongoose Connection open!!!")})
.catch(err=>{
    console.log('Oh No!! mongoose connection error!!');
    console.log(err)
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Centre.deleteMany({});
    // const camp = new Centre({title:'purple filed'});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const contact = Math.floor(Math.random()*10000000000);
        const camp = new Centre({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description:'HEY THIS IS DESCRIPTION',
            contact
        })
        await camp.save();
    }
}

seedDB()
.then(() => {
    mongoose.connection.close();
})