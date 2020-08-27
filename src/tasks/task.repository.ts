import { Repository, EntityRepository, getRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Console } from "console";
import { TaskFilterDto } from "./dto/task-filter.dto";



@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }


    async getTasks(filterDto: TaskFilterDto): Promise<Task[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if( status ){
            query.andWhere('task.status = :status', { status: status});
        }

        if( search ){
            query.andWhere('task.title LIKE  :search OR task.description LIKE :search', {search: `%${search}%`});
            //query.orWhere('description = :search');
        }
        return await query.getMany();
    }

    async getTasksFilteredWithStatus(status): Promise<Task[]>{
        const tasks = await getRepository(Task).createQueryBuilder("task")
        .where("task.status = :status ", { status:status })
        .getMany();
        //const tasks = await taskRepo.findOne();
        console.log("filtrd tasks", tasks);
        return tasks;
        /* await
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne(); */
    }

}