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

    def search
        puts params.except(:controller, :action)
        results = @current_user.inv_games.all
        if params[:name]
            puts "Inside params-name"
            results = results.filter{|boardgame| boardgame.name_include?(params[:name])}
        end
        
        if params[:category]
            puts "Inside params-category"
            results = results.filter{|boardgame| boardgame.categories_include?(params[:category])}
        end

        if params[:mechanic]
            puts "Inside params-mechanic"
            results = results.filter{|boardgame| boardgame.mechanics_include?(params[:mechanic])}
        end

        if params[:players]
            puts "Inside params-players"            
            results = results.filter{|boardgame| boardgame.min_players.is_a?(Integer) && boardgame.max_players.is_a?(Integer)}            
            results = results.filter{|boardgame| boardgame.players?(params[:players].to_i)}
        end

        puts results
        render json: results, status: :ok
    end

    def check
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
