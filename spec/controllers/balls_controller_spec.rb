require 'rails_helper'

RSpec.describe 'Balls API', type: :request do
  # initialize test data

  # Test suite for POST /ball
  describe 'POST /ball' do
    # valid payload
    let(:valid_attributes) { { count: '1' } }

    context 'when the request is valid' do
      before { post '/ball', params: valid_attributes }

      it 'creates a ball' do
        expect(response.body).to eq({color: 'pink'}.to_json)
      end
    end
  end
end