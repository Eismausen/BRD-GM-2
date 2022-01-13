Rails.application.routes.draw do
  
  resources :boardgames
  resources :category_records
  resources :mechanic_records
  resources :mechanics
  resources :categories
  resources :wishlist_records
  resources :inventory_records
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
