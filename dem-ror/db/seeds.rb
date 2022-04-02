# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

SubscriptionPlan.create(price: 0, name: "Free Subscription", is_active: true, duration: 30, space_allowed: 10240000, description: "Free plan", allow_to_buy: true, allow_to_publish: false)

SubscriptionPlan.create(price: 20, name: "Business Subscription", is_active: true, duration: 30, space_allowed: 50240000, description: "Business plan", allow_to_buy: true, allow_to_publish: true)