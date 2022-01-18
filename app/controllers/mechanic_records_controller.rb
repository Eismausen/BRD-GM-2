class MechanicRecordsController < ApplicationController
    skip_before_action :authorize

    def index
        all_mechanic_records = MechanicRecord.all
        render json: all_mechanic_records, status: :ok
    end

    def create
        new_mechanic_record = MechanicRecord.create!(mechanic_record_params)
        render json: new_mechanic_record, status: :created
    end

    private

    def mechanic_record_params
        params.permit(:boardgame_id, :mechanic_id)
    end
end
