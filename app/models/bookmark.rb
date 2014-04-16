class Bookmark < ActiveRecord::Base
	belongs_to :user
	belongs_to :video
	belongs_to :website
	belongs_to :audio
	belongs_to :note
	belongs_to :problem
end
