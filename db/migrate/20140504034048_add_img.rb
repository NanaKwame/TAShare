class AddImg < ActiveRecord::Migration
  def change
  	add_column :resources, :img, :string
  end
end
