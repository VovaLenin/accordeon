(function () {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue("tabs_limit") || 0,
  };

  /* Код компонента пишите ниже */
  // // 1 уровень
  // const accordeon = document.querySelector(".accordeon");
  // accordeon.addEventListener("click", ({ target }) => {
  //   if (target.className === "accordeon-item-title") {
  //     const accordeonItem = target.closest(".accordeon-item");
  //     accordeonItem.classList.toggle("accordeon-item--open");
  //   }
  // });

  // 2 уровень
  // const accordeon = document.querySelector(".accordeon");

  // accordeon.addEventListener("click", ({ target }) => {
  //   if (target.classList.contains("accordeon-item-title")) {
  //     const currentItem = target.closest(".accordeon-item");
  //     accordeon.querySelectorAll(".accordeon-item").forEach((item) => {
  //       if (item !== currentItem) {
  //         item.classList.remove("accordeon-item--open");
  //       }
  //     });
  //     currentItem.classList.toggle("accordeon-item--open");
  //   }
  // });

  // 3 уровень душевный, сам делал
  const accordeon = document.querySelector(".accordeon");
  let openTabs = [];

  accordeon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("accordeon-item-title")) {
      const currentItem = target.closest(".accordeon-item");
      if (!openTabs.includes(currentItem)) {
        currentItem.classList.add("accordeon-item--open");
        openTabs.push(currentItem);
      } else {
        currentItem.classList.remove("accordeon-item--open");
        openTabs = openTabs.filter((tab) => tab !== currentItem);
      }
      if (settings.tabsLimit !== 0 && openTabs.length > settings.tabsLimit) {
        openTabs[0].classList.remove("accordeon-item--open");
        openTabs.shift();
      }
    }
  });

  // 3 уровень бездушный, нейросетка писала
  // const accordeon = document.querySelector(".accordeon");
  // let openTabs = new Set();

  // accordeon.addEventListener("click", ({ target }) => {
  //   const currentItem = target.closest(".accordeon-item");

  //   if (!currentItem || !currentItem.classList.contains("accordeon-item"))
  //     return;

  //   const isTitle = target.classList.contains("accordeon-item-title");
  //   const isOpen = currentItem.classList.contains("accordeon-item--open");

  //   if (!isTitle) return;

  //   if (isOpen) {
  //     currentItem.classList.remove("accordeon-item--open");
  //     openTabs.delete(currentItem);
  //   } else {
  //     if (settings.tabsLimit !== 0 && openTabs.size >= settings.tabsLimit) {
  //       const firstTab = openTabs.values().next().value;
  //       firstTab.classList.remove("accordeon-item--open");
  //       openTabs.delete(firstTab);
  //     }
  //     currentItem.classList.add("accordeon-item--open");
  //     openTabs.add(currentItem);
  //   }
  // });
})();
