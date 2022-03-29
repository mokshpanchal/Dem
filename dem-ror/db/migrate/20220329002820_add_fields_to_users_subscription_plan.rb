class AddFieldsToUsersSubscriptionPlan < ActiveRecord::Migration[6.1]
  def change
    add_column :users_subscription_plans, :status, :integer
    add_column :users_subscription_plans, :expires_on, :datetime
    add_column :users_subscription_plans, :space_allocated, :float
    add_column :users_subscription_plans, :remaining_space, :float
    add_column :users_subscription_plans, :renewable, :integer
  end
end
