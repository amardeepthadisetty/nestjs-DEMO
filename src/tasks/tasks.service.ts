import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    generateRandom(){
        let r = Math.random();
    }

    createTask(title: string, description: string): Task {
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
