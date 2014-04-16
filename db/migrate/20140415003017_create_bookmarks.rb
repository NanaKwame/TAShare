class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.integer :user_id
      t.integer :video_id
      t.integer :website_id
      t.integer :audio_id
      t.integer :note_id
      t.integer :problem_id
      t.string :type
      t.timestamps
    end
  end
end
