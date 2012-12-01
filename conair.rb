require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'time'
require 'tempodb'

API_KEY = "cc0c654d01774b128c1e0495de51784b"
API_SECRET = "a280c43f6b27400998a4aba0b1eb4545"


helpers do
    def link_to(url,text=url,opts={})
      attributes = ""
      opts.each { |key,value| attributes << key.to_s << "=\"" << value << "\" "}
      "<a href=\"#{url}\" #{attributes}>#{text}</a>"
    end
end

get '/' do
  haml :index
end

get '/history/?' do
  haml :history
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
  step_string = "#{step/60000}min"

  # Get the data from tempoDB
  data = client.read(start, stop, keys: keys, interval: step_string, function: "mean")
  
  # Map the first series to temperature data points
  response_data = data.first.data.map{ |dp| {ts: dp.ts, value: dp.value, temperature: dp.value } }

  response_data.to_json
end
