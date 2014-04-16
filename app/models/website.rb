class Website < ActiveRecord::Base
	belongs_to :class_ta
	belongs_to :like
	belongs_to :bookmark
	has_many :likes
	has_many :bookmarks
end
