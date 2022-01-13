class CreateMechanicRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :mechanic_records do |t|
      t.integer :boardgame_id
      t.integer :mechanic_id

      t.timestamps
    end
  end
end
