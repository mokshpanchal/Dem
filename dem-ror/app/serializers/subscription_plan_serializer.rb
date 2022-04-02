class SubscriptioPlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :is_active, :duration, :space_allowed, :description, :allow_to_buy, :allow_to_publish
end
