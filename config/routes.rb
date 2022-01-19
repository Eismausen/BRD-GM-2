Rails.application.routes.draw do
  
  resources :boardgames
  resources :category_records
  resources :mechanic_records
  resources :mechanics
  resources :categories
  resources :wishlist_records
  resources :inventory_records
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/mechanics/code/:code_ref", to: "mechanics#code"
  get "/categories/code/:code_ref", to: "categories#code"

  get "/inventory_records/check/:boardgame_id", to: "inventory_records#check"
  get "/wishlist_records/check/:boardgame_id", to: "wishlist_records#check"

  post "/inventory_records/add/:boardgame_id", to: "inventory_records#special_create"
  delete "/inventory_records/remove/:boardgame_id", to: "inventory_records#special_delete"

  post "/wishlist_records/add/:boardgame_id", to: "wishlist_records#special_create"
  delete "/wishlist_records/remove/:boardgame_id", to: "wishlist_records#special_delete"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
