import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProductosProvider } from '../../providers/providers';

import { ProductosPage } from './productos';
import { DetalleProducto } from './detalleProducto';

@NgModule({
	declarations: [
		ProductosPage,
		DetalleProducto
	],
	imports: [
		IonicPageModule.forChild(ProductosPage),
		TranslateModule.forChild()
	],
	exports: [
		ProductosPage
	],
	providers: [
		ProductosProvider
	]
})
export class ProductosModule { }
