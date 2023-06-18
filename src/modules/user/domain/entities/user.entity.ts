import { sign } from "jsonwebtoken";
import { Entity } from "../../../../domain/entity";
import { Email } from "./email.vo";
import { FullName } from "./fullname.vo";
import { Password } from "./password.vo";

export interface UserProps {
  email: Email;
  password: Password;
  fullName: FullName;
  createdAt: Date;
  updatedAt?: Date;
}

type CreateUserProps = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
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
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt,
      },
      id
    );
  }

  public static restore(props: UserProps, id: string): User {
    return new User(props, id);
  }

  public generateToken(): string {
    const token = sign({ id: this.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    return token;
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

  public get password(): Password {
    return this.props.password;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
