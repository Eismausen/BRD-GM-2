class CreateWishlistRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :wishlist_records do |t|
      t.integer :boardgame_id
      t.integer :user_id

      t.timestamps
    end
  end
end
