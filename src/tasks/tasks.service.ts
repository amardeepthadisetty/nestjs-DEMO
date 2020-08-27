import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getFilteredTasks(filteredTaskDto: TaskFilterDto): Task[]{
        let tasks = this.getAllTasks();
        const {status, search} = filteredTaskDto; 

        if( status ){
            tasks = tasks.filter(task => task.status===status);
        }

        if( search ){
            tasks = tasks.filter(task => 
                task.title.includes(search) || task.description.includes(search) 
                );
        }

        return tasks;


    }

    getAllTasks(): Task[] {
        return this.tasks;
    }

    

    getTaskById(id: string): Task{
        const found =  this.tasks.find(task => task.id===id );

        if( !found ){
            throw new NotFoundException(`Task with ${id} not found`);
        }

        return found;
    }

    updateTaskStatusById(id: string, status: TaskStatus): Task{
        this.tasks.map(task => {
            if(task.id===id){
                task.status = status;
            }
        });

        return this.getTaskById(id);
    }

    deleteTaskById(id: string): boolean {
        const index = this.tasks.findIndex(task => task.id === id);
        if(index===-1){
            throw new NotFoundException(`Task with ${id} not found.`);
        }

        this.tasks.splice( index, 1);

        return true;
    }

    createTask(createTaskDto : CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            title,
            description,
            status: TaskStatus.OPEN,
            id: uuid.v4()
        }

        this.tasks.push( task );
        return task;
    }
}
