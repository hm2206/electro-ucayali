import { Producto } from 'src/domain/entities/producto';
import { NoneEmptyString } from 'src/domain/value-objects/none-empty-string';
import { IBaseServiceInterface } from 'src/shared/interfaces/base-service.interface';
import { IUnitOfWorkInterface } from 'src/shared/interfaces/unit-of-work';

export class ProductoCreateService implements IBaseServiceInterface {
  constructor(private unitOfWork: IUnitOfWorkInterface) {}

  async execute(request: ProductoCreateRequest) {
    const productoRepository = this.unitOfWork.productoRepository;
    const producto = new Producto();
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
    if (producto.getCodePatrimonial()) {
      const exists = await productoRepository.findOne({
        where: { codePatrimonial: producto.getCodePatrimonial() },
      });
      if (exists) {
        throw new Error('El codigo protimonial ya está en uso');
      }
    }
    return productoRepository.save(producto);
  }
}

export class ProductoCreateRequest {
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
