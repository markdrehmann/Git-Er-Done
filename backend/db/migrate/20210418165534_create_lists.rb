class CreateLists < ActiveRecord::Migration[6.1]
  def change
    create_table :lists do |t|
      t.string :title
      t.boolean :archived, default: false

      t.timestamps
    end
  end
end
