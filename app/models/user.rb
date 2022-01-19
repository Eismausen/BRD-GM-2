class User < ApplicationRecord
    has_secure_password

    has_many :inventory_records
    has_many :inv_games, through: :inventory_records, source: :boardgame
    has_many :wishlist_records
    has_many :wish_games, through: :wishlist_records, source: :boardgame

    validates :username, :email, presence: true, uniqueness: true
end
