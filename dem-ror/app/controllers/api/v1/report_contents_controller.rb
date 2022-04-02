module Api
  module V1
    class ReportContentsController < ApplicationController
      # def index
      # end

      def create
        report = ReportContent.new(user_id: current_user.id, content_id: report_content_params[:content_id])
        if report.save!
          render_success_response(report, "Content Reported!", 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      # def update
      # end

      # def edit
      # end

      # def destroy
      # end

      # def new
      # end

      # def show
      # end
    # end

    private

    def report_content_params
      params.require(:report).permit(:content_id)
    end
    end
  end
end
