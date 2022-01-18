class CategoriesController < ApplicationController
    skip_before_action :authorize, only: [:create, :code, :index]
    
    def index
        all_categories = Category.all
        render json: all_categories, status: :ok
    end
    
    def create
        new_category = Category.create!(category_params)
        render json: new_category, status: :created
    end

    def code        
        this_category = Category.find_by(code_ref: params[:code_ref])
        render json: this_category, status: :ok
    end

    private

    def category_params
        params.permit(:name, :code_ref)
    end
end
