class HomeController < ApplicationController
  before_action :logged_in 
  def homepage
    @class_list = []
    ClassTa.all.each do |classTT|
      obj = {:name => classTT.name.to_s, :number => classTT.number.to_s, :link  => url_for(:controller => "class_ta", :action => "show", :id => classTT.id).to_s}
      @class_list.push(obj)
    end
  end

  def help
  end

  def setting
  end

  private
  #redirects user if they are not logged in
  def logged_in
    if current_user == nil
      redirect_to new_user_session_path
    end
  end
end
