class ClassTa < ActiveRecord::Base
	has_many :enrollments
	has_many :users, through: :enrollments
	has_many :videos
	has_many :websites
	has_many :audios
	has_many :notes
	has_many :problems
	has_many :vieweds
	has_many :resources
end
