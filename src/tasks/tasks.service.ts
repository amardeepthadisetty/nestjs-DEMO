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
    
    async getAllTasks(taskFilterDto : TaskFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(taskFilterDto);
    }

    async getTaskById(id : number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
                throw new NotFoundException(`Task with id ${id} not found`);
        }

        return found;

    }

    

    async updateTaskStatusById(id: number, status: TaskStatus): Promise<Task>{
        const task =  await this.getTaskById(id);

        task.status = status;
        await task.save();

        return task;
    }

    async deleteTaskById(id: number): Promise<any> {
        const deleted = await this.taskRepository.delete(id);

        //console.log("deleted value is: ", deleted);
        return deleted;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
    
}
