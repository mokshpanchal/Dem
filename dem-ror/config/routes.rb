Rails.application.routes.draw do

    mount Rswag::Ui::Engine => '/api-docs'
    mount Rswag::Api::Engine => '/api-docs'
    
    devise_for :users, format: :json, path: 'users',
    path_names: {
       sign_in: 'login', 
       sign_out: 'logout',
       password: 'secret', 
       confirmation: 'verification',
       registration: 'register', 
       edit: 'edit/profile'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords',
      confirmations: 'users/confirmations'
    },
    sign_out_via: [:get, :post]
    namespace :api do
        namespace :v1 do
          resources :interests
          resources :cart_items
          resources :subscription_plans
          resources :comments
          resources :report_contents
          resources :credit_cards
          resources :contents
          resources :content_threads
          resources :notifications
          resources :user_settings
          post 'contents/uploadfile' => 'contents#upload_file'
        end
    end
end
