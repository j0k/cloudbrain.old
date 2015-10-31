(function() {
  'use strict';

  angular.module('cloudbrain.brainsquared')
    .factory('TargetTagger', ['CREATE_TAG_URL', 'STREAM_MODE', '$http', function(CREATE_TAG_URL, STREAM_MODE, $http){

      var TargetTagger = function (streamMode) {
        this.streamMode = streamMode || false;
        this.lastTag = '';
      };

      TargetTagger.prototype.tag = function (tag) {
        var body = {
          timestamp: new Date().getTime(),
          value: tag
        };

        var tagSuccess = function (response) {
          console.log('Success', response);
        };

        var tagError = function (response) {
          console.log('Error', response);
        };

        if(this.lastTag != tag || this.streamMode === true){
          $http.post(CREATE_TAG_URL, body).then(tagSuccess, tagError);
        }

        this.lastTag = tag;
      };

      var instance = new TargetTagger(STREAM_MODE);

      return instance;
  }]);

})();
