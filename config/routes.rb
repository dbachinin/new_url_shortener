Rails.application.routes.draw do
  post  'set_url' => 'short_url#set_url'
  get 'homepage/index'
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
