//javasctipr baştan başlayarak tüm kodu sırayla okur. Aynı anda okumaz. Eğer böyle olmazsa kod hata verebilir. Mesela
//bir fonsiyon htmle buton ekliyor ve bir click eventle bu butonu dinlemek istiyoruz. aynı anda kod okunursa buton eklenmeden dinlemeye çalışırız.
// ama bu akşın eksi bir yönü var bazen bir fonksiyonu çalışırtırmak için başkar bir fonksiyonu beklemek isteyebiliriz. burda devreye
//async (asimetrik) fonsiyon devreye giriyor.
const button = document.querySelector("button");
const output = document.querySelector("p");

//Promise iki parametre kabul ediyor.Bu parametlerin adı resolve ve reject olmak zorunda değil fakat genel kullanımı bu şekilde.
//   Promise blueprint:
//   let myPromise = new Promise(function(myResolve, myReject) {
// // "Producing Code" (May take some time)

//   myResolve(); // when successful
//   myReject();  // when error
// });

// // "Consuming Code" (Must wait for a fulfilled Promise)
// myPromise.then(
//   function(value) { /* code if successful */ },
//   function(error) { /* code if some error */ }
// );

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

function trackUserHandler() {
  let positionData;
  //Aşğıdaki aynı seviye .then ile promisleri birbirine bağlıyoruz. (Chaning Multiple Promises)
  getPosition()
    //then iki fonksiyou var ilki başarılı olursa çalışır. ikinsi başarısız olursa çalışır.
    .then((posData) => {
      positionData = posData;
      return setTimer(2000);
    })
    // catch erorlar yakalar fakat kod bloğunu kesmez. kod aşağıya doğru çalışmaya devam eder.
    .catch((err) => {
      console.log(err);
      return "on we go..";
    })
    .then((data) => {
      console.log(data, positionData);
    });
  // setTimer(1000).then(() => {
  //   console.log("Timer done!");
  // });
  // console.log("Getting position....");
}

button.addEventListener("click", trackUserHandler);

//Örneiğin aşğıda ki kod kodun ilerlemesini blokluyor. Bu loop hesaplaması bitmediği için sayfa hemen yüklenemiyor ve butona sayfa açıldığıdında bassaak bile bu kod bitene kadar
//console.log yapmıyor.
// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
