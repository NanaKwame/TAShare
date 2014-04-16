class FixTypeName < ActiveRecord::Migration
  def change
  	rename_column :likes, :type, :res_type
  end
end
