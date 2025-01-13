"use strict";

const wrapper = document.querySelector(".wrapper");
const headerMiddleMenu = document.querySelector(".header__middle-menu");
const middleMenuItem = document.querySelectorAll(".middle-menu__item");
const middleMenuLink = document.querySelectorAll(".middle-menu__link");
const middleSubmenu = document.querySelectorAll(".middle-submenu");
const headerMiddleMenuBurger = document.querySelector(
  ".header__middle-menu-burger"
);

// Шаблон, если будут будут нужны разные стили для ПК и мобильных устройств (с тачпадом)
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");

  //=== Открываем и закрываем подменюшки с категориями товаров ===//

  // const middleMenuLink = document.querySelectorAll(".middle-menu__link");
  // const middleSubmenu = document.querySelectorAll(".middle-submenu");

  middleMenuLink.forEach(function (item) {
    item.addEventListener("click", showHideSubmenu);
  });

  function showHideSubmenu(event) {
    event.preventDefault();

    const siblingAfterLink = event.target.nextElementSibling;

    if (
      siblingAfterLink &&
      siblingAfterLink.classList.contains("middle-submenu")
    ) {
      if (siblingAfterLink.classList.contains("_visible")) {
        siblingAfterLink.classList.remove("_visible");
        wrapper.classList.remove("_darken");
      } else {
        for (const item of middleSubmenu) {
          item.classList.remove("_visible");
        }
        siblingAfterLink.classList.add("_visible");
        wrapper.classList.add("_darken");
      }
    }
  }

  // Закрываем подменю по клику в любой посторонней области

  document.addEventListener("click", hideSubmenu);

  function hideSubmenu(event) {
    if (
      !event.target.closest(".middle-menu__item") ||
      (event.target.closest("a") && !event.target.closest(".middle-menu__link"))
    ) {
      for (const item of middleSubmenu) {
        item.classList.remove("_visible");
        wrapper.classList.remove("_darken");
      }
      // headerMiddleMenu.classList.remove("_open");
    }
  }
} else {
  document.body.classList.add("_pc");

  //=== Открываем и закрываем подменюшки с категориями товаров на ПК c max-width: $desk (уже по клику, а не при наведении курсора мыши) ===//

  const mediaQuery = window.matchMedia("(max-width: 74.99875rem)");

  function showSubmenu(event) {
    event.preventDefault();

    const siblingAfterLink = event.target.nextElementSibling;

    if (
      siblingAfterLink &&
      siblingAfterLink.classList.contains("middle-submenu")
    ) {
      siblingAfterLink.classList.add("_visible");
      wrapper.classList.add("_darken");
      document.addEventListener("click", hideSubmenu);
    }
  }

  // function hideSubmenu(event) {
  //   if (event.target.closest("a") || event.target.closest("button")) {
  //     for (const item of middleSubmenu) {
  //       item.classList.remove("_visible");
  //       wrapper.classList.remove("_darken");
  //     }
  //     // document.removeEventListener("click", hideSubmenu);
  //   }
  // }

  function handleChange(e) {
    if (e.matches) {
      middleMenuLink.forEach(function (item) {
        item.addEventListener("click", showSubmenu);
      });

      // Закрываем подменю по клику в любой посторонней области

      document.addEventListener("click", hideSubmenu);

      function hideSubmenu(event) {
        if (
          (!event.target.closest(".middle-menu__link") &&
            event.target.closest("a")) ||
          event.target.closest("button")
        ) {
          for (const item of middleSubmenu) {
            item.classList.remove("_visible");
            wrapper.classList.remove("_darken");
          }
        }
      }

      // function hideSubmenu(event) {
      //   if (
      //     (!event.target.closest(".middle-menu__link") &&
      //       event.target.closest("a")) ||
      //     event.target.closest("button")
      //   ) {
      //     for (const item of middleSubmenu) {
      //       item.classList.remove("_visible");
      //       wrapper.classList.remove("_darken");
      //     }
      //   }
      // }
    } else {
      middleMenuLink.forEach(function (item) {
        item.removeEventListener("click", showSubmenu);
      });
      middleSubmenu.forEach(function (item) {
        item.classList.remove("_visible");
      });
      headerMiddleMenu.classList.remove("_open");
      headerMiddleMenuBurger.classList.remove("_menu-open");
      wrapper.classList.remove("_darken");
    }
  }

  mediaQuery.addEventListener("change", handleChange);
  handleChange(mediaQuery);
}

// ==== header__currency - изменение флага при изменении валюты ==== //

const headerCurrencyFlag = document.querySelectorAll(".header__currency-flag");

const headerCurrencySelect = document.querySelector(".header__currency-select");

headerCurrencySelect.addEventListener("change", changeFlag);

function changeFlag(event) {
  headerCurrencyFlag.forEach(function (item) {
    item.classList.remove("_active");
    if (item.dataset.currency === event.target.value) {
      item.classList.add("_active");
    }
  });
}

// === меню бургер для middle-menu === //

const header = document.querySelector(".header");
const body = document.body;

headerMiddleMenuBurger.addEventListener("click", openMiddleMenu);

function openMiddleMenu() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  // Стрелочку для перехода в меню назад будем двигать вправо на ширину скролла, как и крестик для закрытия меню
  const middleSubmenuBackImg = document.querySelector(
    ".middle-submenu__back-img"
  );

  headerMiddleMenu.classList.toggle("_open");
  headerMiddleMenuBurger.classList.toggle("_menu-open");
  document.body.classList.toggle("_lock");
  header.classList.toggle("_fixed");
  if (headerMiddleMenu.classList.contains("_open")) {
    header.setAttribute("style", `padding-right: ${scrollBarWidth}px;`);
    middleSubmenuBackImg.setAttribute(
      "style",
      `margin-right: ${scrollBarWidth}px;`
    );
  } else {
    header.removeAttribute("style");
    middleSubmenuBackImg.removeAttribute("style");
  }
}

// == Закрытие submenu при клике по стрелке Назад == //

const middleSubmenuBack = document.querySelectorAll(".middle-submenu__back");

middleSubmenuBack.forEach(function (item) {
  item.addEventListener("click", closeSubmenu);
});

function closeSubmenu() {
  this.closest(".middle-submenu").classList.remove("_visible");
  wrapper.classList.remove("_darken");
}

// === Закрытие middle-menu при клике по ссылкам или кнопкам в submenu === //

document.addEventListener("click", closeMiddleMenuAgain);

function closeMiddleMenuAgain(event) {
  if (event.target.closest(".middle-menu__link")) {
    event.preventDefault();
  }
  if (
    (event.target.closest("a") &&
      event.target.closest(".middle-submenu") &&
      !event.target.closest(".middle-submenu__back")) ||
    (event.target.closest("button") &&
      event.target.closest(".middle-submenu") &&
      !event.target.closest(".middle-submenu__back"))
  ) {
    headerMiddleMenu.classList.remove("_open");
    headerMiddleMenuBurger.classList.remove("_menu-open");
    body.classList.remove("_lock");
    header.classList.remove("_fixed");
  }
}

// === перемещаем элементы хедера === //

const headerFavorite = document.querySelector(".header__favorite");
const headerCurrency = document.querySelector(".header__currency");
const search = document.querySelector(".search");
const cart = document.querySelector(".cart");
const headerDivider = document.querySelector(".header__divider");

const mediaQuery2 = window.matchMedia("(max-width: 47.99875rem)");

function handleChange2(e) {
  if (e.matches) {
    headerCurrency.insertAdjacentElement("afterend", headerFavorite);
    headerFavorite.insertAdjacentElement("afterend", cart);
  } else {
    search.insertAdjacentElement("afterend", headerFavorite);
    headerDivider.insertAdjacentElement("afterend", cart);
  }
}
mediaQuery2.addEventListener("change", handleChange2);
handleChange2(mediaQuery2);

// ====== Расширяем строку поиска товаров при фокусе, убирая логотип ====== //

const headerLogo = document.querySelector(".header__logo");
const searchInput = document.querySelector(".search__input");

function hideHeaderLogo() {
  headerLogo.classList.add("_hide");
}

function showHeaderLogo() {
  headerLogo.classList.remove("_hide");
}

const mediaQuery3 = window.matchMedia("(max-width: 35.99875rem)");

function expandSearchInput(e) {
  if (e.matches) {
    searchInput.addEventListener("focus", hideHeaderLogo);
    searchInput.addEventListener("blur", showHeaderLogo);
  } else {
    searchInput.removeEventListener("focus", hideHeaderLogo);
    searchInput.removeEventListener("blur", showHeaderLogo);
    showHeaderLogo();
  }
}

mediaQuery3.addEventListener("change", expandSearchInput);

expandSearchInput(mediaQuery3);

// ==== Top-slider (swiper) ==== //

const topSlider = new Swiper(".top-slider", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".top-slider__next",
    prevEl: ".top-slider__prev",
  },
});

// ======== Добавляем числа для буллетов top-slider ======== //

const topSliderPaginationBullet = document.querySelectorAll(
  ".top-slider .swiper-pagination-bullet"
);

topSliderPaginationBullet.forEach(function (item, index) {
  const number = document.createElement("span");
  number.innerText = `0${index + 1}`;
  number.classList.add("swiper-pagination-bullet__number");
  item.insertAdjacentElement("afterbegin", number);
});

// ==== Top-slider (swiper) ==== //

const newArrivalsSwiper = new Swiper(".new-arrivals__slider", {
  // loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  keyboard: {
    enabled: true,
  },

  slidesPerView: "auto",

  breakpoints: {
    0: {
      spaceBetween: 15,
    },
    767.98: {
      spaceBetween: 20,
    },
    991.98: {
      spaceBetween: 25,
    },
    1199.98: {
      spaceBetween: 30,
    },
  },
});

// .product-card__favorite - добавляем/убираем класс _active //

const productCardFavoriteAll = document.querySelectorAll(
  ".product-card__favorite"
);

productCardFavoriteAll.forEach(function (item) {
  item.addEventListener("click", toggleClassActive);
});

function toggleClassActive(event) {
  event.currentTarget.classList.toggle("_active");
}

// Делаем так, чтобы product-card, являющийся ссылкой, не срабатывал как ссылка, если мы кликаем по кнопке "Добавить в избранное", находящейся внутри product-card //

const productCardAll = document.querySelectorAll(".product-card");

productCardAll.forEach(function (item) {
  item.addEventListener("click", preventDefaultProductCardLink);
});

function preventDefaultProductCardLink(event) {
  if (event.target.closest(".product-card__favorite")) {
    event.preventDefault();
  }
}

// ==== trending-now-slider (swiper) ==== //

const trendingNowSwiper = new Swiper(".trending-now__slider", {
  // loop: true,

  navigation: {
    nextEl: ".trending-now-slider__next",
    prevEl: ".trending-now-slider__prev",
  },

  keyboard: {
    enabled: true,
  },

  slidesPerView: 1,
  spaceBetween: 15,

  breakpoints: {
    350: {
      slidesPerView: 2,
    },
    575.98: {
      slidesPerView: 3,
    },
    767.98: {
      spaceBetween: 20,
      slidesPerView: 3,
    },
    991.98: {
      spaceBetween: 25,
      slidesPerView: 3,
    },
    1199.98: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
  },
});

// ==== sale-up-section-slider (swiper) ==== //

const saleUpSectionSwiper = new Swiper(".sale-up-section__slider", {
  // loop: true,

  navigation: {
    nextEl: ".sale-up-section-slider__next",
    prevEl: ".sale-up-section-slider__prev",
  },

  keyboard: {
    enabled: true,
  },

  slidesPerView: 1,
  spaceBetween: 15,

  breakpoints: {
    350: {
      slidesPerView: 2,
    },
    575.98: {
      slidesPerView: 3,
    },
    767.98: {
      spaceBetween: 20,
      slidesPerView: 3,
    },
    991.98: {
      spaceBetween: 25,
      slidesPerView: 3,
    },
    1199.98: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
  },
});
// ==== sale-up-section-slider (swiper) ==== //

const productCardSlider = new Swiper(".product-card__slider", {
  loop: true,
  touchRatio: 0,

  navigation: {
    nextEl: ".product-card__swiper-button-next",
    prevEl: ".product-card__swiper-button-prev",
  },

  slidesPerView: 1,
});

// === Перемещаем кнопку fashion-blog__button вниз fashion-blog__container на разрешении $mobileSmall=== //

const fashionBlogButton = document.querySelector(".fashion-blog__button");
const fashionBlogContainer = document.querySelector(".fashion-blog__container");
const fashionBlogHeader = document.querySelector(".fashion-blog__header");

const mediaQuery4 = window.matchMedia("(max-width: 29.93625rem)");
function handleTabletChange(e) {
  if (e.matches) {
    fashionBlogContainer.append(fashionBlogButton);
  } else {
    fashionBlogHeader.append(fashionBlogButton);
  }
}
mediaQuery4.addEventListener("change", handleTabletChange);
handleTabletChange(mediaQuery4);
