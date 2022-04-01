class Content < ApplicationRecord
  # require 'mp3info'
  belongs_to :user
  has_one_attached :material
  has_many :cart_items, as: :recordable
  before_save :set_file_size, :set_slug, :set_duration
  
  def set_file_size
    # self.file_size = ((File.open(self.file).size/1024).to_f/1024).round(2)
    self.file_size = 30
  end

  def set_slug
    self.slug = %W(#{self.title}).join("_")
  end

  def set_duration
    # if self.content_type == "audio"
      # Mp3Info.open(self.file)
    # else
      self.duration = "30"
    # end
  end

  def set_default_settings

  end
end
