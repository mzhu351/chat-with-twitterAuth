angular.module('chatMin.controllers', ['firebase'])

.controller('ChatsCtrl', function($scope , $rootScope, $firebaseArray) {
    var ref = new Firebase('https://chatmin.firebaseio.com/');
    $scope.chats = $firebaseArray(ref);

    $scope.sendChat = function(chat) {
      $scope.chats.$add({
        user: $rootScope.authData.twitter.username,
        message: chat.message,
        imgURL: $rootScope.authData.twitter.cachedUserProfile.profile_image_url
      });
      chat.message = "";
    }
})

.controller('AccountCtrl', function($scope, $rootScope) {
  $scope.login = function() {
    var ref = new Firebase('https://chatmin.firebaseio.com/');
    ref.authWithOAuthPopup('twitter', function(error, authData) {
      if (error) {
        alert('there is an issue with your id');
        console.log('Auth failed', error);
      } else {
        alert('success');
        console.log('Auth succeed', authData);
      }
      $rootScope.authData = authData;
    })
  };
});
