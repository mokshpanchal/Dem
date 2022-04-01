class ApplicationController < ActionController::API
	before_action :configure_params, if: :devise_controller?
	
	protected
	
	def configure_params
		devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :birth_date, :username, :phone])
		devise_parameter_sanitizer.permit(:account_update, keys: [:name, :birth_date, :username, :phone, :token])
	end
end