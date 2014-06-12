class SpaceController < ApplicationController
  def index
  end

  def tweetz
    @tweets = Tweet.get_tweets_from_user(params[:username])
    render json: @tweets
  end
end
