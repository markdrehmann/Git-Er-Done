class ListsController < ApplicationController
  def index
    lists = List.all
    render json: lists.to_json(:include => {
    :tasks => {:only => [:description, :completed]},
  }, :except => [:created_at, :updated_at])
  end

  def create
    list = List.create(title: params[:title])
    render json: list, except: [:created_at, :updated_at]
  end

  def destroy
    list = List.find_by(id: params[:id])
    list.delete
    render json: list
  end
end
