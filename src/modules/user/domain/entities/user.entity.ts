import { Entity } from "../../../../domain/entity";
import { Email } from "./email.vo";
import { FullName } from "./fullname.vo";
import { Password } from "./password.vo";

export interface UserProps {
  email: Email;
  password: Password;
  fullName: FullName;
}

type CreateUserProps = {
  email: string;
  password: string;
  name: string;
  lastName: string;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }
  public static async create(
    props: CreateUserProps,
    id?: string
  ): Promise<User> {
    const fullName = FullName.create({
      name: props.name,
      lastName: props.lastName,
    });
    const password = await Password.create({
      value: props.password,
    });
    const email = Email.create({
      value: props.email,
    });
    return new User(
      {
        email,
        password,
        fullName,
      },
      id
    );
  }

  public get email(): Email {
    return this.props.email;
  }

  public get fullName(): FullName {
    return this.props.fullName;
  }

  public get id(): string {
    return this._id;
  }
}
