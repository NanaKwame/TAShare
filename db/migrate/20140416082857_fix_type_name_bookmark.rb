class FixTypeNameBookmark < ActiveRecord::Migration
  def change
  	rename_column :bookmarks, :type, :res_type
  end
end
