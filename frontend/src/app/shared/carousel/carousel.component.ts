import { Component, Input } from '@angular/core';
import { CarouselService, Carousel } from 'src/app/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() page: string = '';
  @Input() slug: string = '';
  home: Boolean = false;
  carouselI: any;

  constructor (
    private carouselService: CarouselService
  ) {}

  ngOnInit(): void {
    if(this.page === 'home') {
      this.home = true
      this.getCategoryImg()
    } else if(this.page === 'details') {
      this.home = false
      this.getProductImg()
    }
  }

  getCategoryImg() {
    this.carouselService.getCarouselCategory()
      .subscribe(data => {
        this.carouselI = data.category
      })
  }

  getProductImg() {
    this.carouselService.getCarouselProduct(this.slug)
    .subscribe(data => {
      this.carouselI = data.product.img
    })
  }

  
}
