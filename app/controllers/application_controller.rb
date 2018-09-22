class ApplicationController < ActionController::API
  def index
  end

  def show
    count = params[:count]
    create_ball(count)
    render json: @ball
  end

  private

  def create_ball(count)
    if count % 2 == 0
      @ball = Ball.new(color: "blue")
    else
      @ball = Ball.new(color: "red")
    end

  end
end