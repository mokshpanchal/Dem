class Notification < ApplicationRecord
  belongs_to :redirectable, polymorphic: true
  belongs_to :notifiable, polymorphic: true
  belongs_to :user
end
