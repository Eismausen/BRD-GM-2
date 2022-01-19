class InventoryRecordsController < ApplicationController
    
    def show
        all_records = InventoryRecord.all
        render json: all_records, status: :ok
    end

    def special_index
        user_inv_games = @current_user.inv_games
        render json: user_inv_games, status: :ok
    end

    def create
        new_inv_record = @current_user.inventory_records.create!(inventory_record_params)
        render json: new_inv_record, status: :ok
    end

    def check
        #byebug
        record_check = @current_user.inventory_records.find_by(boardgame_id: params[:boardgame_id])
        render json: record_check, status: :ok
    end

    def special_create
        new_inv_record = @current_user.inventory_records.create!(boardgame_id: params[:boardgame_id])
        render json: new_inv_record, status: :created
    end

    def special_delete
        delete_this = @current_user.inventory_records.find_by(boardgame_id: params[:boardgame_id])
        delete_this.destroy
        render head: :no_content, status: :no_content
    end

    private

    def inventory_record_params
        params.permit(:boardgame_id, :user_id)
    end

end
