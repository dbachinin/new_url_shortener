class ShortUrlController < ApplicationController
  def set_url
    render json: {
      status: 'ok',
      data: 'fff'
    }
  end
end
