class CategoryRecordsController < ApplicationController
    skip_before_action :authorize

    def index
        all_category_records = CategoryRecord.all
        render json: all_category_records, status: :ok
    end

    def create
        new_category_record = CategoryRecord.create!(category_record_params)
        render json: new_category_record, status: :created
    end
    
    private

    def category_record_params
        params.permit(:boardgame_id, :category_id)
    end
end
