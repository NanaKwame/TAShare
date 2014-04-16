class CreateVieweds < ActiveRecord::Migration
  def change
    create_table :vieweds do |t|
      t.integer :user_id
      t.integer :class_ta_id
      t.timestamps
    end
  end
end
