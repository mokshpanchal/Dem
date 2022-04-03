module Api
  module V1
    class SubscriptionPlansController < ApplicationController
      include ResourceRenderer
      def index
        plans = SubscriptionPlan.all
        if plans.present?
          render_success_response(array_serializer.new(plans, serializer: SubscriptionPlanSerializer, current_user: current_user), 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end
    end
  end
end
