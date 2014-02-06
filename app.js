$(document).ready(function(){
  var $body = $('body');
  $body.html('');

	/* Parameters */
  var index = -1;
	var refreshRate = 1000;

	/* Show tweets between start and end indices */
	var showTweets = function(start,end){
		var index = start;
    while(index >= end){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + " (" + tweet.created_at + '): ' + tweet.message);
      $tweet.appendTo($body);
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