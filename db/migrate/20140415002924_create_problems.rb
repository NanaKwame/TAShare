class CreateProblems < ActiveRecord::Migration
  def change
    create_table :problems do |t|
      t.integer :class_ta_id
      t.string :title
      t.string :link
      t.text :description
      t.timestamps
    end
  end
end
