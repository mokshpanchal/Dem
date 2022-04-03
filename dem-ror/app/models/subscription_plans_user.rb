class SubscriptionPlansUser < ApplicationRecord
	enum status: ["activated", "deactivated"]
end