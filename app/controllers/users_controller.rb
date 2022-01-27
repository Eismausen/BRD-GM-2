class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create        
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        #if new_user
        #    UserMailer.with(user: new_user).welcome_email.deliver_now
        #end                
        render json: new_user, status: :created
    end

    def show
        render json: @current_user, status: :ok
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end
end
