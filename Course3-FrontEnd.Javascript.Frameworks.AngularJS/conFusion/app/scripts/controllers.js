"use strict";

angular.module("confusionApp")
  .controller("MenuController", ["$scope", "menuFactory", function($scope, menuFactory) {
    $scope.dishes = menuFactory.getDishes().then(
      function(response) {
        $scope.dishes = response.data;
      }
    );
    $scope.tab = 1;
    $scope.filtText = "";
    $scope.showDetails = false;

    $scope.select = function(setTab) {
      $scope.tab = setTab;

      if (setTab === 2) {
        $scope.filtText = "appetizer";
      }
      else if (setTab === 3) {
        $scope.filtText = "mains";
      }
      else if (setTab === 4) {
        $scope.filtText = "dessert";
      }
      else {
        $scope.filtText = "";
      }
    };

    $scope.isSelected = function(checkTab) {
      return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
      $scope.showDetails = !$scope.showDetails;
    };
  }])

  .controller("ContactController", ["$scope", function($scope) {
    var channels = [
      { value: "tel", label: "Tel."},
      { value: "Email",label: "Email"}
    ];
    $scope.feedback = {
      mychannel: "", firstName: "", lastName: "", agree: false, email: ""
    };
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
  }])

  .controller("FeedbackController", ["$scope", function($scope) {
    $scope.sendFeedback = function () {
      console.log($scope.feedback);
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
        $scope.invalidChannelSelection = true;
        console.log("incorrect");
      }
      else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = {
          mychannel: "", firstName: "", lastName: "", agree: false, email: ""
        };
        $scope.feedback.mychannel = "";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
  }])

  .controller("DishDetailController", ["$scope", "$stateParams", "menuFactory",
    function($scope, $stateParams, menuFactory) {
      $scope.dish = menuFactory.getDish(parseInt($stateParams.id, 10)).then(
        function(response){
          $scope.dish = response.data;
          $scope.showDish = true;
        }
      );
      $scope.sortBy = "-date";
      $scope.dateISO = new Date().toISOString();

      $scope.sendComments = function () {
        console.log($scope.rating);
        $scope.dish.comments.push(
          {
            rating: parseInt($scope.rating.stars),
            comment: $scope.rating.comment,
            author: $scope.rating.fullname,
            date: new Date().toISOString()
          }
        );
        $scope.ratingForm.$setPristine();
        $scope.rating = { fullname: "", stars: "5", comment: "" };
      };
    }])

    .controller("AboutController", ["$scope", "corporateFactory",
      function($scope, corporateFactory) {
        $scope.leaders = corporateFactory.getLeaders();
      }
    ])

    .controller("IndexController", ["$scope", "menuFactory", "corporateFactory",
      function($scope, menuFactory, corporateFactory) {
        $scope.dish = menuFactory.getDish(0).then(
          function(response){
            $scope.dish = response.data;
            $scope.showDish = true;
          }
        );
        $scope.promo = menuFactory.getPromotion(0);
        $scope.leader = corporateFactory.getLeader(3);
      }
    ])
;
