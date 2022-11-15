import { ValidationError } from 'class-validator';

type paymentItem = {
  [key: string]: any;
};

export class PaymentRequiredException extends Error {
  errors: paymentItem = {};
  indexError: 0;
  status = 402;

  constructor(errors: ValidationError[]) {
    super('Payment Required');
    this.formatter(errors);
  }

  getStatus(): number {
    return 402;
  }

  formatter(errors: ValidationError[]) {
    errors.forEach((error) => {
      const children = error.children;
      if (!children.length) {
        return (this.errors[error.property] = Object.keys(error.constraints));
      }
      const errorChildrens = {};
      // agreagar children
      children.forEach((c) => {
        // validar sub-children
        const subChildren = c.children;
        if (!subChildren?.length) {
          errorChildrens[c.property] = Object.keys(c.constraints);
          return (this.errors[error.property] = errorChildrens);
        }
        // array sub-children
        subChildren.forEach((sub) => {
          errorChildrens[`${sub.property}[${c.property}]`] = Object.keys(
            sub.constraints,
          );
        });
      });
      // add errors
      return (this.errors[error.property] = errorChildrens);
    });
  }
}
