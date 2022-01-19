class WishlistRecordsController < ApplicationController
    
    def special_index
        user_wish_games = @current_user.wish_games                
        render json: user_wish_games, status: :ok
    end

    def create
        new_wish_record = @current_user.wishlist_records.create!(inventory_record_params)
        render json: new_wish_record, status: :ok
    end

    def check
        record_check = @current_user.wishlist_records.find_by(boardgame_id: params[:boardgame_id])
        render json: record_check, status: :ok
    end

    def special_create
        new_wish_record = @current_user.wishlist_records.create!(boardgame_id: params[:boardgame_id])
        render json: new_wish_record, status: :created
    end

    def special_delete
        delete_this = @current_user.wishlist_records.find_by(boardgame_id: params[:boardgame_id])
        delete_this.destroy
        render head: :no_content, status: :no_content
    end

    private

    def wishlist_record_params
        params.permit(:boardgame_id, :user_id)
    end

end
