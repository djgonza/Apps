import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, IonicPage, NavController, ToastController } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';

import { User } from '../../providers/providers';
//import { MainPage } from '../pages';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	// The account fields for the login form.
	// If you're using the username field with or without email, make
	// sure to add it to the type
	account: { email: string, password: string } = {
		email: 'd@gmail.com',
		password: '123'
	};

	// Our translated text strings
	private loginErrorString: string;
	private googleKey: string;
	private userData:any;

	constructor(
		public platform: Platform,
		public navCtrl: NavController,
		public user: User,
		public toastCtrl: ToastController,
		public translateService: TranslateService,
		private googlePlus: GooglePlus) {

		this.googleKey = '';//'915920998189-ko5u3bocqak8btebdhe1m98g3fgbj313.apps.googleusercontent.com';

		this.userData = {
			email: '',
			userId: ''
		}


		// Mensaje de error login dependiendo del idioma
		this.translateService.get('LOGIN_ERROR').subscribe((value) => {
			this.loginErrorString = value;
		})

		if(localStorage.getItem("token")){
			console.log(localStorage.getItem("token"));
		}

		this.platform.ready().then((readySource) => {

			console.log('Platform ready from', readySource);
			
			this.doLoginByGoogle();

		});

	}

	doDisconnectByGoogle () {
		this.googlePlus.disconnect()
		.then (res => {
			console.log("res", res);
		})
		.catch(err => {
			console.log("err", err);
		});
	}

	doLogoutByGoogle () {
		this.googlePlus.logout()
		.then (res => {
			console.log("res", res);
		})
		.catch(err => {
			console.log("err", err);
		});
	}

	doLoginByGoogle () {
		console.log("doLoginByGoogle");
		this.googlePlus.login({
			'webClientId': this.googleKey
		})
		.then(res => {
			console.log("res")
			console.log(JSON.stringify(res))
			this.userData = res;
		})
		.catch(err => {
			console.log("err");
			console.log(err);
		});
	}

	// Attempt to login in through our User service
	doLogin() {
		console.log("do Login");
		/*this.user.login(this.account)
		.map(res => res.json())
		.subscribe((resp) => {
			console.log(resp);
			//this.navCtrl.push(MainPage);
			localStorage.setItem("token", resp.token);
		}, (err) => {
			// Unable to log in
			let toast = this.toastCtrl.create({
				message: this.loginErrorString,
				duration: 5000,
				position: 'top'
			});
			toast.present();
		});*/

	}

	getUserByToken () {

		/*this.user.login(this.account)
		.map(res => res.json())
		.subscribe((resp) => {
			console.log(resp);
			//this.navCtrl.push(MainPage);
			localStorage.setItem("token", resp.token);
		}, (err) => {
			// Unable to log in
			let toast = this.toastCtrl.create({
				message: this.loginErrorString,
				duration: 5000,
				position: 'top'
			});
			toast.present();
		});*/

	}

}
