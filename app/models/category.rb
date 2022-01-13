class Category < ApplicationRecord
    has_many :category_records
    has_many :boardgames, through: :category_records

    validates :name, :code_ref, presence: true, uniqueness: true
end
