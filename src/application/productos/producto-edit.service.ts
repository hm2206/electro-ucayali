import { Producto } from 'src/domain/entities/producto';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoEditService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: ProductoEditRequest) {
    const productoRepository = this.unitOfWork.productoRepository;
    const producto = new Producto();
    producto.setId(request.id);
    producto.setCode(new NoneEmptyString(request.code));
    producto.setCodePatrimonial(request.codePatrimonial);
    producto.setSerie(request.serie);
    producto.setPotencia(request.potencia);
    producto.setYear(request.year);
    producto.setName(new NoneEmptyString(request.name));
    producto.setDescription(request.description);
    producto.setStock(request.stock);
    producto.setMedidaId(request.medidaId);
    producto.setMarcaId(request.marcaId);
    await this.unitOfWork.start();
    return productoRepository.save(producto);
  }
}

export class ProductoEditRequest {
  id: IdentifyUUID;
  code: string;
  codePatrimonial?: string;
  serie?: string;
  potencia?: string;
  year?: number;
  name: string;
  description?: string;
  stock: number;
  medidaId: string;
  marcaId: string;
}
