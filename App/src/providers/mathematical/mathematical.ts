import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MathematicalProvider {
   Fac: any;
   period: any;
  constructor(public http: HttpClient) {
    console.log('Hello MathematicalProvider Provider');
  }
  // Método de cálculo Valor presente liquido. É a soma algebrica
  // de todos os fluxos de todos os fluxos de caixa descontados para o instante T=0;
  npv(f, l) {
    for (let n = 1; n < this.period; n++)
    this.Fac += (f)/(1+l)^n;
  }
  
}
