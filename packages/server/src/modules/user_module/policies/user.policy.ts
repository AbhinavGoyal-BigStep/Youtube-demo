import { Request } from 'express';
import { inject, injectable } from 'inversify';
import { CreateDto, TYPES, UpdateDto } from '../types';
import { UserRepository } from '../repositories/user.repository';

@injectable()
export class UserPolicy {
  private userRepository: UserRepository;
  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  createDto(req: Request): CreateDto {
    const dto = {
      user: {
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        username: req.body.user.username,
        password: req.body.user.password,
      },
      profile: {
        bio: req.body.profile.bio,
      },
    };

    return dto;
  }

  updateDto(req: Request): UpdateDto {
    const dto = {
      user: {
        firstName: req.body.user?.firstName,
        lastName: req.body.user?.lastName,
        email: req.body.user?.email,
        username: req.body.user?.username,
        password: req.body.user?.password,
      },
      profile: {
        bio: req.body.profile?.bio,
      },
    };

    return dto;
  }
}