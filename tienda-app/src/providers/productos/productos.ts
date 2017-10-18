import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Producto } from '../../models/producto';
import { Api } from '../api/api';

@Injectable()
export class ProductosProvider {

	constructor(public http: Http, public api: Api) {

		this.add(new Producto("Producto 1", new Date()));
		this.add(new Producto("Producto 2", new Date()));
		this.add(new Producto("Producto 3", new Date()));
		this.add(new Producto("Producto 4", new Date()));
		this.add(new Producto("Producto 5", new Date()));

	}

	get(params?: any) {
		return this.api.get('productos', params)
		.map(resp => resp.json());
	}

	add(producto: Producto) {
		
	}

	delete(producto: Producto) {
		
	}

}
