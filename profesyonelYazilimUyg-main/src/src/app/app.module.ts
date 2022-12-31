import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './shared/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesModule } from './categories/categories.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CategoriesModule,
    AuthenticationModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
