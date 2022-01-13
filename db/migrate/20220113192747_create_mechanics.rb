class CreateMechanics < ActiveRecord::Migration[6.1]
  def change
    create_table :mechanics do |t|
      t.string :name
      t.string :code_ref

      t.timestamps
    end
  end
end
