Rails.application.routes.draw do
  get 'interests/index'
  get 'interests/create'
  get 'interests/update'
  get 'interests/edit'
  get 'interests/destroy'
  get 'interests/new'
  get 'interests/show'
  get 'cart_items/index'
  get 'cart_items/create'
  get 'cart_items/update'
  get 'cart_items/edit'
  get 'cart_items/destroy'
  get 'cart_items/new'
  get 'cart_items/show'
  get 'subscription_plans/index'
  get 'subscription_plans/create'
  get 'subscription_plans/update'
  get 'subscription_plans/edit'
  get 'subscription_plans/destroy'
  get 'subscription_plans/new'
  get 'subscription_plans/show'
  get 'comments/index'
  get 'comments/create'
  get 'comments/update'
  get 'comments/edit'
  get 'comments/destroy'
  get 'comments/new'
  get 'comments/show'
  get 'credit_cards/index'
  get 'credit_cards/create'
  get 'credit_cards/update'
  get 'credit_cards/edit'
  get 'credit_cards/destroy'
  get 'credit_cards/new'
  get 'credit_cards/show'
  get 'report_contents/index'
  get 'report_contents/create'
  get 'report_contents/update'
  get 'report_contents/edit'
  get 'report_contents/destroy'
  get 'report_contents/new'
  get 'report_contents/show'
  get 'user_settings/index'
  get 'user_settings/create'
  get 'user_settings/update'
  get 'user_settings/edit'
  get 'user_settings/destroy'
  get 'user_settings/new'
  get 'user_settings/show'
  get 'notifications/index'
  get 'notifications/create'
  get 'notifications/update'
  get 'notifications/edit'
  get 'notifications/destroy'
  get 'notifications/new'
  get 'notifications/show'
  get 'content_threads/index'
  get 'content_threads/create'
  get 'content_threads/update'
  get 'content_threads/edit'
  get 'content_threads/destroy'
  get 'content_threads/new'
  get 'content_threads/show'
  get 'contents/index'
  get 'contents/create'
  get 'contents/update'
  get 'contents/edit'
  get 'contents/destroy'
  get 'contents/new'
  get 'contents/show'
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
