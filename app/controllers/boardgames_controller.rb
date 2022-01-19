class BoardgamesController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index
        all_boardgames = Boardgame.all
        smaller_boardgames = all_boardgames.slice(0, 30)
        render json: smaller_boardgames, status: :ok
    end

    def show
        this_boardgame = Boardgame.find_by(id: params[:id])
        render json: this_boardgame, status: :ok
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
