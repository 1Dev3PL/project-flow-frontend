import logo from "shared/assets/images/logo.svg";
import { Link } from "react-router";
import { Input, Button } from "shared/ui";
import style from "./SignInPage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignIn } from "pages/login/hooks/useSignIn.ts";
import { SignInData } from "pages/login/api/types.ts";

type TForm = {
  email: string;
  password: string;
};

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const { signInMutation, isPending } = useSignIn();

  const handleLogin: SubmitHandler<TForm> = (formData, event) => {
    event?.preventDefault();

    const signInData: SignInData = {
      email: formData.email,
      password: formData.password,
    };

    signInMutation(signInData);
  };

  return (
    <div className={style.login_page}>
      <div className={style.login_modal}>
        <div className={style.left_container}>
          <div className={style.welcome_block}>
            <div className={style.welcome_text}>Добро пожаловать в</div>
            <div className={style.logo_container}>
              <img src={logo} alt={""} className={style.logo} />
            </div>
          </div>
        </div>
        <div className={style.right_container}>
          <div className={style.title}>Войти в аккаунт</div>
          <div className={style.no_account}>
            <span>Нет аккаунта?</span>
            <Link to={"/signup"} className={style.link}>
              Зарегистрируйтесь
            </Link>
          </div>
          <form
            className={style.form}
            onSubmit={handleSubmit(handleLogin)}
            noValidate
          >
            <Input
              className={style.email_field}
              type={"email"}
              label={"Email"}
              placeholder={"email@example.com"}
              register={register("email", {
                required: "Введите email",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]{2,4}$/,
                  message: "Введите валидную почту",
                },
              })}
              error={errors.email?.message}
            />
            <Input
              type={"password"}
              label={"Пароль"}
              register={register("password", {
                required: "Введите пароль",
                minLength: {
                  value: 8,
                  message: "Пароль должен быть не менее 8 символов",
                },
              })}
              error={errors.password?.message}
            />
            <div className={style.button_container}>
              <Button type={"submit"} loading={isPending}>
                Войти
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
