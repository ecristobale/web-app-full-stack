import { Producto } from './producto';

export class ItemFactura {

    producto: Producto;
    cantidad = 1;
    calcularImporte: number;

//    public importCalculation(): number {
//        return this.cantidad * this.calcularImporte;
//    }
}
