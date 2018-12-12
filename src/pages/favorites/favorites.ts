import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { QuotesService } from '../../services/quotes';
import { QuotePage } from '../quote/quote';



@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  quotes: Quote[];

  constructor(private quoteService: QuotesService,
    private modalCtrl: ModalController){} 

  ionViewWillEnter(){
    this.quotes = this.quoteService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote){
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove){
        this.onRemoveFromFavorites(quote);
      }
      
    });
   
  }

  onRemoveFromFavorites(quote: Quote){
    this.quoteService.removeQuoteFromFavorites(quote);
        const position = this.quotes.findIndex((quoteEl: Quote) => {
          return quoteEl.id == quote.id;
        });
        this.quotes.splice(position, 1);  
  }
  
}
