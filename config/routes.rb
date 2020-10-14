Rails.application.routes.draw do
  post  'set_url' => 'short_url#set_url'
  post 'urls' => 'short_url#set_url'
  get 'homepage/index'
  root 'homepage#index'

  get 'urls/:slug' => 'short_url#show'
  get 'urls/:slug/stats' => 'short_url#stats'

  get ':slug' => 'short_url#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
