class Resource < ActiveRecord::Base
	belongs_to :class_ta
	belongs_to :like
	belongs_to :bookmark
	has_many :likes
	has_many :bookmarks
	has_attached_file :file, 
        :styles => { :medium => "300x300>", :thumb => "100x100>" }, 
        :default_url => "/images/:style/missing.png"

end
