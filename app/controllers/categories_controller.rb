class CategoriesController < ApplicationController
    skip_before_action :authorize, only: [:create]
    def create
        new_category = Category.create!(category_params)
        render json: new_category, status: :created
    end

    private

    def category_params
        params.permit(:name, :code_ref)
    end
end
