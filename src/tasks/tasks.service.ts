import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getFilteredTasks(filteredTaskDto: TaskFilterDto){
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

    generateRandom(){
        let r = Math.random();
    }

    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id===id );
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
            return false;
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
