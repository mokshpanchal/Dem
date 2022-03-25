class UserMailer < ApplicationMailer
	default from: 'app.dem.ca@gmail.com'

	def welcome_email
		@user = params[:user]
		@url  = 'http://localhost:4000/dashboard'
		return false unless @user
		mail(to: @user.email, subject: "Welcome to Dem #{@user.name.capitalize} !")
	end

	def reset_password
		@user = User.find_by_email(params[:email])
		return false unless @user
		create_reset_password_token(@user)
		@url  = "http://localhost:4000/forgot_password/#{@user.id}?token=#{@user.reset_password_token}"
		mail(to: @user.email, subject: "Reset your password")
	end

	def password_has_been_updated
		@user = params[:user]
		@url  = 'http://localhost:4000/login'
		return false unless @user
		mail(to: @user.email, subject: "Your password has been updated")
	end

	private

	def create_reset_password_token user
	raw, hashed = Devise.token_generator.generate(User, :reset_password_token)
	@token = raw
	user.reset_password_token = hashed
	user.reset_password_sent_at = Time.now.utc
	user.save
	render json: {reset_password_token: hashed}
	end
end
