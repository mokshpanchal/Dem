class CreateCartItems < ActiveRecord::Migration[6.1]
  def change
    create_table :cart_items do |t|
      t.integer :quantity
      t.references :recordable, polymorphic: true, null: false
      t.references :user, null: false, foreign_key: true
      t.integer :sender_id

      t.timestamps
    end
  end
end
