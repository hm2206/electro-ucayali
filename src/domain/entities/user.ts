import { BaseEntity } from 'src/shared/base.entity';
import { EmailString } from '../value-objects/email-string';
import { PasswordString } from '../value-objects/password-string';

export class User extends BaseEntity {
  private email: EmailString;
  private password: PasswordString;
  private codeRecovery: string;
  private isAdmin: boolean;
  private state: boolean;

  setEmail(email: EmailString) {
    this.email = email;
  }

  getEmail() {
    return this.email.toString();
  }

  setPassword(password: PasswordString) {
    this.password = password;
  }

  getPassword() {
    return this.password.toString();
  }

  setCodeRecovery(codeRecovery: string) {
    this.codeRecovery = codeRecovery;
  }

  getCodeRecovery() {
    return this.codeRecovery;
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  setState(state: boolean) {
    this.state = state;
  }

  enabled() {
    this.state = true;
  }

  disable() {
    this.state = false;
  }

  getState() {
    return this.state;
  }
}
