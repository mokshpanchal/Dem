# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  include ResourceRenderer
  # GET /resource/password/new
  def new
    super
    UserMailer.with(email: params[:email]).reset_password.deliver_now  
  end

  # POST /resource/password
  # def create
  #   super
  # end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  def update

    self.resource = resource_class.find_by_reset_password_token(resource_params['token'])
    return render_unprocessable_entity("Reset Password link expired") unless self.resource.reset_password_period_valid?
    self.resource.reset_password(resource_params['password'], resource_params['confirm_password'])
    self.resource.reset_password_sent_at = Time.now.utc - 6.hours
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
        resource.after_database_authentication
        sign_in(resource_name, resource)
      else
        set_flash_message!(:notice, :updated_not_active)
      end
      respond_with resource, location: after_resetting_password_path_for(resource)
    else
      set_minimum_password_length
      respond_with resource
    end

    UserMailer.with(user: self.resource).password_has_been_updated.deliver_now if resource.errors.empty?
  end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
