class CreateUserSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :user_settings do |t|
      t.boolean :discoverability
      t.boolean :notifications
      t.boolean :email_promotion
      t.boolean :publishable
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
