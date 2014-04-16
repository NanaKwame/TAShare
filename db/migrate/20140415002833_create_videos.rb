class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.integer :class_ta_id
      t.string :title
      t.string :link
      t.text :description
      t.timestamps
    end
  end
end
