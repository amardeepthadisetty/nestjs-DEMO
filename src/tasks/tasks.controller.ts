import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){

    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }


    @UsePipes(ValidationPipe)
    @Post()
    //createTask(@Body() body){
    //createTask(@Body('title') title: string,@Body('description') description : string): Task{
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        //console.log("this is body", title);
        // console.log("this is description", description);

        //return this.tasksService.createTask(title, description);
        return this.tasksService.createTask(createTaskDto);
    }

   
   /*  @Get()
    //getAllTasks(): Task[]{
    @UsePipes(ValidationPipe)
    getTasks(@Query() taskFilter: TaskFilterDto ): Task[]{
        if( Object.keys(taskFilter).length ){
            //console.log("INSIDE OBJECT KEYS AND THE FILTERED OPTIONS GIVEN ARE: ", taskFilter);
            return this.tasksService.getFilteredTasks( taskFilter );
        }else{
            //console.log("INSIDE ELSE PART ", taskFilter);
            return this.tasksService.getAllTasks();
        }
    }

    

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): boolean {
        return this.tasksService.deleteTaskById(id);
    }


    

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,@Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.tasksService.updateTaskStatusById(id, status);
    } */
}
