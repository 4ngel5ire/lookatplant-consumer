export class CreateUserDto {
  userId: string;
  email: string;

  constructor(params: { userId: string; email: string }) {
    Object.assign(this, params);
  }
}
