var mongoose = require("mongoose"),
    assert = require("assert");

var Leaders = require("./models/leaders");
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
  Leaders.create(
    {
      name: "Peter Pan",
      image: "images/alberto.png",
      designation: "Chief Epicurious Officer",
      abbr: "CEO",
      description: "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant pioneering cross-cultural culinary connections."
    },
    function(err, leader) {
      if (err) throw err;
      console.log("Leader created!");
      console.log(leader);

      var id = leader._id;

      // get all the leaders
      setTimeout(function() {
        Leaders.findByIdAndUpdate(id,
          {
            $set: {
              name: "Dhanasekaran Witherspoon",
              designation: "Chief Food Officer",
              abbr: "CFO",
              description: "Our CFO, Danny, as he is affectionately referred to by his colleagues, comes from a long established family tradition in farming and produce. His experiences growing up on a farm in the Australian outback gave him great appreciation for varieties of food sources. As he puts it in his own words, Everything that runs, wins, and everything that stays, pays!"
            }
          },
          {
            new: true
          }
        )
        .exec(function(err, leader) {
          if (err) throw err;
          console.log("Updated leader!");
          console.log(leader);

          db.collection("leaders").drop(function() {
            db.close();
          });
        });
      }, 3000);
    }
  );
});
