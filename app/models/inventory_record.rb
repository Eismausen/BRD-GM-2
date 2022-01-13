class InventoryRecord < ApplicationRecord
    belongs_to :boardgame
    belongs_to :user

    validates :boardgame_id, :user_id, presence: true    
end
