import style from "./ErrorLayout.module.scss";

interface Props {
  error: Error;
}

export const ErrorLayout = ({ error }: Props) => {
  return (
    <div className={style.error_layout}>
      <p className={style.header}>Что-то пошло не так:</p>
      <p className={style.error_message}>{error.message}</p>
    </div>
  );
};
