module Api
  module V1
    class ContentsController < ApplicationController
      include ResourceRenderer
      before_action :accept_all_params
      def index
        contents = Content.all
        if contents.present?
          render_success_response(array_serializer.new(contents.reverse, serializer: ContentSerializer, current_user: current_user), 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      def create
        content = Content.new(content_params.except(:material))
        content.user_id = current_user&.id || 1
        if content.save!
          render_success_response(content, "Content created successfully", 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      def show    
        content = Content.where(id: params[:id]).first
        if content.present?
          render_success_response(single_serializer(content, ContentSerializer, current_user: current_user), 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      def upload_file
        content  = Content.find(params[:content_id])
        material = params[:material]

        content.material.attach(material)

        content.save!

        content.update!(
          link: Rails.application.routes.url_helpers.rails_blob_path(content.material, only_path: true)
        )

        render_success_response(content, "File uploaded successfully", 200)
      rescue ActiveRecord::RecordInvalid => e
        render_unprocessable_entity("Something went wrong", 422)
      end

      def update
        content = Content.where(id: params[:id]).first
        if content.update(content_update_params)
          render_success_response(single_serializer(content, ContentSerializer, current_user: current_user),"Content updated successfully", 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      def destroy
        content = Content.where(id: params[:id]).first
        if content.destroy!
          render_success_response("Content deleted successfully", 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      def search
        if params[:search].present?
          query = params[:search].downcase
          if (params[:search].include? "my")
            id = current_user.&id || 1
            contents = Content.where(user_id: id)
            return render_success_response(array_serializer.new(contents, serializer: ContentSerializer, current_user: current_user),200)
          end
          contents = Content.where('lower(title) LIKE ? OR lower(description) LIKE ? ',"%#{query}%","%#{query}%")
          return render_success_response(array_serializer.new(contents, serializer: ContentSerializer, current_user: current_user),200)
        else
          index()
        end
      end

      private

      def accept_all_params
        params.permit!
      end

      def content_params
        params.require(:content).permit(:user_id, :title, :content_type, :link, :description, :duration, :price, :file_size, :slug, :material)
      end

      def content_update_params
        params.require(:content).permit(:title, :content_type, :description, :duration, :price, :file_size, :slug)
      end
    end
  end
end