class Boardgame < ApplicationRecord
    #attr_accessor :mechanic_names, :category_names
    has_many :category_records
    has_many :categories, through: :category_records, source: :category
    has_many :mechanic_records
    has_many :mechanics, through: :mechanic_records, source: :mechanic    
    has_many :inventory_records
    has_many :users, through: :inventory_records
    has_many :wishlist_records
    has_many :users, through: :wishlist_records
    
    validates :name, presence: true, uniqueness: true

    def mechanic_names
        response = self.mechanics.map{|mechanic| mechanic.name}
    end

    def category_names
        response = self.categories.map{|category| category.name}
    end

    def mechanics_include?(str)        
        self.mechanic_names.each do |name|
            if name.downcase.include?(str.downcase)
                return true
            end
        end
        return false
    end

    def categories_include?(str)
        self.category_names.each do |name|
            if name.downcase.include?(str.downcase)
                return true
            end
        end
        return false
    end

    def name_include?(str)
        if self.name.downcase.include?(str.downcase)
            return true
        end
        return false
    end
    
    def players?(int)
        if self.min_players <= int && self.max_players >= int
            return true
        end
        return false
    end

end
