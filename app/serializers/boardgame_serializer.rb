class BoardgameSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :msrp, :discount, :min_players, :max_players, :min_playtime, :max_playtime, :min_age, :description, :thumbnail, :image, :publisher, :designer, :rules_link, :num_ratings, :avg_rating, :lowest_price, :lowest_price_date, :year_published, :avg_learning_complexity, :avg_strategy_complexity, :shopping_link
end
