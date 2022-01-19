class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        #byebug
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] ||= user.id            
            puts session[:user_id]
            render json: user, status: :ok
        else
            render json: { errors: ["Invalid Credentials"] }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
