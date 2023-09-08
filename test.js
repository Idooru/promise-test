const bcrypt = require("bcrypt");
const util = require("util");

const bcryptHash = util.promisify(bcrypt.hash);

const obj1 = {};
const obj2 = {};

async function encodeText1(text) {
  try {
    const result = await bcryptHash(text, 10);

    return Object.assign(obj1, { id: 1, result });
  } catch (err) {
    console.log("encodeText1 catch");
    throw new Error(err);
  }
}

async function encodeText2(text) {
  try {
    const result = await bcryptHash(text);

    return Object.assign(obj2, { id: 2, result });
  } catch (err) {
    console.log("encodeText2 catch");
    throw new Error(err);
  }
}

async function parallel(text) {
  return Promise.all([encodeText1(text), encodeText2(text)]);
}

async function bootstrap() {
  const text = "abc1234";
  try {
    const promise = parallel(text);

    console.log("성공!");
    console.log(obj1);
    console.log(obj2);

    await promise;

    console.log(obj1);
    console.log(obj2);
  } catch (err) {
    console.log("에러 발생");
    console.log(err);
  }

  // const errors = promises.filter((promise) => promise.status === "rejected");

  // if (errors.length) {
  //   console.log("에러 발생");
  //   console.log(errors);
  // } else {
  //   console.log("성공!");
  //   console.log(promises);
  // }
}

bootstrap();
