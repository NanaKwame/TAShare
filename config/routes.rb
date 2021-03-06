TAShare::Application.routes.draw do
  devise_for :users
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#homepage'
  resources :home do
    collection do
      get 'homepage'
      get 'help'
      get 'setting'
    end
  end

  resources :class_ta do
    collection do
      get 'resourcejs'
      get 'addlike'
      get 'addbookmark'
      get 'removelike'
      get 'removebookmark'
      get 'removeresource'
      post 'addprofilepic'
      get 'addenroll'
      post 'createClass'
    end
  end

  resources :resources
  resources :audios, :controller => "resources", :type => "Audio"
  resources :notes, :controller => "resources", :type => "Note"
  resources :problems, :controller => "resources", :type => "Problem"
  resources :videos, :controller => "resources", :type => "Video"
  resources :websites, :controller => "resources", :type => "Website"


  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
