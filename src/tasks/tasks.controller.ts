import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){

    }

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAllTasks();
    }

    @Get('/:id') 
    getTaskById(@Param('id') id: string): Task{
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): boolean {
        return this.tasksService.deleteTaskById(id);
    }

    @Post()
    //createTask(@Body() body){
    //createTask(@Body('title') title: string,@Body('description') description : string): Task{
    createTask(@Body() createTaskDto : CreateTaskDto): Task{
        //console.log("this is body", title);
       // console.log("this is description", description);

        //return this.tasksService.createTask(title, description);
        return this.tasksService.createTask( createTaskDto );
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,@Body('status') status: TaskStatus): Task {
        return this.tasksService.updateTaskStatusById(id, status);
    }
}
