export interface IRecieptDetails {
  pin: string;
  nameOfSupplier: string;
  invoiceDate: string;
  invoiceNumber: string;
  descOfGoods: string;
  vatValue: string;
  taxableValue: string;
  totalAmount: string;
}

// USER
export interface IUser {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  phone: string;
  createdAt: string | undefined;
}
