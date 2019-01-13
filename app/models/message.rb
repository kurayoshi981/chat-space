class Message < ApplicationRecord
  belong_to :group
  belong_to :user
  has_many :messages
  validate :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
end
