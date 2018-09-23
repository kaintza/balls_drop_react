Rails.application.routes.draw do
  root 'balls#index', :to => redirect('/public/index.html')
  post '/ball' => 'balls#show'
end
