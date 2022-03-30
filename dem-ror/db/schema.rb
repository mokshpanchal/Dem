# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_29_074439) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "cart_items", force: :cascade do |t|
    t.integer "quantity"
    t.string "recordable_type", null: false
    t.bigint "recordable_id", null: false
    t.bigint "user_id", null: false
    t.integer "sender_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recordable_type", "recordable_id"], name: "index_cart_items_on_recordable"
    t.index ["user_id"], name: "index_cart_items_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "rating"
    t.string "note"
    t.integer "status"
    t.bigint "user_id", null: false
    t.bigint "content_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["content_id"], name: "index_comments_on_content_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "content_threads", force: :cascade do |t|
    t.integer "status"
    t.string "visibility"
    t.integer "recieved_from"
    t.integer "copies"
    t.datetime "published_at"
    t.string "purchase_state"
    t.bigint "user_id", null: false
    t.bigint "content_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["content_id"], name: "index_content_threads_on_content_id"
    t.index ["user_id"], name: "index_content_threads_on_user_id"
  end

  create_table "contents", force: :cascade do |t|
    t.string "link"
    t.string "content_type"
    t.string "title"
    t.string "description"
    t.string "duration"
    t.float "price"
    t.float "file_size"
    t.string "slug"
    t.string "length"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_contents_on_user_id"
  end

  create_table "credit_cards", force: :cascade do |t|
    t.string "card_type"
    t.integer "digits"
    t.integer "exp_month"
    t.integer "exp_year"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_credit_cards_on_user_id"
  end

  create_table "interests", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "interests_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "interest_id", null: false
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "remarks"
    t.integer "silent"
    t.string "redirectable_type", null: false
    t.bigint "redirectable_id", null: false
    t.string "notifiable_type", null: false
    t.bigint "notifiable_id", null: false
    t.integer "is_read"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["notifiable_type", "notifiable_id"], name: "index_notifications_on_notifiable"
    t.index ["redirectable_type", "redirectable_id"], name: "index_notifications_on_redirectable"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "report_contents", force: :cascade do |t|
    t.string "description"
    t.string "reason"
    t.bigint "user_id", null: false
    t.bigint "content_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["content_id"], name: "index_report_contents_on_content_id"
    t.index ["user_id"], name: "index_report_contents_on_user_id"
  end

  create_table "subscription_plans", force: :cascade do |t|
    t.float "price"
    t.string "name"
    t.boolean "is_active"
    t.integer "duration"
    t.float "space_allowed"
    t.string "description"
    t.integer "allow_to_buy"
    t.integer "allow_to_publish"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "subscription_plans_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "subscription_plan_id", null: false
    t.integer "status"
    t.datetime "expires_on"
    t.float "space_allowed"
    t.float "remaining_space"
    t.integer "renewable"
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "sender_id"
    t.integer "recipient_id"
    t.float "commission"
    t.integer "payment_mode"
    t.integer "status"
    t.float "sender_closing"
    t.float "recipient_closing"
    t.string "recordable_type", null: false
    t.bigint "recordable_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recordable_type", "recordable_id"], name: "index_transactions_on_recordable"
  end

  create_table "user_settings", force: :cascade do |t|
    t.boolean "discoverability"
    t.boolean "notifications"
    t.boolean "email_promotion"
    t.boolean "publishable"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_settings_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "phone", null: false
    t.string "provider"
    t.string "uid"
    t.string "name", null: false
    t.string "image"
    t.date "birth_date", null: false
    t.string "username", null: false
    t.string "country_code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "cart_items", "users"
  add_foreign_key "comments", "contents"
  add_foreign_key "comments", "users"
  add_foreign_key "content_threads", "contents"
  add_foreign_key "content_threads", "users"
  add_foreign_key "contents", "users"
  add_foreign_key "credit_cards", "users"
  add_foreign_key "notifications", "users"
  add_foreign_key "report_contents", "contents"
  add_foreign_key "report_contents", "users"
  add_foreign_key "user_settings", "users"
end
