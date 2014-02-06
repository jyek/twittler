$(document).ready(function(){
	/* Parameters */
  var $tweetContainer = $('.tweet-content');
  var index = -1;
	var refreshRate = 1000;
	var user = null;

	/* Refresh tweets */
	var refreshTweets = function(){
		var index = streams.home.length - 1;
		$tweetContainer.empty();
    while(index >= 0){
      var tweet = streams.home[index];

			if (user === null || user === tweet.user){
	      var $tweet = $('<div class="tweet"></div>');
				var $tweetUser = $('<div class="username"></div>');
				var $tweetTime = $('<div class="timestamp"></div>');
				var $tweetMsg = $('<div class="msg"></div>');
				$tweetUser.text('@' + tweet.user);
				$tweetTime.text( moment(tweet.created_at).fromNow() );
				$tweetMsg.text(tweet.message);
				$tweetUser.appendTo($tweet);
				$tweetTime.appendTo($tweet);
				$tweetMsg.appendTo($tweet);
	      $tweet.appendTo($tweetContainer);
			}
			
      index -= 1;
    }
		
		/* username click filters tweets by user */
		$('.username').click(function(){
			user = $(this).text().slice(1);
			$('.tweet-subheader').text('Tweets by @' + user);
		});
	}

	/* Auto refreshes tweets after every time interval */
	var autorefreshTweets = function(){
		refreshTweets();
		setTimeout(function(){
			autorefreshTweets();
		},refreshRate);
	}
		
	autorefreshTweets();
});