import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentService, UserService } from 'src/app/core';
import { Comment, Product } from 'src/app/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() value: Product = {} as Product;

  comments: Comment[] = [];
  commentForm: FormGroup;
  isLoged: Boolean = false;

  constructor(
    private CommentService: CommentService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private ToastrService: ToastrService,
    private fb: FormBuilder,
    private userService: UserService
  ) { 
    this.commentForm = this.fb.group({
      'comment': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getComments()
  }

  getComments() {
    const slug: any = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.CommentService.getAll(slug).subscribe(
      data => {
        this.comments = data.comments;
    });
  }

  submitForm() {
    console.log(this.commentForm.value)
    this.userService.isAuthenticated.subscribe({
      next: data => this.isLoged = data,
      error: error => console.error(error)
    });
    if(this.isLoged) { 
      this.createComment(this.commentForm.value);
    } else {
      this.ToastrService.error('You must be loged. You will be redirect to the login page');
      setTimeout(() => { this.router.navigate(['/login']); }, 600);
    }

  }

  createComment(data_form: any): void {
    const slug: any = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.CommentService.create(slug, data_form).subscribe(
      data => {
        this.comments.push(data.comment);
      }
    )

  }//createComment

}
