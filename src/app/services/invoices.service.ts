import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InvoicesService {

    URL = 'https://clientes-facturas-api.herokuapp.com';

    constructor(private http: HttpClient) { }

    getClients() {
        return this.http.get(this.URL + '/clients');
    }

    setClient(client) {
        return this.http.post(this.URL + '/client', client);
    }

    setInvoice(invoice) {
        return this.http.post(this.URL + '/invoice', invoice);
    }

    checkInvoices(invoice) {
        if (invoice) return this.http.get(this.URL + '/invoices/' + invoice);
        else return this.http.get(this.URL + '/invoices');
    }
}
