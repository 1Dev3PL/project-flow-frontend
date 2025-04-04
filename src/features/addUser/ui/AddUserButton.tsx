import { Button, Input, Modal, Select } from "shared/ui";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./AddUserButton.module.scss";
import addFilledIcon from "shared/assets/icons/addFilled.svg";
import { useAddUser } from "features/addUser/hooks/useAddUser.ts";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";
import { EUserRole, userRoleSelectorOptions } from "entities/user";

type TForm = {
  email: string;
};

export const AddUserButton = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForm>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const [selectedRole, setSelectedRole] = useState(
    userRoleSelectorOptions[1].value,
  );
  const { addUserMutation, isPending } = useAddUser();
  const projectId = useCurrentProjectStore((state) => state.currentProjectId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleRoleChange = (role: EUserRole) => {
    setSelectedRole(role);
  };

  const handleAddUser: SubmitHandler<TForm> = (formData, event) => {
    event?.preventDefault();

    const data = {
      projectId: projectId!,
      userData: {
        email: formData.email,
        role: selectedRole,
      },
    };

    addUserMutation(data, { onSettled: handleClose });
  };

  return (
    <>
      <Button onClick={handleOpen} icon={addFilledIcon} variant={"glass"}>
        Добавить пользователя
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        title={"Отправить приглашение в команду"}
      >
        <form
          className={style.form}
          onSubmit={handleSubmit(handleAddUser)}
          noValidate
        >
          <Input
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
          <div className={style.selector_container}>
            <span className={style.selector_label}>Роль:</span>
            <Select
              options={userRoleSelectorOptions}
              selected={selectedRole}
              onChange={handleRoleChange}
            />
          </div>
          <div className={style.button}>
            <Button type={"submit"} loading={isPending}>
              Отправить приглашение
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
