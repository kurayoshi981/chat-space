Rails.application.routes.draw do


  get 'messages' => 'messages#index'

  get 'messages/new'

  get 'messages/create'

end
