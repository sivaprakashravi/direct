import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { Type } from '@angular/core';
import { TwoWayPlotDirective } from './two-way-plot.directive';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        TwoWayPlotDirective
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('test your http call', () => {
    const dummyUsers = [
      { name: 'John' },
    ];

    const req = httpMock.expectOne(`assets/data/data.csv`);
    req.flush(dummyUsers);
    expect(req.request.method).toBe('GET');
  });
});
