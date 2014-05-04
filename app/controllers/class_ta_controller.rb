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
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => stuff.as_json }
        format.json { render :json => stuff.as_json}
    end
  end

  def addlike
    resid = params[:resource_id]
    Like.create(:user_id => current_user.id, :resource_id => resid)
    currentlikes = Like.where(:resource_id => resid)
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => currentlikes.as_json }
        format.json { render :json => currentlikes.as_json}
    end
  end

  def addbookmark
    resid = params[:resource_id]
    Bookmark.create(:user_id => current_user.id, :resource_id => resid)
    currentbookmarks = Bookmark.where(:resource_id => resid)
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => currentbookmarks.as_json }
        format.json { render :json => currentbookmarks.as_json}
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
