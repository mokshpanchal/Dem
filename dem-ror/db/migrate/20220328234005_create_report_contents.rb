class CreateReportContents < ActiveRecord::Migration[6.1]
  def change
    create_table :report_contents do |t|
      t.string :description
      t.string :reason
      t.references :user, null: false, foreign_key: true
      t.references :content, null: false, foreign_key: true

      t.timestamps
    end
  end
end
