class ShortUrlController < ApplicationController
  def set_url
    link = Link.find_or_create_by(link_params)
    if link.slug
      return render json: {
        slug: link.slug
      }
    else
      return render json: {
        error: link.errors.messages.values.join(', ')
      }
    end
  end

  def show
    link = Link.find_by(slug: params[:id])
    if link
      redirect_to link.given_url
    else
      redirect_to '/'
    end
  end

  private
  def link_params
    params.require(:link).permit(:given_url)
  end
end
