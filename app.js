const button = document.querySelector("button");
const output = document.querySelector("p");

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};
const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, duration);
  });
  return promise;
};

//async sadece fonksiyonlarda  kullanılır.
//async kullandığımız zaman otomatik bir promise çevirir.

async function trackUserHandler() {
  //await ile işlmelerin birbirini takip etmesini sağlarız.
  //bir işlem biter ve diğer awaite geçiş yapar.
  // erorları try catch ile çözümlüyoruz.
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }
  console.log(timerData, posData);
}

button.addEventListener("click", trackUserHandler);
