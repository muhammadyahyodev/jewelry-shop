import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './schemas/user-address.model';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAddress)
    private readonly userAddressRepository: typeof UserAddress,
  ) {}

  async createUserAddress(
    createUserAddressDto: CreateUserAddressDto,
  ): Promise<UserAddress> {
    const address = await this.userAddressRepository.create(
      createUserAddressDto,
    );
    return address;
  }

  async findAllUserAddresses(): Promise<UserAddress[]> {
    const addresses = await this.userAddressRepository.findAll({
      include: { all: true },
    });
    return addresses;
  }

  async findUserAddressById(id: number): Promise<UserAddress> {
    const address = await this.userAddressRepository.findByPk(id, {
      include: { all: true },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async updateUserAddressById(
    id: number,
    updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<UserAddress> {
    await this.findUserAddressById(id);

    const address = await this.userAddressRepository.update(
      updateUserAddressDto,
      { where: { id }, returning: true },
    );

    return address[1][0];
  }

  async deleteUserAddresById(id: number): Promise<string> {
    await this.findUserAddressById(id);
    await this.userAddressRepository.destroy({ where: { id } });

    return `Address with id:${id} deleted`;
  }
}
