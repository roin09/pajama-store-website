import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addItem } from "../api/itemInfo";
const Item = () => {
  const [saveItem, setSaveItem] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      id: null,
      name: "",
      imgs: "",
      price: null,
      category: "",
      brand: "",
      sale: null,
    },
  });
  const setRandomId = () => {
    const today = new Date();
    const todayDate = `${today.getFullYear()}${
      today.getMonth() + 1
    }${today.getDate()}`;

    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const randomId = todayDate + randomNumber;
    return Number(randomId);
  };
  const onSubmit = async (data) => {
    const newId = await setRandomId();
    const newData = { ...data, id: newId };
    try {
      addItem(newData).then(async (res) => {
        if (res.status === 200) {
          await setSaveItem("success");
          alert("test");
        } else {
          alert("fail");
        }
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <select {...register("category")}>
        <option value="simple">simple</option>
        <option value="girlish">girlish</option>
        <option value="cotton">cotton</option>
      </select>
      <select {...register("type")}>
        <option value="Short">Short</option>
        <option value="Long">Long</option>
        <option value="Dress">Dress</option>
      </select>

      <input {...register("name")} placeholder="name" />
      <input {...register("imgs")} placeholder="imgs" />
      <input {...register("price")} placeholder="price" />
      <input {...register("brand")} placeholder="brand" />
      <input {...register("sale")} placeholder="sale" />

      <button disabled={isSubmitting}>Add</button>
    </form>
  );
};

export default Item;
