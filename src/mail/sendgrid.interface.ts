import mongoose from 'mongoose';
import Stripe from 'stripe';

export interface ISetPasswordEmail {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    company_name?: string;
    parent_user_name?: string;
  };
  NewUserLoginSaved: {
    token: string;
  };
  origin?: string;
}

export interface IVerficationMail {
  existingPaidAccountCheck: {
    first_name: string;
    last_name: string;
    email: string;
    loginId: string;
  };
  updatedPaidAccount: {
    token: string;
  };
  verifyLink?: string;
  email?: string;
  templateId: string;
  subject: string;
  origin?: string;
}

export interface IProfileUpdateEmail {
  email: string;
  first_name: string;
  last_name: string;
  updatedFields: string;
  isCompanyDetailsUpdate: boolean;
  origin: string;
}

export interface IDynamicTemplateData {
  email?: string;
  first_name: string;
  last_name: string;
  updatedFields: string;
  isCompanyDetailsUpdate: boolean;
  origin: string;
}

export interface IResetPasswordSuccessEmail {
  first_name: string;
  last_name: string;
  email: string;
}

export interface ISendReceiptEmail {
  companyId?: string;
  data: {
    currency: string;
    isTransactionRefunded: boolean;
  };
  email?: string;
  isCheckout?: boolean;
  isSubscription?: boolean;
  templateId?: string;
  isFromStoreCheckout?: boolean;
}

export interface IValue {
  title: string;
  display_name: string;
  percentCalculated: number;
  serviceName?: string;
}
interface ICompanyDetails {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  companyLogo?: string;
}
interface IData {
  name?: string;
  isFromBank?: boolean;
  card?: string;
  last4?: string;
  view_receipt?: string;
  productDetails?: string;
  taxes?: IValue[];
  paidAmount?: number;
  total?: number;
  totalExcludingTax?: number;
  subTotal?: number;
  serviceFees?: IValue[];
  orderDate?: string;
  isTransactionRefunded: boolean | undefined;
  currency: string;
  isDomainCharge?: boolean;
}

interface IStripeDetails {
  accountSettings?: {
    emailCustomization?: {
      receiptSubject?: string;
      receiptMessage?: string;
    };
  };
}
export interface IDynamicReceiptTemplateData {
  CompanyDetails: ICompanyDetails;
  isTransactionRefunded: boolean | undefined;
  data: IData;
  currencySign: string;
  stripeDetails: IStripeDetails;
  currency: string;
  isCheckout: boolean | undefined;
  email?: string;
  isSubscription?: boolean;
  isFromStoreCheckout?: boolean;
}

interface IAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
}
export interface ITaxes {
  name?: string;
  percentCalculated?: string;
}
export interface IServicefees {
  name?: string;
  percentCalculated?: string;
}
interface ICheckoutDetails {
  checkoutId?: string;
  totalServiceFees?: number;
  totalTaxes?: number;
  name?: string;
  address?: IAddress;
  phone?: string;
  donatedAmount?: number;
  quantity?: number;
  subTotal?: number;
  totalExcludingTax?: number;
  serviceFees?: IServicefees[];
  taxes?: ITaxes[];
  total?: string;
  productDetails?: {
    name: string;
  }[];
}

export interface IObj {
  name: string;
  percentCalculated: string;
  taxes?: ITaxes[];
  serviceFees?: IServicefees[];
}
export interface IPaymentDetails {
  paymentIntent?: Stripe.PaymentIntent | string;
  companyId?: string;
  interval?: string;
  isCheckout?: boolean;
  isSubscription?: boolean | string;
  templateId?: string;
  checkoutDetails?: ICheckoutDetails;
  productName?: string;
  quantity?: number;
  shipping?: {
    address: Stripe.AddressParam;
    name: string;
  };
  subscriptionId?: string;
  accountId?: string;
  customerId?: mongoose.Types.ObjectId;
  amount?: number;
  email?: string;
  metadata?: Stripe.MetadataParam;
  checkout?: {
    serviceFees: IServicefees[];
  };
  orderUpdateObj?: {
    storeId: string;
    token: string;
    orderId: string;
    transactionId: string;
  };
}

export interface IGetEmailData {
  paymentIntent: Stripe.PaymentIntent;
  checkoutDetails: ICheckoutDetails | undefined;
  quantity: number;
  productName: string | undefined;
}

export interface IMsg {
  name?: string;
  customerName?: string;
  email?: string;
  quantity?: string;
  address?: string;
  phone?: string;
  mainTitle?: string;
  subject?: string;
  productPrice?: string;
  productName?: string;
  currency?: string;
  title1?: string;
  title2?: string;
  title3?: string;
  paidDate?: string;
  card?: string;
  last4: string;
  customMessage?: string;
  subTotal?: string;
  total?: string;
  paidAmount?: string;
  productDetails?: {
    name: string;
  }[];
  totalExcludingTax?: string;
  taxes?: ITaxes[];
  serviceFees?: IServicefees[];
}

export interface ISendFeedbackEmailToMerchant {
  feedbackBy: string;
  pageName: string;
  feedback: string;
  category: string;
}

export interface ITransactionCustomer {
  name: string;
  email: string;
  id: string;
}

export interface ITransactionCardDetails {
  brand: string;
  last4: string;
  bank_name: string;
}

export interface ITransactionPaymentMethodDetails {
  type: string;
  card: ITransactionCardDetails;
  card_present: ITransactionCardDetails;
  bank_name?: string;
  isFromBank?: string;
}

export interface ITransactionCharge {
  customer: ITransactionCustomer;
  payment_method_details: ITransactionPaymentMethodDetails;
  created: number;
  receipt_url: string;
  refunded: string;
  amount_refunded: string;
  dispute: { id: string; status: string };
}

export interface ITransactionSource {
  currency?: string;
  amount?: number;
  receipt_url?: string;
  created?: number;
}

export interface IRefundTransactionDetail {
  charge: ITransactionCharge;
  source?: ITransactionSource;
  amount: number;
  currency: string;
  receipt_url: string;
  created: number;
  number: number;
}

export interface IRefundTransaction {
  transaction: IRefundTransactionDetail;
  companyId: string;
}

export interface IRefundTransactionReceiptData {
  email: string;
  name: string;
  isTransactionRefunded: boolean;
  paidAmount: number;
  currency: string;
  paidDate: number | undefined;
  card: string | undefined;
  last4: string | undefined;
  view_receipt: string;
  isFromBank: string | undefined;
}

export interface ISendInvoiceEmailToMerchant {
  companyId: string;
  invoice:
    | Stripe.Invoice
    | {
        currency: string;
        amount_paid?: number;
        amount_due: number;
        customer: {
          id: string;
        };
        customer_name?: string;
        number: number | string;
        created: number;
      };
  companyDetails?: {
    name: string;
  };
  token: string;
  invoicePaid: boolean;
  customer?: string;
  origin?: string;
}

export interface IHardwareOrderData {
  name: string;
  email: string;
  company: string;
  phone: string;
  address: {
    fullAddress: string;
  };
  shippingMethod: string;
  accountId: string;
  companyId: string;
  amount: number;
  shipping: number;
  currency: string;
  hardwareOrderItems: {
    amount: number;
    quantity: number;
    terminal_hardware_sku: {
      name: string;
    };
  }[];
}

export interface IHardwareProductObj {
  total: string;
  quantity: number;
  amount: string;
  name: string;
}

export interface IProfileDetails {
  email: string;
  first_name: string;
  last_name: string;
}
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
