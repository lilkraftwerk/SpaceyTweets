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

function bindButtons() {
    $("#ajax").on("click", function() {
        var username = $("#usernamebox").val()
        var tweetsArray = getAjaxTweets(username);
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

function getAjaxTweets(username) {
    $.ajax({
        url: "tweetz/" + username,
        dataType: "JSON",
        type: "GET"
    }).success(function(data) {
        hideButtons()
        window[username] = new Tweeter(username, data)
        startLoopOfTweets(window[username])
    }).error(function(){
        failedAjaxCall()
    });
}

function failedAjaxCall(){
    $("#tweetbox").prepend("Oops. Twitter didn't like that. Check your spelling!")
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
    var tweetWithLink = "<p><a target='_blank' href='https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str + "/'>" + tweet.text + "</a></p>"
    toPrepend.html(tweetWithLink)
    var test = "hi there hi there"
    $("#tweetbox").append(toPrepend);
}

var tweetLoadingMessages = [
    ""
    ]