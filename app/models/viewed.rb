class Viewed < ActiveRecord::Base
	belongs_to :user
	belongs_to :class_ta
end
