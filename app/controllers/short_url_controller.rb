class ShortUrlController < ApplicationController
  def set_url
    return render json: {
      status: 'ok',
      data: 'fff'
    }
  end

  private
  def link_params
    params.require(:link).permit(:dest_url)
  end
end
