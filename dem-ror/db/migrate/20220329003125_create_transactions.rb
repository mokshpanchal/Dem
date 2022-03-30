class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.integer :sender_id
      t.integer :recipient_id
      t.float :commission
      t.integer :payment_mode
      t.integer :status
      t.float :sender_closing
      t.float :recipient_closing
      t.references :recordable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
