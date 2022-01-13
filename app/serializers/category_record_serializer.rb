class CategoryRecordSerializer < ActiveModel::Serializer
  attributes :id, :boardgame_id, :category_id
end
