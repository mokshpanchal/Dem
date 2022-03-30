class ContentSerializer < ActiveModel::Serializer
  attributes  :created_at
  has_one :user, serializer: UserSerializer

  def created_at
  	diff = (Date.today - object.created_at.to_date).to_i
  	if (diff<=30)
  		days = diff
  		return "#{days} Days"
  	elsif (diff>30 && diff<=365)
  		months = diff/30 + ((diff.to_f%30)/10)
  		return "#{months} Months"
  	elsif (diff>365)
  		return "More than 1 year"
 		end
  end

end
