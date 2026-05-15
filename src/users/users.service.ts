import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(name: string, email: string, password: string): Promise<User> {
  const exists = await this.userRepository.findOne({ where: { email } });
  if (exists) {
    throw new ConflictException('El correo ya está registrado');
  }

  const role = await this.roleRepository.findOne({
    where: { name: 'invitado' },
  });

  if (!role) {
    throw new Error('Rol invitado no encontrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = this.userRepository.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return this.userRepository.save(user) as Promise<User>;
}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: { id: true, name: true },
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }
}