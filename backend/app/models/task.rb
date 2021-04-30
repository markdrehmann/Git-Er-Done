class Task < ApplicationRecord
  validates :description, presence: true
  belongs_to :list
end
