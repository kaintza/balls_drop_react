Rails.application.routes.draw do
  root 'application#index', :to => redirect('/public/index.html')
  post '/ball' => 'application#show'
  resources :application
end
