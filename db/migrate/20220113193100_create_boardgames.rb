class CreateBoardgames < ActiveRecord::Migration[6.1]
  def change
    create_table :boardgames do |t|
      t.string :name
      t.float :price
      t.float :msrp
      t.float :discount
      t.integer :min_players
      t.integer :max_players
      t.integer :min_playtime
      t.integer :max_playtime
      t.integer :min_age
      t.text :description
      t.string :thumbnail
      t.string :image
      t.string :publisher
      t.string :designer
      t.string :rules_link
      t.integer :num_ratings
      t.float :avg_rating
      t.float :lowest_price
      t.date :lowest_price_date
      t.string :year_published
      t.float :avg_learning_complexity
      t.float :avg_strategy_complexity
      t.string :shopping_link

      t.timestamps
    end
  end
end
