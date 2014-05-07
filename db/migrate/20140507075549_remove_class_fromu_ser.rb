class RemoveClassFromuSer < ActiveRecord::Migration
  def change
  	remove_column :users, :class_ta_id
  end
end
