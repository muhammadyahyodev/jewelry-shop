import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from './schemas/payment_method.model';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod)
    private readonly paymentMethodRepository: typeof PaymentMethod,
  ) {}

  async createPaymentMethod(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const { name } = createPaymentMethodDto;

    await this.findPaymentMethodByName(name);

    const paymentMethod = await this.paymentMethodRepository.create(
      createPaymentMethodDto,
    );

    return paymentMethod;
  }

  async findAllPaymentMethods(): Promise<PaymentMethod[]> {
    const paymentMethod = await this.paymentMethodRepository.findAll({
      include: { all: true },
    });

    return paymentMethod;
  }

  async findPaymentMethodById(id: number): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findByPk(id, {
      include: { all: true },
    });

    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found with this id');
    }

    return paymentMethod;
  }

  async updatePaymentMethodById(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    await this.findPaymentMethodById(id);

    const paymentMethod = await this.paymentMethodRepository.update(
      updatePaymentMethodDto,
      { where: { id }, returning: true },
    );

    return paymentMethod[1][0];
  }

  async deletePaymentMethodById(id: number): Promise<Object> {
    await this.findPaymentMethodById(id);
    await this.paymentMethodRepository.destroy({ where: { id } });

    return `Payment method with id:${id} deleted`;
  }

  private async findPaymentMethodByName(name: string): Promise<void> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { name },
    });
    if (paymentMethod) {
      throw new ForbiddenException('Already exists');
    }
  }
}
