class WishlistRecord < ApplicationRecord
    belongs_to :user
    belongs_to :boardgame

    validates :user_id, :boardgame_id, presence: true
    validates :boardgame_id, uniqueness: {scope: :user}
end
