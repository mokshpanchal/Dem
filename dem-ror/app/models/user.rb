class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :email, :password, :name, :phone, presence: true, on: :create
  validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates_uniqueness_of :email, :phone
  # validates_format_of :phone, with:  /\(?([0-9]{3})\)?[-|\s]?([0-9]{3})[-|\s]?([0-9]{4})/, message: "- Phone number must be in XXX-XXX-XXXX format"

  has_one_attached :avatar
  has_many :contents
  has_many :content_threads
  has_and_belongs_to_many :subscription_plans
  
  validate :check_file_type ,if: :avatar_attached
  
  def check_file_type
  	if avatar.content_type.in?(%w(image/gif image/png image/jpg image/jpeg))
  		return true
  	else
  		errors.add(:avatar, "Must be a GIF/JPG/PNG file")
  	end
  end

  def avatar_attached
  	avatar.attached?
  end
end
