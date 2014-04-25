class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.integer :class_ta_id
      t.string :title
      t.string :link
      t.attachment :file
      t.string :type
      t.text :description
      t.timestamps
    end
  end
end
