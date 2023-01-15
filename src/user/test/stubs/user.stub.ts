import { User } from '../../schemas/user.model';

export const userStub = (): Partial<User> => {
  return {
    id: 1,
    first_name: 'Sardor',
    last_name: 'Salimov',
    email: 'sardorsalimov@gmail.com',
    password: 'qwerty',
    is_active: false,
    is_bann: false,
    refresh_token: 'thisrefreshtoken',
    activation_link: 'thisactivatelink',
  };
};
