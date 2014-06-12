class Tweet

  def self.make_client
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_KEY"]
      config.consumer_secret     = ENV["TWITTER_SECRET"]
    end
    client
  end

  def self.get_tweets(params)
    searchterm = params[:searchterm]
    if params[:searchtype] == "username"
      self.get_tweets_from_username(searchterm)
    elsif params[:searchtype] == "hashtag"
      self.get_tweets_from_hashtag(searchterm)
    elsif params[:searchtype] == "search"
      self.get_tweets_from_search(searchterm)
    end
  end

  def self.get_tweets_from_username(user)
    client = self.make_client
    client.user_timeline(user, {:count => 200, :include_rts => false})
  end

  def self.get_tweets_from_hashtag(hashtag)
    client = self.make_client
    client.search("\##{hashtag}", {:count => 200, :include_rts => false})
  end

  def self.get_tweets_from_search(search_term)
    client = self.make_client
    client.search(search_term, {:count => 200, :include_rts => false})
  end
end