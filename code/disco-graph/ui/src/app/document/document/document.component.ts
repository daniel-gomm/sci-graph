import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Publication } from 'src/app/model/publication';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DocumentService } from 'src/app/services/document.service';
import { KeywordService } from 'src/app/services/keyword.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  document$!: Observable<Publication>

  constructor (
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.document$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.documentService.getDocument(params.get('id')!)
      )
    );
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

}
