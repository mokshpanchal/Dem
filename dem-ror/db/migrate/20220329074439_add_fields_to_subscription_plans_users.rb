class AddFieldsToSubscriptionPlansUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :subscription_plans_users, :status, :integer
    add_column :subscription_plans_users, :expires_on, :datetime
    add_column :subscription_plans_users, :space_allowed, :float
    add_column :subscription_plans_users, :remaining_space, :float
    add_column :subscription_plans_users, :renewable, :integer
  end
end
