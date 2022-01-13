class WishlistRecordSerializer < ActiveModel::Serializer
  attributes :id, :boardgame_id, :user_id
end
