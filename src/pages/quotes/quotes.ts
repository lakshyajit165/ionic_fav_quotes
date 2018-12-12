import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';

/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {


  quoteGroup: {category: string, quotes: Quote[], icon: string};
  constructor(private navParams: NavParams,
    private alertCtrl: AlertController,
    private quotesService: QuotesService){}

  //ionViewDidLoad(){
  //  this.quoteGroup = this.navParams.data;  
 // }
  ngOnInit(){
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote: Quote){
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are your sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, Go Ahead',
          handler: () => {
            this.quotesService.addQuoteToFavorites(selectedQuote);
          },
        },
        {
          text: 'No, I changes my mind!',
          role: 'cancel',
          handler: () =>{
            console.log('Cancel');
          }
        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavorites(quote: Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote){
    return this.quotesService.isQuoteFavorite(quote);
  }
}
