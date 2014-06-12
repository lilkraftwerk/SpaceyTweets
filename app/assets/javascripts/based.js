$(document).ready(function() {
    bindButtons()
    zeeIndex = 10
    search = "username"
})

function Tweeter(name, tweets) {
    this.name = name
    this.tweets = tweets
}

Tweeter.prototype.randomTweetNumber = function() {
    return Math.floor((Math.random() * this.tweets.length) + 1)
}

Tweeter.prototype.getRandomTweet = function() {
    return this.tweets[this.randomTweetNumber()]
}


function startLoopOfTweets(tweeter) {
    displayUserProfilePicture(tweeter)
    addTweetInRandomSpot(tweeter.getRandomTweet())
    setInterval(function() {
        addTweetInRandomSpot(tweeter.getRandomTweet())
    }, 3000)
}

function putTweetOnDom(tweet) {
    $("#tweetbox").html(tweet)
}



function setSearchType(id){
    search = id;
    if (id == "username")
        $("#current-search").html("@")
    else if (id == "hashtag")
        $("#current-search").html("#")
    else if (id == "search")
        $("#current-search").html("search for").css("value", "search")
}

function hideButtons() {
    $("#buttonz").hide()
    $("#header").hide()
    $("#choices").hide()
}

function showButtons() {
    $("#buttonz").show()
    $("#header").show()
    $("#choices").show()
}

function bindButtons() {
    $("#ajax").on("click", function() {
        var searchterm = $("#searchbox").val()
        var tweetsArray = getAjaxTweets(searchterm);
    })
    $(".option").on("click", function(){
        setSearchType(this.id)
    })
}

function displayUserProfilePicture(tweeter){
    var profilePic = "<img src='" + tweeter.tweets[0].user.profile_image_url_https + "'>"
    $("#picturebox").html(profilePic)
    $("#picturebox").append(" tweets from <a href='" + tweeter.tweets[0].user.screen_name + "'>@" + tweeter.name + "</a> ")
}

function getAjaxTweets(searchterm) {
    $.ajax({
        url: "tweetz/" + searchterm,
        dataType: "JSON",
        type: "GET",
        data: { searchtype: search }
    }).success(function(data) {
        hideButtons()
        window[searchterm] = new Tweeter(searchterm, data)
        startLoopOfTweets(window[searchterm])
    }).error(function(){
        failedAjaxCall()
    });
}

function failedAjaxCall(){
    $("#tweetbox").html("Oops. Twitter didn't like that. Check your spelling!")
}

function addTweetInRandomSpot(tweet) {
    zeeIndex += 1;
    var randomRotation = Math.floor(Math.random() * 35) - 16;
    var randomLeft = Math.floor(Math.random() * 77) + 2;
    var randomTop = Math.floor(Math.random() * 60) + 10;
    var toPrepend = $("<div>", {
        class: "one-tweet"
    })
    toPrepend.css("top", randomTop + "%").css('left', randomLeft + "%")
    toPrepend.css({
        transform: 'rotate(' + randomRotation + 'deg)'
    });
    var tweetWithLink = formatTweet(tweet)
    toPrepend.html(tweetWithLink)
    $("#tweetbox").append(toPrepend);
}

function formatTweet(tweet){
    return "<a target='_blank' href='https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str + "/'>" + tweet.text + "</a>" + addUsernameToTweet(tweet)
}

function addUsernameToTweet(tweet){
    if (search != "username") {
        return "<div class='username-on-tweet'><a href='http://twitter.com/" + tweet.user.screen_name + "'>@" + tweet.user.screen_name + "</a></div>"
    }
    else {
        return ""
    }
}