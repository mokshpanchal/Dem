class CreateSubscriptionPlans < ActiveRecord::Migration[6.1]
  def change
    create_table :subscription_plans do |t|
      t.float :price
      t.string :name
      t.boolean :is_active
      t.integer :duration
      t.float :space_allowed
      t.string :description
      t.integer :allow_to_buy
      t.integer :allow_to_publish

      t.timestamps
    end
  end
end
