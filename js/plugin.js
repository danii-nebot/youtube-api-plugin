// plugin namespace
var pluginNamespace = pluginNamespace || {};

// youtube player ready callback
// must be in global namespace
var onYouTubePlayerReady = function(playerId) {
  pluginNamespace.YoutubePlugin.init(document.getElementById(playerId), CONFIG);
}

// plugin object
pluginNamespace.YoutubePlugin =(function() {

  // possible player states values
  // from youtube API
  var PlayerStates = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
  };

  // action code values for our API
  var ActionCodes = {
    PLAY: "play",
    PAUSE: "pause"
  }

  // data
  var userId = null;
  var videoId = null;

  /**
   * Init plugin
   *
   * @param ytplayer Object, reference to youtube player DOM element
   * @param config Object, config values set by final user
   */
  var init = function(ytplayer, config) {
    if(ytplayer) {
      ytplayer.addEventListener('onStateChange', 'pluginNamespace.YoutubePlugin.onytplayerStateChange');

      // get config data
      userId = config.userId;

      // retrieve youtube video ID from video url because youtube API won't provide it naturally
      // perhaps we'll need a regexp here, as there are many possible youtube's url formats?
      // http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
      // in that case, it would be better to set it in CONFIG object
      var videoUrl = ytplayer.getVideoUrl();
      videoId = videoUrl.split('v=')[1];
    }

  };

  // event listener function
  var onytplayerStateChange = function(newState) {
    // only act upon PLAYING and PAUSED events
    switch (newState) {
      case PlayerStates.PLAYING:
        submitAction(ActionCodes.PLAY);
        break;

      case PlayerStates.PAUSED:
        submitAction(ActionCodes.PAUSE);
        break;

      default:
        // do nothing
    }
  };

  // mock send data to server
  var submitAction = function(action) {
    var data = {
      userID: userId,
      videoID: videoId,
      timecode: new Date(),
      action: action
    };

    // var xhr = ...
    console.log(JSON.stringify(data));
  };

  return {
    init: init,
    onytplayerStateChange: onytplayerStateChange
  }

})();

