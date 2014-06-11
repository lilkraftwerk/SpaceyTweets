$(document).ready(function() {
    lilb = new Tweeter("lilb", lilbTweets)
    horse = new Tweeter("horse", horseTweets)
    bindButtons()
    zeeIndex = 10
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
    addTweetInRandomSpot(tweeter.getRandomTweet())
    setInterval(function() {
        addTweetInRandomSpot(tweeter.getRandomTweet())
    }, 3000)
}

function putTweetOnDom(tweet) {
    $("#tweetbox").html(tweet)
}

function hideButtons() {
    $("#buttonz").hide()
}

function bindButtons() {
    $("#horse").on("click", function() {
        $("#moon").show()
        hideButtons()
        startLoopOfTweets(horse)
    })
    $("#lilb").on("click", function() {
        $("#moon").show()
        hideButtons()
        startLoopOfTweets(lilb)
    })
    $("#ajax").on("click", function() {
        $("#moon").show()
        hideButtons()
        var username = $("#usernamebox").val()
        console.log(username)
        var tweetsArray = getAjaxTweets(username);


    })
}

function getAjaxTweets(username) {
    $.ajax({
        url: "tweetz/" + username,
        dataType: "JSON",
        type: "GET"
    }).done(function(data) {
        console.log(data)
        window[username] = new Tweeter(username, data)
        startLoopOfTweets(window[username])
    });
}


function addTweetInRandomSpot(tweet) {
    zeeIndex += 1;
    var randomRotation = Math.floor(Math.random() * 41) - 20;
    var randomLeft = Math.floor(Math.random() * 15) + 5;
    var randomTop = Math.floor(Math.random() * 40) + 5;
    var toPrepend = $("<div>", {
        class: "one-tweet"
    })
    toPrepend.css("top", randomTop + "%").css('left', randomLeft + "%")
    toPrepend.css({
        transform: 'rotate(' + randomRotation + 'deg)'
    });
    var tweetWithLink = "<a target='_blank' href='https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str + "/'>" + tweet.text + "</a>"
    console.log(tweetWithLink)
    toPrepend.html(tweetWithLink)
    console.log('here')
    console.log(toPrepend)
    var test = "hi there hi there"
    $("#tweetbox").append(toPrepend);
}

function layoverTest() {
    $('#tweetbox').append(lilb.getRandomTweet());
}