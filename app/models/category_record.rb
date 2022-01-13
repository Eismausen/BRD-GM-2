class CategoryRecord < ApplicationRecord
    belongs_to :category
    belongs_to :boardgame

    validates :category_id, :boardgame_id, presence: true
end
