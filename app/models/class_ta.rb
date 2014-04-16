class ClassTa < ActiveRecord::Base
	has_many :users
	has_many :videos
	has_many :websites
	has_many :audios
	has_many :notes
	has_many :problems
	has_many :vieweds
end
