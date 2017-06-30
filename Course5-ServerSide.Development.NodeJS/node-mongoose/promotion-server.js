var mongoose = require("mongoose"),
    assert = require("assert");

var Promotions = require("./models/promotions");
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
  Promotions.create(
    {
      name: "Cheetos Burrito",
      category: "Food",
      price: "$1.00",
      description: "Exactly what it sounds like: a burrito with literal Cheetos stuffed inside of it."
    },
    function(err, promotion) {
      if (err) throw err;
      console.log("Promotion created!");
      console.log(promotion);

      var id = promotion._id;

      // get all the promotions
      setTimeout(function() {
        Promotions.findByIdAndUpdate(id,
          {
            $set: {
              description: "For only $1, we can't see why this glorious creation won't make it into stores nationwide in no time."
            }
          },
          {
            new: true
          }
        )
        .exec(function(err, dish) {
          if (err) throw err;
          console.log("Updated promotion!");
          console.log(dish);

          db.collection("promotions").drop(function() {
            db.close();
          });
        });
      }, 3000);
    }
  );
});
