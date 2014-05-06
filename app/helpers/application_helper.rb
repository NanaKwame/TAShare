module ApplicationHelper
  def classjson
    @class_list = []
    ClassTa.all.each do |classTT|
      obj = {:name => classTT.name.to_s, :number => classTT.number.to_s, :link  => url_for(:controller => "class_ta", :action => "show", :id => classTT.id).to_s}
      @class_list.push(obj)
    end
    @class_list
  end
end
