require 'sinatra'

get '/main.html' do
  File.read('main.html')
end

get '/main.css' do
  send_file File.open('main.css')
end

get '/d3.v3.js' do
  send_file File.open('d3.v3.js')
end

get '/main.js' do
  send_file File.open('main.js')
end