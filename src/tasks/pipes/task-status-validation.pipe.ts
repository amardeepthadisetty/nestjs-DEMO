import { PipeTransform, ArgumentMetadata } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata){

        console.log(" value is: ", value);
        console.log(" argument meta data is: ", metadata);

        return value;
    }
}