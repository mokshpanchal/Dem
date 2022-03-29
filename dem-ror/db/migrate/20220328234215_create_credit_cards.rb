class CreateCreditCards < ActiveRecord::Migration[6.1]
  def change
    create_table :credit_cards do |t|
      t.string :card_type
      t.integer :digits
      t.integer :exp_month
      t.integer :exp_year
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
