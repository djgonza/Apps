import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private img: String;

	constructor(private camera: Camera, private barcodeScanner: BarcodeScanner, public navCtrl: NavController) {

	}

	scann () {

		this.barcodeScanner.scan().then((barcodeData) => {
			// Success! Barcode data is here
			alert("Format: " + barcodeData.format);
			alert("Cancelled: " + barcodeData.cancelled);
			alert("Text: " +barcodeData.text);
		}, (err) => {
			// An error occurred
			alert("Error: "+ err);
		});

	}

	takePhoto () {

		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.img = base64Image;
			alert(base64Image);
		}, (err) => {
			// Handle error
			alert("Error: "+ err);
		});
	}

}
