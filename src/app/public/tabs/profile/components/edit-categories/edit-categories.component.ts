import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Tipo, Response } from 'src/app/core/models/models';
import {
  ProveedorTiposService,
  TiposService,
} from 'src/app/core/services/api/services';
import { PostService } from 'src/app/core/services/post.service';
import { PutService } from 'src/app/core/services/put.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss'],
})
export class EditCategoriesComponent implements OnInit {
  @Input('provider') provider;
  @Input('providerTypes') providerTypes;
  @Input('tipos') tipos;
  categories;

  category: Tipo;

  deleteId: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  categoriesToAdd: any[] = [];
  categoriesAdded: any[] = [];

  categoryToDeleteSelected = {
    id: null,
    tipoId: null,
    creatorUserId: null,
    proveedorId: null,
    typeName: null,
  };

  categorySelected = {
    id: null,
    tipoId: null,
    creatorUserId: null,
    proveedorId: null,
    typeName: null,
  };

  constructor(
    private typeService: TiposService,
    private postService: PostService,
    private providerTypeService: ProveedorTiposService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.providerTypes.forEach((tipo) => {
      this.tipos.forEach((providerType) => {
        console.log('SERVICE:', tipo, 'PROVIDER SERVICE', providerType);
        if (tipo.tipoId === providerType.id) {
          this.categoriesAdded.push(providerType);
        }
      });
    });

    if (this.categoriesAdded.length > 0) {
      console.log('ALREADY ADDED', this.categoriesAdded);
      this.tipos.forEach((tipo) => {
        if (!this.categoriesAdded.includes(tipo)) {
          this.categoriesToAdd.push(tipo);
        }
      });
    }
  }

  setCategoriesToDelete(event) {
    this.categoryToDeleteSelected.tipoId = event.detail.value;
    console.log('TIPO ID:', event.detail.value);
    this.providerTypes.forEach((element) => {
      if (element.tipoId === event.detail.value) {
        this.categoryToDeleteSelected.id = element.id;
      }
    });
  }

  setCategoriesToAdd(event) {
    this.categorySelected.tipoId = event.detail.value;
  }

  update() {
    if (this.categorySelected.tipoId) {
      this.postService
        .createProviderType({
          proveedorId: this.provider.Id,
          tipoId: this.categorySelected.tipoId,
          creatorUserId: this.provider.Id,
        })
        .subscribe(
          (response: Response) => {},
          (error) => {
            console.log(error);
          }
        );
    }
    if (this.categoryToDeleteSelected.tipoId) {
      console.log('ID TO DELETE', this.categoryToDeleteSelected.id);
      this.providerTypeService
        .deleteApiProveedorTiposProveedorTipoId(
          this.categoryToDeleteSelected.id
        )
        .subscribe(
          (response: Response) => {},
          (error) => {
            console.log(error);
          }
        );
    }
    this.close();
  }

  close() {
    this.modalController.dismiss();
  }
}
