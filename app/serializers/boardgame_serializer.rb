class BoardgameSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :msrp, :discount, :min_players, :max_players, :min_playtime, :max_playtime, :min_age, :description, :thumbnail, :image, :publisher, :designer, :rules_link, :num_ratings, :avg_rating, :lowest_price, :lowest_price_date, :year_published, :avg_learning_complexity, :avg_strategy_complexity, :shopping_link, :mechanic_names, :category_names
  has_many :mechanics, through: :mechanic_records, source: :mechanic
  has_many :categories, through: :category_records, source: :category

  def mechanic_names
    object.mechanics.map{|mechanic| mechanic.name}
  end

  def category_names
    object.categories.map{|category| category.name}
  end

end
