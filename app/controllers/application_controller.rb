class ApplicationController < ActionController::API
  def index
  end

  def show
    count = params[:count]
    ball = create_ball(count)
    render json: ball.color
  end

  private

  def create_ball(count)
    if count % 15 == 0
      Ball.new(color: "purple")
    elsif count % 5 == 0
      Ball.new(color: "blue")
    elsif count % 3 == 0
      Ball.new(color: "green")
    else
      Ball.new(color: "pink")
    end
  end
end