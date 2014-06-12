class SpaceController < ApplicationController
  def index
  end

  def tweetz
    @tweets = Tweet.get_tweets(params)
    render json: @tweets
  end
end
