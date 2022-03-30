class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :phone_number, :name, :created_at

  def created_at
  	object.created_at.to_formatted_s(:rfc822)[0,16]
  end
end
