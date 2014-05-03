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
    videos = class_ta.videos
    audios = class_ta.audios
    notes = class_ta.notes
    problems = class_ta.problems
    websites = class_ta.websites
    resources = {:videos => videos, :audios => audios, :notes => notes, :problems => problems, :websites => websites}
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => resources.to_json }
        format.json { render :json => resources.to_json }
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
