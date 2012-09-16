require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'tempodb'

API_KEY = "cc0c654d01774b128c1e0495de51784b"
API_SECRET = "a280c43f6b27400998a4aba0b1eb4545"

get '/data' do
  content_type :json

  client = TempoDB::Client.new(API_KEY, API_SECRET)

  start = Time.utc(2012, 9, 15)
  stop  = Time.utc(2012, 9, 16)
  keys  = ["temperature"]
  data = client.read(start, stop, keys: keys, interval: "1min", function: "mean")
  data = data.first.data.map{ |dp| {ts: dp.ts, value: dp.value} }
  data.to_json
end
