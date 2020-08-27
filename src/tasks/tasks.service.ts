import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';



@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
        ){

    }
    //private tasks: Task[] = [];

    // getFilteredTasks(filteredTaskDto: TaskFilterDto): Task[]{
    //     let tasks = this.getAllTasks();
    //     const {status, search} = filteredTaskDto; 

    //     if( status ){
    //         tasks = tasks.filter(task => task.status===status);
    //     }

    //     if( search ){
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) || task.description.includes(search) 
    //             );
    //     }

    //     return tasks;


    // }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    async getTaskById(id : number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
                throw new NotFoundException(`Task with ${id} not found`);
        }

        return found;

    }

    

    // updateTaskStatusById(id: string, status: TaskStatus): Task{
    //     this.tasks.map(task => {
    //         if(task.id===id){
    //             task.status = status;
    //         }
    //     });

    //     return this.getTaskById(id);
    // }

    // deleteTaskById(id: string): boolean {
    //     const index = this.tasks.findIndex(task => task.id === id);
    //     if(index===-1){
    //         throw new NotFoundException(`Task with ${id} not found.`);
    //     }

    //     this.tasks.splice( index, 1);

    //     return true;
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
    // createTask(createTaskDto : CreateTaskDto): Task {
    //     const {title, description} = createTaskDto;
    //     const task: Task = {
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //         id: uuid.v4()
    //     }

    //     this.tasks.push( task );
    //     return task;
    // }
}
