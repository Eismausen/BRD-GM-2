class MechanicsController < ApplicationController
    skip_before_action :authorize, only: [:create, :code, :index]

    def index
        all_mechanics = Mechanic.all
        render json: all_mechanics, status: :ok
    end

    def create
        new_mechanic = Mechanic.create!(mechanic_params)
        render json: new_mechanic, status: :created
    end

    def code
        this_mechanic = Mechanic.find_by(code_ref: params[:code_ref])
        render json: this_mechanic, status: :ok
    end

    private
    
    def mechanic_params
        params.permit(:name, :code_ref)
    end

end
