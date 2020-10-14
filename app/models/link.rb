class Link
  include Mongoid::Document
  include Mongoid::Timestamps

  field :given_url, type: String
  field :slug, type: String
  field :counter, type: Integer, :default => 0

  after_create :generate_slug

  validates :slug, length: { maximum: 4 }, uniqueness: {
    message: ->(object, data) do 
      "#{ENV['BASE_URL']}#{data[:value]} allready enter and it`s long URL - #{Link.find_by(slug: object.slug).given_url}"
      
    end
  }
  validates :given_url, :format => URI::regexp(%w(http https)), allow_blank: false, uniqueness: {
    message: ->(object, data) do 
      "#{data[:value]} allready enter and it`s shorten URL - #{ENV['BASE_URL']}#{Link.find_by(given_url: object.given_url)}"
      
    end
  }

  def counter_up
    update(counter: counter + 1)
  end

  private

  def generate_slug
    update(slug: SecureRandom.uuid[0..3])
  end
end
