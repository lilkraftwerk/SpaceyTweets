$(document).ready(function() {
    bindButtons()
    zeeIndex = 10
    search = "username"
    populateHiddenPlanets()
    randomButtonText()
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


function bindButtons(){
 $("#ajax").on("click", function() {
        var searchterm = $("#searchbox").val()
        var tweetsArray = getAjaxTweets(searchterm);
    });
    $(".option").on("click", function(){
        setSearchType(this.id)
    });
    $("#searchbox").keyup(function(){
       if ($(this).val() == ""){
        $("#ajax").addClass('disabled')
        } else {
        $("#ajax").removeClass('disabled')
        }
    })
    $("#moon").on("click", function(){
        getCuratedUsername()
        $("#ajax").removeClass('disabled')
    })
}


function displayUserProfilePicture(tweeter){
    var profilePic = "<img src='" + tweeter.tweets[0].user.profile_image_url_https + "'>"
    $("#picturebox").html(profilePic)
    $("#picturebox").append(" tweets by <a href='" + tweeter.tweets[0].user.screen_name + "'>@" + tweeter.name + "</a> ")
}

function getAjaxTweets(searchterm) {
    disableSearchBox();
    $.ajax({
        url: "tweetz/" + searchterm,
        dataType: "JSON",
        type: "GET",
        data: { searchtype: search }
    }).success(function(data) {
        hideButtons()
        $("#picturebox").show()
        window[searchterm] = new Tweeter(searchterm, data)
        startLoopOfTweets(window[searchterm])
    }).error(function(){
        failedAjaxCall()
    });
}

function failedAjaxCall(){
    $("#loading").hide()
    $("#tweetbox").html("Uh oh, malfunction! Try one more time.")
    $("#ajax").show()
}

function disableSearchBox(){
    $("#ajax").html("Loading...")
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
    toPrepend.css("background-image", getRandomPlanet())
    var tweetWithLink = formatTweet(tweet)
    toPrepend.html(tweetWithLink)
    $("#tweetbox").append(toPrepend);
}

function formatTweet(tweet){
    return  "<div class='tweet-container'>"
    + addUsernameToTweet(tweet) + "<br><a target='_blank' href='https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str + "/'>" + tweet.text + "</a></div>"
}

function addUsernameToTweet(tweet){
    if (search != "username") {
        return "<div class='username-on-tweet'><a href='http://twitter.com/" + tweet.user.screen_name + "'>@" + tweet.user.screen_name + "</a></div>"
    }
    else {
        return ""
    }
}

function getRandomPlanet(){
    var planets = [
    "asteroid.png", "deathstar.png", "earth.png", "mars.png", "moon2.png", "neptune.png"
    ]
    var planet = planets[Math.floor(Math.random() * planets.length)]
    return "url('assets/" + planet + "')"
}

function randomButtonText(){
    var randomText = [
    "Punch it!",
    "Lightspeed!",
    "Liftoff!",
    "Go! Go! Go!",
    "Do it!",
    "Engage!",
    "Get Spacey!",
    "Make it so!"
    ]
    $("#ajax").html(randomText[Math.floor(Math.random() * randomText.length)])
}

function populateHiddenPlanets(){
    var planets = [
    "asteroid.png", "deathstar.png", "earth.png", "mars.png", "moon2.png", "neptune.png"
    ]
    for (i = 0; i < planets.length; i++ ){
        $("#planets").append("<img src='assets/" + planets[i] + "'>")
    }
}

function getCuratedUsername(){
    var tweeters = [
    "wolfpupy",
    "dril",
    "boring_as_heck",
    "mayeah",
    "lilbthebasedgod",
    "horse_ebooks",
    "barackobama",
    "desusnice",
    "KimKierkegaard",
    "Everyword",
    "MYSADCAT"
    ]
    $("#searchbox").val(tweeters[Math.floor(Math.random() * tweeters.length)])
}