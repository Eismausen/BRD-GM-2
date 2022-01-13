class User < ApplicationRecord
    has_secure_password

    has_many :inventory_records
    has_many :boardgames, through: :inventory_records
    has_many :wishlist_records
    has_many :boardgames, through: :wishlist_records

    validates :username, :email, presence: true, uniqueness: true
end
