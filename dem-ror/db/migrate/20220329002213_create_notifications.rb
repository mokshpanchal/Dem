class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.string :remarks
      t.integer :silent
      t.references :redirectable, polymorphic: true, null: false
      t.references :notifiable, polymorphic: true, null: false
      t.integer :is_read
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
