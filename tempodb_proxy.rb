require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'time'
require 'tempodb'

API_KEY = "cc0c654d01774b128c1e0495de51784b"
API_SECRET = "a280c43f6b27400998a4aba0b1eb4545"

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/data/?' do
  content_type :json

  return [].to_json if (params[:start].nil? or Time.parse(params[:start]).nil?)
  return [].to_json if (params[:stop].nil? or Time.parse(params[:stop]).nil?)
  return [].to_json if (params[:step].nil?)

  client = TempoDB::Client.new(API_KEY, API_SECRET)

  start = Time.parse params[:start]
  stop  = Time.parse params[:stop]
  keys  = ["temperature"]
  # Calculate the correct rollup
  step = params[:step].to_i
  # We'll just measure it in minutes
  step = "#{step/60000}min"
  logger.info step
  data = client.read(start, stop, keys: keys, interval: step, function: "mean")
  data = data.first.data.map{ |dp| {ts: dp.ts, value: dp.value} }
  data.to_json
end
