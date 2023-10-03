import { Component, Input } from '@angular/core';
import { CarouselService, Carousel } from 'src/app/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() page: string = '';
  carouselI: Carousel[] = [];

  constructor (
    private carouselService: CarouselService
  ) {}

  ngOnInit(): void {
    if(this.page === 'home') {
      this.getCategoryImg()
    } else if(this.page === 'details') {
      this.getProductImg()
    }
  }

  getCategoryImg() {
    this.carouselService.getCarouselCategory()
      .subscribe(data => {
        this.carouselI = data.category
        console.log(data)
      })
  }

  getProductImg() {
    this.carouselService.getCarouselProduct()
    .subscribe(data => {
      this.carouselI = data.product
    })
  }

  
}
