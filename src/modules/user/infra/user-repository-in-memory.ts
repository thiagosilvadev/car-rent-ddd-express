import fs from 'fs';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/entities/user.entity';


export class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];
  private filePath: string = 'users.json';

  constructor() {
    this.loadUsersFromFile();
  }

  private loadUsersFromFile() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf8');
      this.users = JSON.parse(fileData);
    } catch (error) {
      // Se ocorrer algum erro ao ler o arquivo (por exemplo, arquivo inexistente), não faz nada
    }
  }

  private saveUsersToFile() {
    const fileData = JSON.stringify(this.users);
    fs.writeFileSync(this.filePath, fileData, 'utf8');
  }

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email.value === email);
    return Promise.resolve(user);
  }

  save(entity: User): Promise<void> {
    this.users.push(entity);
    this.saveUsersToFile();
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
    this.saveUsersToFile();
    return Promise.resolve();
  }

  update(entity: User): Promise<void> {
    const index = this.users.findIndex(user => user.id === entity.id);
    if (index !== -1) {
      this.users[index] = entity;
      this.saveUsersToFile();
    }
    return Promise.resolve();
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return Promise.resolve(user || null);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  where(conditions: Partial<Record<keyof User, unknown>>): Promise<User[]> {
    const filteredUsers = this.users.filter(user => {
      for (const key in conditions) {
        if (user[key as keyof typeof conditions] !== conditions[key as keyof typeof conditions]) {
          return false;
        }
      }
      return true;
    });
    return Promise.resolve(filteredUsers);
  }
}
