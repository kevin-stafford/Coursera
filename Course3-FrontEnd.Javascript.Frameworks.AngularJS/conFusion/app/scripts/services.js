"use strict";

angular.module("confusionApp")
  .constant("baseURL", "http://localhost:3000/")
  .service("menuFactory", ["$resource", "baseURL",
    function($resource, baseURL) {
      this.getDishes = function () {
        return $resource(baseURL + "dishes/:id", null,
          { "update": { method: "PUT" } }
        );
      };
    }
  ])
  .service("promoFactory", ["$resource", "baseURL",
    function($resource, baseURL) {
      this.getPromotions = function () {
        return $resource(baseURL + "promotions/:id", null,
          { "update": { method: "PUT" } }
        );
      };
    }
  ])
  .factory("leadershipFactory", ["$resource", "baseURL",
    function($resource, baseURL) {
      var leadershipFactory = {};
      leadershipFactory.getLeaders = function () {
        return $resource(baseURL + "leadership/:id", null,
          { "update": { method: "PUT" } }
        );
      };
      return leadershipFactory;
    }
  ])
  .factory("feedbackFactory", ["$resource", "baseURL",
    function($resource, baseURL) {
  		var feedback = {};
  		feedback.getFeedback = function(){
  			return $resource(baseURL + "feedback/:id", null,
          { "update": { method: "PUT" } }
        );
  		};
  		return feedback;
  	}
  ])
;
