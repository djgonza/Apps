import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Producto } from '../../models/producto';
import { ProductosProvider } from '../../providers/productos/productos';

@IonicPage()
@Component({
	selector: 'page-productos',
	templateUrl: 'productos.html'
})
export class ProductosPage {

	private productosActuales:Producto[];

	constructor(public productosProvider:ProductosProvider, public navCtrl: NavController, public navParams: NavParams) {

		this.productosActuales = new Array();
		this.getAllProductos();

		console.log(this);

	}

	getAllProductos () {

		this.productosProvider
		.get()
		.subscribe((res:any) => {
			console.log(res);
			res.map(producto => {
				this.productosActuales.push(new Producto(producto.nombre, producto.fechaCaducidad));
			});
			console.log("Productos cargados!");
			console.log(this);
		}, (err:any) => {
			console.log(err);
		});

	}

}
