class ContentThread < ApplicationRecord
  belongs_to :user
  belongs_to :content
end
