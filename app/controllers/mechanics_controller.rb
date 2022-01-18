class MechanicsController < ApplicationController
    skip_before_action :authorize, only: [:create]
    def create
        new_mechanic = Mechanic.create!(mechanic_params)
        render json: new_mechanic, status: :created
    end

    private
    
    def mechanic_params
        params.permit(:name, :code_ref)
    end

end
