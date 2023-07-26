import { NotaEditParams, NotaFindService } from "src/application/notas/nota-find.service";
import { NotaItemsService } from "src/application/notas/nota-items.service";
import { IUnitOfWorkInterface } from "src/shared/interfaces/unit-of-work";
import { Edge } from "edge.js";
import { resolve } from "path";
import { readFileSync } from "fs";

export class NotaInformeReport {
  constructor(private unitOfWork: IUnitOfWorkInterface) { }

  async execute(params: NotaEditParams) {
    const edge = new Edge({ cache: false });
    edge.mount(resolve(__dirname, '../../../src/infrastructure/reports/resources/template'));
    const urlImage = readFileSync(resolve(__dirname, '../../../src/infrastructure/reports/resources/images/logo.png'), 'base64');
    const notaFind = new NotaFindService(this.unitOfWork);
    const nota = await notaFind.execute(params);
    const notaItems = new NotaItemsService(this.unitOfWork);
    const items = await notaItems.execute(params);

    const html = await edge.render('nota-informe', {
      urlImage,
      nota,
      items
    });

    // return { nota }
    return html;
  }
}