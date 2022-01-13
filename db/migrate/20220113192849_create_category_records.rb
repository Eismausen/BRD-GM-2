class CreateCategoryRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :category_records do |t|
      t.integer :boardgame_id
      t.integer :category_id

      t.timestamps
    end
  end
end
