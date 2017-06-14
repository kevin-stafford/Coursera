"use strict";

angular.module("confusionApp")
  .controller("MenuController", ["$scope", "menuFactory", function($scope, menuFactory) {
    $scope.tab = 1;
    $scope.filtText = "";
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading...";

    menuFactory.getDishes().query(
      function(response) {
        $scope.dishes = response;
        $scope.showMenu = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );

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
      $scope.sortBy = "";
      $scope.dateISO = new Date().toISOString();
      menuFactory.getDishes().get(
        {
          id: parseInt($stateParams.id, 10)
        }
      ).$promise.then(
        function(response){
          $scope.dish = response;
          $scope.showDish = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );
      $scope.showDish = false;
      $scope.message="Loading...";

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
        menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);
        $scope.ratingForm.$setPristine();
        $scope.rating = { fullname: "", stars: "5", comment: "" };
      };
    }])

    .controller("AboutController", ["$scope", "leadershipFactory",
      function($scope, leadershipFactory) {
        $scope.showLeaders = false;
        $scope.indicator = "Loading ...";
        $scope.leaders = leadershipFactory.getLeaders().query(
          function(response) {
            $scope.leaders = response;
            $scope.showLeaders = true;
          },
          function(response) {
            $scope.indicator = "Error: " + response.status + " " + response.statusText;
          }
        );
    }])

    .controller("IndexController",
      ["$scope", "menuFactory", "promoFactory", "leadershipFactory",
        function($scope, menuFactory, promoFactory, leadershipFactory) {
          // get menuItem
          $scope.showDish = false;
          $scope.message = "Loading...";
          menuFactory.getDishes().get({ id: 0 }).$promise.then(
            function(response){
              $scope.dish = response;
              $scope.showDish = true;
            },
            function(response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
            }
          );
          // get promotional
          $scope.showPromo = false;
          $scope.status = "Loading...";
          promoFactory.getPromotions().get({ id: 0 }).$promise.then(
            function(response){
              $scope.promo = response;
              $scope.showPromo = true;
            },
            function(response) {
              $scope.status = "Error: " + response.status + " " + response.statusText;
            }
          );
          // get leader bio
          $scope.showLeader = false;
          $scope.indicator = "Loading...";
          leadershipFactory.getLeaders().get({ id: 3 }).$promise.then(
            function(response){
              $scope.leader = response;
              $scope.showLeader = true;
            },
            function(response) {
              $scope.indicator = "Error: " + response.status + " " + response.statusText;
            }
          );
        }
      ]
    )
;
