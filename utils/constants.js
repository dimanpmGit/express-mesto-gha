const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const MESSAGE_400 = 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля';
const MESSAGE_404 = 'Карточка или пользователь не найден или был запрошен несуществующий роут';
const MESSAGE_500 = 'На сервере произошла ошибка';

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  MESSAGE_400,
  MESSAGE_404,
  MESSAGE_500,
};
