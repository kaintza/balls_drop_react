require 'rails_helper'

RSpec.describe 'Balls API', type: :request do
  # Test suite for POST /ball
  describe 'POST /ball' do
    let(:pink_input) { { count: 1 } }
    context 'when count = 1' do
      before { post '/ball', params: pink_input}

      it 'creates a pink ball' do
        expect(response.body).to eq({color: 'pink'}.to_json)
      end
    end

    let(:purple_input) { { count: 30 } }
    context 'when count = 30' do
      before { post '/ball', params: purple_input}

      it 'creates a purple ball' do
        expect(response.body).to eq({color: 'purple'}.to_json)
      end
    end

    let(:blue_input) { { count: 10 } }
    context 'when count = 10' do
      before { post '/ball', params: blue_input}

      it 'creates a blue ball' do
        expect(response.body).to eq({color: 'blue'}.to_json)
      end
    end

    let(:green_input) { { count: 27 } }
    context 'when count = 27' do
      before { post '/ball', params: green_input}

      it 'creates a green ball' do
        expect(response.body).to eq({color: 'green'}.to_json)
      end
    end
  end
end