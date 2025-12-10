export interface InvoiceData {
  customerId?: string;
  latest_invoice: {
    customer_email: string;
    created?: number;
    due_date: number;
    number: string;
    amount_due: number;
  };
  billing_reason?: string;
  currency?: string;
  collection_method?: string;
  status?: string;
  dueDate?: number;
  due_date: number;
  created: number;
  amount_due: number;
  customer_email: string;
  number: string;
  total?: number;
}
export interface AccountSettings {
  defaultTaxRates: [];
  generalSettings?: { defaultCurrency?: string; defaultTerms?: string } | null;
  paymentSettings?: { card: boolean; bank: boolean } | null;
  invoiceCustomization?: {
    defaultCustomerMessage?: string;
    defaultSubject?: string;
  };
}
