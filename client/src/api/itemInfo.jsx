import createTokenInstance from "./tokenInstance";

export const addItem = async (data) => {
  const url = "/admin/additem";

  const Instance = createTokenInstance();
  try {
    const res = await Instance.post(url, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getItemInfo = async (data) => {
  const url = "/admin/getitem";

  const Instance = createTokenInstance({ params: data });
  try {
    const res = await Instance.get(url);
    return res;
  } catch (err) {
    console.log(err);
  }
};
