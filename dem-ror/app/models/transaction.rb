class Transaction < ApplicationRecord
  belongs_to :recordable, polymorphic: true
end
