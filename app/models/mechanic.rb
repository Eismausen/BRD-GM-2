class Mechanic < ApplicationRecord
    has_many :mechanic_records
    has_many :boardgames, through: :mechanic_records

    validates :name, :code_ref, presence: true, uniqueness: true
end
