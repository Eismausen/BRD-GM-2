class BoardgamesController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index
        all_boardgames = Boardgame.all
        smaller_boardgames = all_boardgames.slice(0, 30)
        render json: smaller_boardgames, include: [:mechanic_names, :category_names], status: :ok
    end

    def show
        this_boardgame = Boardgame.find_by(id: params[:id])
        render json: this_boardgame, include: [:mechanic_names, :category_names], status: :ok
    end

    def search
        puts params.except(:controller, :action)
        results = Boardgame.all
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
            #byebug
            puts "Inside params-players"            
            results = results.filter{|boardgame| boardgame.min_players.is_a?(Integer) && boardgame.max_players.is_a?(Integer)}
            #byebug
            results = results.filter{|boardgame| boardgame.players?(params[:players].to_i)}
            #byebug
        end

        #puts results
        render json: results.slice(0, 50), status: :ok
    end

    def create
        new_boardgame = Boardgame.create!(boardgame_params)
        render json: new_boardgame, status: :created
    end

    private

    def boardgame_params
        params.permit(:name, :price, :msrp, :discount, :min_players, :max_players, :min_playtime, :max_playtime, :min_age,
            :description, :thumbnail, :image, :publisher, :designer, :rules_link, :num_ratings, :avg_rating, :lowest_price,
            :lowest_price_date, :year_published, :avg_learning_complexity, :avg_strategy_complexity, :shopping_link)
    end
end
