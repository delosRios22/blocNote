import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList ) lista: IonList;
  @Input() terminadas = true;
  constructor(public deseoService: DeseosService, 
              private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){
    if(this.terminadas){
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id }`);
    } else {
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id }`);
    }
    
  }

  borrarLista( lista: Lista){
    this.deseoService.borrarLista(lista);
  }

  async editarListar(lista: Lista){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado')
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data)
            if(data.titulo.length === 0){
              return;
            }
            lista.titulo = data.titulo;
            this.deseoService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });
    
    alert.present();
  }

}
