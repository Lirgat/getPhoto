const width = document.getElementById("width");
const height = document.getElementById("height");
const submitBtn = document.querySelector(".main-block__submit");
const popup = document.querySelector(".popup");
const popupImg = document.querySelector(".popup__img");
let error = document.querySelector(".error");
const body = document.querySelector("body");
const closePopupBtn = document.querySelector(".popup-closeBtn");

//ПОПАП
let popupIsOpen = false;

const openPopupImage = (source) => {
  popup.classList.add("popup-open");
  popupIsOpen = true;
  if (popupIsOpen === true) {
    body.style.overflow = "hidden";
  }
  popupImg.src = source;
  console.log(popupImg.src);
};

const closePopup = () => {
  popup.classList.remove("popup-open");
  popupIsOpen = false;
  if (popupIsOpen === false) {
    body.style.overflow = "auto";
  }
};

closePopupBtn.addEventListener("click", closePopup);

//ОШИБКА
const errorAppear = () => {
  error.textContent = "one of the numbers outside the range from 100 to 300";
  error.style.top = "0";
  return setTimeout(() => {
    return (error.style.top = "-200px");
  }, 2000);
};

//ПОЛУЧАЕМ ФОТКУ
const getImage = async (w, h) => {
  try {
    let image = await fetch(`https://dummyimage.com/${w}x${h}/`);
    if ((image.status = 200)) {
      openPopupImage(image.url);
    }
    console.log(image);
  } catch (err) {
    console.log(err.message);
    errorAppear();
  }
};

//ОБРАБОТКА СОБЫТИЯ
submitBtn.addEventListener("click", () => {
  let widthNum = width.value;
  let heightNum = height.value;

  const checkValue = new Promise((resolve, reject) => {
    if (
      widthNum < 100 ||
      widthNum > 300 ||
      heightNum < 100 ||
      heightNum > 300
    ) {
      reject();
    } else {
      resolve([widthNum, heightNum]);
    }
  });

  checkValue
    .then(([widthNum, heightNum]) => {
      return getImage(widthNum, heightNum);
    })
    .catch(() => {
      return errorAppear();
    });
});
