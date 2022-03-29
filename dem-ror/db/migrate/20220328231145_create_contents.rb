class CreateContents < ActiveRecord::Migration[6.1]
  def change
    create_table :contents do |t|
      t.string :link
      t.string :content_type
      t.string :title
      t.string :description
      t.string :duration
      t.float :price
      t.float :file_size
      t.string :slug
      t.string :length
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
