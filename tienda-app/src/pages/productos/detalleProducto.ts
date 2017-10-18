import { Component, Input } from '@angular/core';

import { Producto } from '../../models/producto'

@Component({
	selector: 'detalle-producto',
	templateUrl: 'detalle-producto.html'
})
export class DetalleProducto {

	@Input() producto:Producto;

	constructor() {

	}

}
