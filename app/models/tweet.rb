class Tweet

  def self.make_client
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_KEY"]
      config.consumer_secret     = ENV["TWITTER_SECRET"]
    end
    client
  end

  def self.get_tweets(user)
    client = self.make_client
    client.user_timeline(user, {:count => 200, :include_rts => false})
  end
end