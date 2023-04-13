import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addItem } from "../api/itemInfo";
const Item = () => {
  /*FormData 변수 */
  const [refFile, setRefFile] = useState(null); // 파일 저장 할 State

  //파일 추가

  const {
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      itemName: "",
      imgs: null,
      webpImgs: null,
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
  const fileChange = (e) => {
    setRefFile(e.target.files[0]);
  };
  const onSubmit = async (data) => {
    // const newId = await setRandomId();

    const { file, ...fields } = data;

    const formData = Object.entries(fields).reduce(
      (fd, [key, val]) => (fd.append(key, val), fd),
      new FormData()
    );

    formData.append("sumFile", refFile);
    // var file = document.querySelector("#file");
    // formData.append("id", newId);
    // 객체를 JSON 타입으로 변환하여 Blob 객체 생성

    try {
      addItem(formData).then(async (res) => {
        if (res.status === 200) {
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

      <input {...register("itemName")} placeholder="itemName" />
      <input
        {...register("file")}
        type="file"
        name="sumFile"
        accept="image/*"
        onChange={fileChange}
      />
      <input {...register("price")} placeholder="price" />
      <input {...register("brand")} placeholder="brand" />
      <input {...register("sale")} placeholder="sale" />

      <button disabled={isSubmitting}>Add</button>
    </form>
  );
};

export default Item;
