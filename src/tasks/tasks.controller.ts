import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){

    }

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAllTasks();
    }

    @Post()
    //createTask(@Body() body){
    createTask(@Body('title') title: string,@Body('description') description : string): Task{
        console.log("this is body", title);
        console.log("this is description", description);

        return this.tasksService.createTask(title, description);
    }
}
