$(document).ready(function(){
  var $tweetContainer = $('.tweet-content');

	/* Parameters */
  var index = -1;
	var refreshRate = 1000;

	/* Show tweets between start and end indices */
	var showTweets = function(start,end){
		var index = start;
    while(index >= end){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"><div class="username"></div><div class="timestamp"></div><div class="msg"></div></div>');
			timestamp = moment().fromNow(tweet.created_at);
      $tweet.text('@' + tweet.user + " (" + timestamp + '): ' + tweet.message);
      $tweet.appendTo($tweetContainer);
      index -= 1;
    }
	}

	/* Auto adds new tweets */
	var autorefreshTweets = function(){
		var newIndex = streams.home.length - 1;
		showTweets(newIndex,index+1);
		index = newIndex;
		setTimeout(function(){
			autorefreshTweets();
		},refreshRate);
	}
	
	autorefreshTweets();
});