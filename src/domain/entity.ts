import { randomUUID } from "crypto";

export abstract class Entity<TProps> {
  protected readonly _id: string;
  constructor(protected props: TProps, id?: string) {
    this._id = id || randomUUID();
  }
  

  public equals(entity?: Entity<TProps>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (entity.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(entity.props);
  }

  public getProps(): TProps {
    return this.props;
  }
}

