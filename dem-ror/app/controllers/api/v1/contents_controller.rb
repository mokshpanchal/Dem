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
        content.user_id = current_user.id
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
        content = Content.find(params[:content_id])
        material = params[:material]
        # tempfile  = Tempfile.new(content.id.to_s)
        # tempfile.binmode
        # tempfile.write(Base64.decode64(material))
        content.material = material
        # content.link =  Rails.application.routes.url_helpers.rails_blob_path(content.material, only_path: true)
        if content.save!

          blob = content.material.blob
          route = Rails.root.join('public', content.title)

          File.open(route, "wb+") do |file| 
            blob.download { |chunk| file.write(chunk) }
          end
          content.link = route
          render_success_response(content, "File uploaded successfully", 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
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
          if params[:search] == "all"
            locations = Content.all.pluck(:location).uniq
            json = locations.map { |e| {e.to_sym => Content.where(location: e).count}}
            return render json: json
          end
          if (params[:search].include? "own")
            id = params[:search].split("-")[1].to_i
            contents = Content.where(user_id: id)
            return render_success_response(array_serializer.new(contents, serializer: ContentSerializer, current_user: current_user),200)
          end
          contents = Content.where('lower(title) LIKE ? OR lower(description) LIKE ? OR lower(price) LIKE ? OR lower(slug) LIKE ?',"%#{query}%","%#{query}%","%#{query}%","%#{query}%")
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