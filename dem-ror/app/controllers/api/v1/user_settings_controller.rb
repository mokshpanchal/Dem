module Api
  module V1
    class UserSettingsController < ApplicationController
      before_action :authenticate_user!
      def index
        settings = UserSetting.where(user_id: current_user.id).first
        render_success_response(setting, "User settings", 200)
      end

      def update
      end
    end
  end
end
