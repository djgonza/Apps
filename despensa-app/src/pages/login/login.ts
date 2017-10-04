import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

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

	constructor(public navCtrl: NavController,
		public user: User,
		public toastCtrl: ToastController,
		public translateService: TranslateService) {

		this.translateService.get('LOGIN_ERROR').subscribe((value) => {
			this.loginErrorString = value;
		})

		if(localStorage.getItem("token")){
			console.log(localStorage.getItem("token"));
		}

	}

	// Attempt to login in through our User service
	doLogin() {
		this.user.login(this.account)
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
		});
	}

	getUserByToken () {

		this.user.login(this.account)
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
		});

	}

}
