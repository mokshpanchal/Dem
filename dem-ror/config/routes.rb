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
    scope :api do
        scope :v1 do
        end
    end
end
