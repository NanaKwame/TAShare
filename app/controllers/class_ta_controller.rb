class ClassTaController < ApplicationController
  require 'json'
  before_action :logged_in 
  def show
    @id = params[:id]
    @class = ClassTa.find(@id)
    @resource = Resource.new
    @resource.user_id = current_user.id
    puts @resource.inspect
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

  def removelike
    resid = params[:resource_id]
    Like.where(:user_id => current_user.id, :resource_id => resid).destroy_all
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => {:status => "Deleted"} }
        format.json { render :json => {:status => "Deleted"}}
    end
  end

  def removebookmark
    resid = params[:resource_id]
    Bookmark.where(:user_id => current_user.id, :resource_id => resid).destroy_all
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => {:status => "Deleted"} }
        format.json { render :json => {:status => "Deleted"}}
    end
  end

  def removeresource
    resid = params[:resource_id]
    Resource.where(:id => resid).destroy_all
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => {:status => "Deleted"} }
        format.json { render :json => {:status => "Deleted"}}
    end
  end

  def addprofilepic
    puts params.inspect
    current_user.update_attributes(:avatar => params[:avatar])
    redirect_to :back
  end

  def addenroll
    Enrollment.create(:user_id => params[:user_id],:class_ta_id => params[:class_ta_id])
    respond_to do |format|
        format.html  { render :nothing => true }
        format.xml  { render :xml => {:status => "Added"} }
        format.json { render :json => {:status => "Added"}}
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
