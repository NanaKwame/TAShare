class CreateEnrollment < ActiveRecord::Migration
  def change
    create_table :enrollments do |t|
    	t.integer :user_id
    	t.integer :class_ta_id

    end
  end
end
