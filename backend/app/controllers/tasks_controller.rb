class TasksController < ApplicationController
  def create
    task = Task.create(description: params[:description], list_id: params[:list_id])
    render json: task, except: [:created_at, :updated_at]
  end

  def destroy
    task = Task.find_by(id: params[:id])
    task.delete
    render json: task
  end

  def update
    task = Task.find_by(id: params[:id])
    task.completed = !task.completed
    task.save
    render json: task
  end
end
