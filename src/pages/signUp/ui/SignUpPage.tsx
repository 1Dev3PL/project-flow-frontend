import { Input } from "shared/ui/input";
import style from "./SignUpPage.module.scss";
import { Link } from "react-router";
import { Button } from "shared/ui/button";
import logo from "shared/assets/images/logo.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUp } from "pages/signUp/hooks/useSignUp.ts";
import { SignUpData } from "pages/signUp/api/types.ts";

type TForm = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TForm>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const password = watch("password");
  const signUp = useSignUp();

  const handleRegister: SubmitHandler<TForm> = (formData, event) => {
    event?.preventDefault();

    const signUpData: SignUpData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    signUp(signUpData);
  };

  return (
    <div className={style.signup_page}>
      <div className={style.signup_modal}>
        <div className={style.left_container}>
          <div className={style.welcome_text}>Добро пожаловать в</div>
          <div className={style.logo_container}>
            <img src={logo} alt={""} className={style.logo} />
          </div>
        </div>
        <div className={style.right_container}>
          <div className={style.title}>Регистрация</div>
          <div className={style.have_account}>
            <span>Уже есть аккаунт?</span>
            <Link to={"/login"} className={style.link}>
              Войти
            </Link>
          </div>
          <form
            className={style.form}
            onSubmit={handleSubmit(handleRegister)}
            noValidate
          >
            <Input
              placeholder={"Ильин Иван"}
              label={"Имя"}
              {...register("name", { required: "Введите имя" })}
              error={errors.name?.message}
            />
            <Input
              type={"email"}
              placeholder={"email@example.com"}
              label={"Email"}
              {...register("email", {
                required: "Введите email",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Please enter a valid email",
                },
              })}
              error={errors.email?.message}
            />
            <div className={style.password_section}>
              <Input
                type={"password"}
                label={"Пароль"}
                {...register("password", {
                  required: "Введите пароль",
                  minLength: {
                    value: 8,
                    message: "Пароль должен быть не менее 8 символов",
                  },
                })}
                error={errors.password?.message}
              />
              <Input
                type={"password"}
                label={"Повторите пароль"}
                {...register("passwordRepeat", {
                  required: "Повторите пароль",
                  minLength: {
                    value: 8,
                    message: "Пароль должен быть не менее 8 символов",
                  },
                  validate: (passwordRepeat: string) => {
                    return passwordRepeat == password || "Пароли не совпадают";
                  },
                })}
                error={errors.passwordRepeat?.message}
              />
            </div>
            <div className={style.button_container}>
              <Button type={"submit"} variant={"outlined"}>
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
