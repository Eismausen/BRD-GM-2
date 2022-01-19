class UserMailer < ApplicationMailer
    default from: "donotreply@brdgm.com"
    layout 'mailer'

    def welcome_email
        @user = params[:user]

        mail(to: @user.email, subject: "Welcome! Why did you use a real email address?")
    end
end
