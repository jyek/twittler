$(document).ready(function(){
	/* Parameters */
  var $tweetContainer = $('.tweet-content');
  var index = -1;
	var refreshRate = 3000;
	var user = null;

	/* Show all tweets button */
	var $showAllButton = $('<span class="onclick-show-all"><i class="fa fa-home"></i> All Tweets</span>');
	$showAllButton.click(function(){
		user = null;
		$('.tweet-subheader').empty();
		$('.onclick-show-all').detach();
		refreshTweets();
	})

	/* Refresh tweets */
	var refreshTweets = function(){

		// get tweets
		var tweets;
		if (user === null){
			tweets = streams.home;
		} else {
			tweets = streams.users[user];
		}
		
		// refresh view
		var index = tweets.length - 1;
		$tweetContainer.empty();
    while(index >= 0){
      var tweet = tweets[index];
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
      index -= 1;
    }
		
		// when clicked, filters tweets by user
		$('.username').click(function(){
			user = $(this).text().slice(1);
			$('.tweet-subheader').append('Tweets by @' + user);
			if ( $('.onclick-show-all').length === 0){
				$('.tweet-nav').prepend($showAllButton);
			}
			refreshTweets();
		});
	}
	
	/* Auto refreshes tweets after every time interval */
	var autorefreshTweets = function(){
		refreshTweets();
		setTimeout(function(){
			autorefreshTweets();
		},refreshRate);
	}

	/* Kickstart program */
	autorefreshTweets();
});