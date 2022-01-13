class WishlistRecord < ApplicationRecord
    belongs_to :user
    belongs_to :boardgame

    validates :user_id, :boardgame_id, presence: true
end
