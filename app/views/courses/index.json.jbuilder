json.array!(@courses) do |course|
  json.extract! course, :id, :course_number, :name
  json.url course_url(course, format: :json)
end
