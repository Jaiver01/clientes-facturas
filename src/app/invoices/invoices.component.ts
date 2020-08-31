import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.sass']
})
export class InvoicesComponent implements OnInit {

  client = 'all';
  clients: any = [];
  clientName = '';
  invoice: any = {code: '', total: 0, withholdingTax: 0, client: ''};
  invoices: any = [];

  constructor(private ivs: InvoicesService) { }

  ngOnInit(): void {
    this.ivs.getClients().subscribe(clients => this.clients = clients);
  }

  checkClient() {
    let client = this.client;
    if (this.client === 'all') client = '';

    this.ivs.checkInvoices(client).subscribe(invoices => this.invoices = invoices);
  }

  setInvoice() {
    this.invoice.client = this.client;

    let invalid = false;
    Object.values(this.invoice).forEach(element => {
      if (element === '') invalid = true;
    });

    if (!this.invoice.total) invalid = true;

    if (invalid) {
      alert('Debe llenar todos los campos');
      return;
    }

    this.ivs.setInvoice(this.invoice).subscribe((res: any) => {
      if (res.done) {
        this.invoice = {code: '', total: 0, withholdingTax: 0, client: ''};
        document.getElementById('close-modal').click();
      }
    });
  }

  formatDate (date) {
    date = new Date(date).toISOString();
    return date.slice(0, 10) + ' ' + date.slice(11, 16);
  }

  getClientInfo (client, field) {
    return this.clients.find((c) => {return c._id.$oid === client})[field];
  }
}
