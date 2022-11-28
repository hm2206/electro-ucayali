import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { of } from 'rxjs';
import { NotaCreateService } from 'src/application/notas/nota-create.service';
import { TypeormUnitOfWork } from 'src/infrastructure/database/unit-of-works/typeorm.unit-of-work';
import { NotaCreateDto } from '../dtos/nota-create.dto';

@ApiTags('Notas')
@Controller('notas')
export class NotasController {
  constructor(private unitOfWork: TypeormUnitOfWork) {}

  @Post()
  async store(@Body() request: NotaCreateDto) {
    const service = new NotaCreateService(this.unitOfWork);
    const result = await this.unitOfWork.complete(
      async () => await service.execute(request),
    );
    return of(result);
  }
}
