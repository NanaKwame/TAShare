class CreateClassTa < ActiveRecord::Migration
  def change
    create_table :class_ta do |t|
      t.string :number
      t.string :name
      t.text :description
      t.timestamps
    end
  end
end
