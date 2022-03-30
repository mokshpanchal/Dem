class CreateUsersSubscriptionPlansJoinTable < ActiveRecord::Migration[6.1]
  def change
    create_join_table :users, :subscription_plans do |t|
      add_column :users_subscription_plans, :status, :integer
      add_column :users_subscription_plans, :expires_on, :datetime
      add_column :users_subscription_plans, :space_allocated, :float
      add_column :users_subscription_plans, :remaining_space, :float
      add_column :users_subscription_plans, :renewable, :integer
      # t.index [:user_id, :subscription_plan_id]
      # t.index [:subscription_plan_id, :user_id]
    end
  end
end
