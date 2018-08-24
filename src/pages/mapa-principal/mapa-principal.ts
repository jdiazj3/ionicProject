import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare const google;
/**
 * Generated class for the MapaPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa-principal',
  templateUrl: 'mapa-principal.html',
})
export class MapaPrincipalPage {
myLocation;
map;
marker;
markers=[];
  coordenadas=[{lat:4.603899,lng: -74.067230},
    {lat:4.609375,lng: -74.082079},
    {lat:4.613610,lng: -74.066372},
    {lat:4.581586,lng: -74.080585},
    {lat:4.556693,lng: -74.112414},
    {lat:4.521438,lng: -74.089390},
    {lat:4.550937,lng: -74.141717}]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addMarker(coord){
    let internalMarker= new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: coord
    });
    console.log(internalMarker);
    this.markers.push(internalMarker);
  }

  

  clearAllMarkers(){
    this.markers.forEach((marker)=>{
    marker.setMap(null);
    })
    this.markers=[];
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPrincipalPage');
    this.initMap();
  }

  
  
 initMap() {

    this.myLocation = { lat: 4.646412, lng: -74.077778 };
    console.log(this.myLocation)
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: this.myLocation,
      mapTypeId: 'satellite'
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.myLocation
    });
    this.marker.addListener('click', ()=>{
      if (this.marker.getAnimation() !== null) {
        this.marker.setAnimation(null);
      } else {
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
    
    let bounds = new google.maps.LatLngBounds();
    this.coordenadas.forEach((coord) => {
      this.addMarker(coord);
      bounds.extend(coord);
      this.map.fitBounds(bounds);

    })


    /*setTimeout(() => {
      this.clearAllMarkers();
    }, 10000);*/
  }

  
  

}
