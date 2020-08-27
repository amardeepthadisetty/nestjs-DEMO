import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, NotFoundException } from '@nestjs/common';
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


    @Get()
    @UsePipes(ValidationPipe)
    async getTasks(@Query() taskFilter: TaskFilterDto ): Promise<Task[]>{
            return await this.tasksService.getAllTasks(taskFilter);
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

    @Patch('/:id/status')
    async updateTaskStatus(@Param('id', ParseIntPipe) id: number,@Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return await this.tasksService.updateTaskStatusById(id, status);
    }

    @Delete('/:id')
    async deleteTaskById(@Param('id', ParseIntPipe) id: number) {
        const result = await this.tasksService.deleteTaskById(id);
        if( result.affected>0){
            return ({'message': `Task with id ${id} is deleted successfully.`});
        }else{
            
            throw new NotFoundException(`Task with id ${id} not found.`);
        }
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

     */
}
