class ClassTaController < ApplicationController
  before_action :logged_in 
  def show
    @id = params[:id]
    @class = ClassTa.find(@id)
    @resource = Resource.new
    @resource.class_ta_id = @class.id

  end

  def resourcejs
    id = params[:class_id]
    class_ta = ClassTa.find(id)
    stuff = class_ta.resources
    stuff.each do | res |
      if res.type == "Video"
        res.img = '/assets/videoIcon.png' 
      elsif res.type == "Note"
        res.img = '/assets/noteIcon.png'
      elsif res.type == "Website"
        res.img = '/assets/websiteIcon.png'
      elsif res.type == "Audio"
        res.img = '/assets/audioIcon.png'    
      end
    end
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => stuff.as_json }
        format.json { render :json => stuff.as_json}
    end

  end

  private
  #redirects user if they are not logged in
  def logged_in
    if current_user == nil
      redirect_to new_user_session_path
    end
  end
end
