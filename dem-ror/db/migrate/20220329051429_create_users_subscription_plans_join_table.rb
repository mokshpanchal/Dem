class CreateUsersSubscriptionPlansJoinTable < ActiveRecord::Migration[6.1]
  def change
    create_join_table :users, :subscription_plans do |t|
      # t.index [:user_id, :subscription_plan_id]
      # t.index [:subscription_plan_id, :user_id]
    end
  end
end
