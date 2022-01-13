class MechanicRecord < ApplicationRecord
    belongs_to :mechanic
    belongs_to :boardgame

    validates :mechanic_id, :boardgame_id, presence: true
end
