import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{

  product: Product = {} as Product;
  productForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private ToastrService: ToastrService
  ) {
    this.productForm = this.fb.group({
      product_name: '',
      product_price: 0
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        if(data['product']) {
          this.product = data['product'] as Product;
          this.productForm.patchValue(data['product']);
        }
      });
  }

  submitForm() {
    this.isSubmitting = true;
    this.updateProduct(this.productForm.value)

    this.productService.save(this.product).subscribe(
      data => {
        this.ToastrService.success("Update succesfully!");
        this.router.navigateByUrl('/profile/' + this.product.author.username)
      }
    );
  }

  updateProduct(values: Object) {
    Object.assign(this.product, values);
  }

}
