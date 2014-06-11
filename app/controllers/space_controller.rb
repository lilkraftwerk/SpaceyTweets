class SpaceController < ApplicationController
  def index
  end

  def tweetz
    @tweets = Tweet.get_tweets(params[:username])
    render json: @tweets
  end
end
