class CartItemSerializer < ActiveModel::Serializer
  attributes  :id, :quantity, :content_id, :sender_id
  has_one :user, serializer: UserSerializer
  has_one :recordable, serializer: ContentSerializer

  def content_id
    return object.recordable_id
  end

end
