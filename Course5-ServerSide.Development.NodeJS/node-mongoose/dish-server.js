var mongoose = require("mongoose"),
    assert = require("assert");

var Dishes = require("./models/dishes");
// Connection URL
var url = "mongodb://localhost:27017/conFusion";
mongoose.Promise = global.Promise;
mongoose.connect(url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we"re connected!
  console.log("Connected correctly to server");
  // create a new dish
  Dishes.create(
    {
      name: "Airheads White Mystery Freeze",
      category: "Drinks",
      price: "$1.99",
      description: "Taco Bell revitalized every '90s kids favorite mystery by turning the white Airhead flavor into a sugary drink.",
      comments: [
        {
          rating: 1,
          comment: "Be warned. This drink gave me diabetes.",
          author: "Kevin Stafford"
        },
        {
          rating: 3,
          comment: "Good, but not sweet enough.",
          author: "Fat Domino"
        }
      ]
    },
    function(err, dish) {
      if (err) throw err;
      console.log("Dish created!");
      console.log(dish);

      var id = dish._id;

      // get all the dishes
      setTimeout(function() {
        Dishes.findByIdAndUpdate(id,
          {
            $set: {
              description: "Customers can sip on a 16 oz. slushie for $1.99 until they've either guessed the flavor or suffered a diabetic coma."
            }
          },
          {
            new: true
          }
        )
        .exec(function(err, dish) {
          if (err) throw err;
          console.log("Updated Dish!");
          console.log(dish);

          db.collection("dishes").drop(function() {
            db.close();
          });
        });
      }, 3000);
    }
  );
});
