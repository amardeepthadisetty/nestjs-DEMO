import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from 'src/interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService){

    }
    @Get('all')
    //async findAll(): Promise<Cat[]> {
     findAll(): any {
        return { 'cats': this.catsService.findAll() }
    }
}
