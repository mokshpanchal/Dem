class CreateContentThreads < ActiveRecord::Migration[6.1]
  def change
    create_table :content_threads do |t|
      t.integer :status
      t.string :visibility
      t.integer :recieved_from
      t.integer :copies
      t.datetime :published_at
      t.string :purchase_state
      t.references :user, null: false, foreign_key: true
      t.references :content, null: false, foreign_key: true

      t.timestamps
    end
  end
end
