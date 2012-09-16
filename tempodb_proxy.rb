require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'time'
require 'tempodb'

API_KEY = "cc0c654d01774b128c1e0495de51784b"
API_SECRET = "a280c43f6b27400998a4aba0b1eb4545"

get '/data' do
  content_type :json

  return [].to_json if (params[:start].nil? or Time.parse(params[:start]).nil?)
  return [].to_json if (params[:stop].nil? or Time.parse(params[:stop]).nil?)

  client = TempoDB::Client.new(API_KEY, API_SECRET)

  start = Time.parse params[:start]
  stop  = Time.parse params[:stop]
  keys  = ["temperature"]
  data = client.read(start, stop, keys: keys, interval: "1min", function: "mean")
  data = data.first.data.map{ |dp| {ts: dp.ts, value: dp.value} }
  data.to_json
end
