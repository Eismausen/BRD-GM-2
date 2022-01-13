class Boardgame < ApplicationRecord
    has_many :category_records
    has_many :categories, through: :category_records
    has_many :mechanic_records
    has_many :mechanics, through: :mechanic_records
    has_many :inventory_records
    has_many :users, through: :inventory_records
    has_many :wishlist_records
    has_many :users, through: :wishlist_records
    
    validates :name, presence: true, uniqueness: true
end
