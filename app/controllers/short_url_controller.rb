class ShortUrlController < ApplicationController
  skip_before_action :verify_authenticity_token, :only => [:set_url]

  def set_url
    link = Link.find_or_create_by(link_params) rescue nil
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
    link = Link.find_by(slug: params[:slug]) rescue nil
    if link
      link.counter_up
      redirect_to link.given_url
    else
      redirect_to '/'
    end
  end

  def stats
    link = Link.find_by(slug: params[:slug]) rescue nil
    if link
      return render json: {
        counter: link.counter
      }
    else
      return render json: {
        errorMessage: 'Link is not found',
        status: :not_found
      }, status: 404
    end
  end

  private
  def link_params
    params.require(:link).permit(:given_url)
  end
end
