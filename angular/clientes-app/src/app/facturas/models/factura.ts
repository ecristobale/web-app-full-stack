import { ItemFactura } from './item-factura';
import { Cliente } from 'src/app/clientes/cliente';

export class Factura {

    id: number;
    descripcion: string;
    observacion: string;
    itemsFactura: Array<ItemFactura> = [];
    cliente: Cliente;
    total: number;
    createdAt: string;
}
