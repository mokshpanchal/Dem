module Api
  module V1
    class CartItemsController < ApplicationController
      include ResourceRenderer
      def index
        items = CartItem.where(user_id: current_user.&id || 1)
        if items.present?
          render_success_response(array_serializer.new(items.reverse, serializer: CartItemSerializer, current_user: current_user), 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      def create
        cart_item = CartItem.new(quantity: 1, recordable_type: 'Content', recordable_id: cart_params[:content_id], user_id: current_user.&id || 1 , sender_id: cart_params[:sender_id])
        if cart_item.save!
          render_success_response(cart_item, "Added to cart", 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      def destroy
        cart_item = CartItem.find(params[:id])
        if cart_item.destroy!
          render_success_response(cart_item, "Removed from cart", 200)
        else
          render_unprocessable_entity("Something went wrong", 422)
        end
      end

      # def update
      # end

      # def edit
      # end

      # def new
      # end

      # def show
      # end

      private

      def cart_params
        params.require(:cart).permit(:content_id, :sender_id)
      end
    end
  end
end
