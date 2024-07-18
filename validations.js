import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min:5}),
    body('fullName', 'Укажите имя минимум из 3 букв').isLength({min:3}),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min:5}),
]

export const applicationValidation = [
    body('surname', 'Введите фамилию').isLength({min:3}).isString(),
    body('name', 'Введите имя').isLength({min:3}).isString(),
    body('patronymic', 'Введите отчество').isLength({min:5}).isString(),
    body('organization', 'Введите организацию').isLength({min:3}).isString(),
    body('phoneNumber', 'Введите номер телефона').isLength({min:5}).isString(),
    // body('picture', 'Неверная ссылка на изображение').optional(),
]